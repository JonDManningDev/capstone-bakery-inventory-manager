import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlerts } from "../../../context/AlertsContext";
import { handleInputChange } from "../../../utils/handleInputChange";
import { modalCloser } from "../../../utils/modalCloser";

export function LoginModal() {
  // Manually control focus to prevent aria errors.
  useEffect(() => {
    const modal = document.getElementById("loginModal");
    if (!modal) return;

    const modalFocusHandler = () => {
      const input = document.getElementById("emailAddress");
      input?.focus();
    };

    const modalHideHandler = () => {
      const dropdownButton = document.getElementById("loginDropdown");
      if (dropdownButton) {
        dropdownButton.focus();
      }
    };

    modal.addEventListener("hide.bs.modal", modalHideHandler);
    modal.addEventListener("shown.bs.modal", modalFocusHandler);

    return () => {
      modal.removeEventListener("hide.bs.modal", modalHideHandler);
      modal.removeEventListener("shown.bs.modal", modalFocusHandler);
    };
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const { addAlert } = useAlerts();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // This route returns a login token, if successful
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${baseUrl}/employees/login`, {
        method: "POST",
        body: JSON.stringify({ data: formData }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (response.ok) {
        // Store the token locally, then use it to retrieve user info
        await login(json.token);

        // Close the modal
        modalCloser("loginModal");
        
        // Reset form
        setFormData({ email: "", password: "" });
      } else {
        addAlert(json.error || "Login failed.", "danger", "login-failure");
      }
    } catch (error) {
      addAlert(
        "There was an error during login: " + error.message,
        "danger",
        "login-failure"
      );
      console.error(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginLabel"
      aria-hidden="true"
      data-bs-focus="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="loginLabel">
              Please Log In
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body bg-light-subtle">
              <div className="m-3">
                <label htmlFor="loginEmailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmailAddress"
                  name="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleInputChange(event, formData, setFormData)
                  }
                  placeholder="employee@example.com"
                ></input>
              </div>
              <div className="m-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  name="password"
                  value={formData.password}
                  onChange={(event) =>
                    handleInputChange(event, formData, setFormData)
                  }
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
