// Displays information for all bakes made today, including statistics and filtering options.

import { useState, useEffect } from "react";
import { useBakes } from "../../context/BakesContext";
import { useAlerts } from "../../context/AlertsContext";
import { BakesList } from "./BakesList";
import { getCurrentBakes } from "../../utils/getCurrentBakes";

export function ViewBakes() {
  const { bakes, getBakes, setBakes, updateBakeStatus } = useBakes();
  const { addAlert } = useAlerts();

  // States for filtering and sorting
  const [sortByEmployee, setSortByEmployee] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filteredBakes, setFilteredBakes] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadBakes() {
      try {
        const bakesRecords = await getBakes({ signal: abortController.signal });
        setBakes(bakesRecords);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to load bakes: ${error.message}!`,
          "danger",
          "getBakes-failure"
        );
        console.error("Failed to load bakes:", error.message);
      }
    }
    loadBakes();

    return () => {
      abortController.abort();
    };
  }, []);

  // currentBakes (all bakes since 12:00 am the current day, local time, compared to UTC DB time)
  let currentBakes = getCurrentBakes(bakes);

  // This useEffect() governs filter/sort button behavior
  // filteredBakes is the state that is used to render the bakes list
  useEffect(() => {
    if (currentBakes.length === 0) {
      setFilteredBakes([]);
      return;
    }
    // Apply status filter if set
    if (filterStatus) {
      currentBakes = currentBakes.filter(
        (bake) => bake.status && bake.status === filterStatus
      );
    }
    // Apply employee sorting if enabled
    if (sortByEmployee) {
      currentBakes = [...currentBakes].sort((a, b) => {
        // First sort by last name
        const lastNameComparison = a.employee.last_name.localeCompare(
          b.employee.last_name
        );
        // As long as the last names are different, you are done sorting
        if (lastNameComparison !== 0) return lastNameComparison;

        // If last names are the same, further sort by first name
        return a.employee.first_name.localeCompare(b.employee.first_name);
      });
    }

    setFilteredBakes(currentBakes);
    return;
  }, [bakes, filterStatus, sortByEmployee]);

  // Calculate statistics
  const dailyBakesTotal = currentBakes.length;
  const statusCounts = currentBakes.reduce((counts, bake) => {
    if (bake.status) {
      counts[bake.status] = (counts[bake.status] || 0) + 1;
    }
    return counts;
  }, {});

  // Handler for updating bake status
  const handleStatusUpdate = async (bakeId, newStatus) => {
    const statusText = newStatus === "complete" ? "Complete" : "Canceled";
    const confirmMessage = `Are you sure you want to set the status of this bake to ${statusText}?`;

    if (window.confirm(confirmMessage)) {
      try {
        const updatedBake = await updateBakeStatus(bakeId, newStatus);
        addAlert(
          `Bake (${updatedBake.employee.first_name} ${updatedBake.employee.last_name} - ${updatedBake.recipe.title}) status successfully set to ${statusText}`,
          "success",
          "updateBakeStatus-success"
        );
        // Update the local bakes state to reflect the change
        const bakesRecords = await getBakes();
        setBakes(bakesRecords);
        return;
      } catch (error) {
        addAlert(
          `Failed to update bake status: ${error.message}`,
          "danger",
          "updateBakeStatus-failure"
        );
        console.error("Failed to update bake status: ", error.message);
      }
    }
  };

  // Toggle filter buttons
  const toggleFilter = (status) => {
    if (filterStatus === status) {
      setFilterStatus(null); // Turn off filter if it's already active
    } else {
      setFilterStatus(status); // Apply the selected filter
    }
  };

  // Toggle sort button
  const toggleSort = () => {
    setSortByEmployee(!sortByEmployee);
  };

  // Render status badge based on bake status
  function renderStatusBadge(status) {
    switch (status) {
      case "started":
        return <span className="badge bg-info">Started</span>;
      case "complete":
        return <span className="badge bg-success">Complete</span>;
      case "canceled":
        return <span className="badge bg-danger">Canceled</span>;
      default:
        return null;
    }
  }

  return (
    <div className="container py-4 my-4 col-lg-7 border rounded bg-light">
      <h3 className="mb-4">Bakes</h3>

      {/* Dashboard */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="text-primary">
            There have been {dailyBakesTotal} bakes today.
          </h3>

          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h4 className="card-title">Started</h4>
                  <p className="display-5">{statusCounts["started"] || 0}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h4 className="card-title">Complete</h4>
                  <p className="display-5">{statusCounts["complete"] || 0}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <h4 className="card-title">Canceled</h4>
                  <p className="display-5">{statusCounts["canceled"] || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter/Sort Controls */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          <button
            className={`btn ${
              sortByEmployee ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={toggleSort}
          >
            <i className="bi bi-sort-alpha-down me-1"></i>
            Sort by Employee Name
          </button>{" "}
          <button
            className={`btn ${
              filterStatus === "started" ? "btn-info" : "btn-outline-info"
            }`}
            onClick={() => toggleFilter("started")}
          >
            <i className="bi bi-hourglass-split me-1"></i>
            Started
          </button>
          <button
            className={`btn ${
              filterStatus === "complete"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => toggleFilter("complete")}
          >
            <i className="bi bi-check-circle me-1"></i>
            Complete
          </button>
          <button
            className={`btn ${
              filterStatus === "canceled" ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => toggleFilter("canceled")}
          >
            <i className="bi bi-x-circle me-1"></i>
            Canceled
          </button>
          {(sortByEmployee || filterStatus) && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setSortByEmployee(false);
                setFilterStatus(null);
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i>
              Reset Filters
            </button>
          )}
        </div>{" "}
      </div>

      {/* Bakes List */}
      <BakesList
        filteredBakes={filteredBakes}
        renderStatusBadge={renderStatusBadge}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
