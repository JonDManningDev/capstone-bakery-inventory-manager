import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlerts } from "../../../context/AlertsContext";
import { handleInputChange } from "../../../utils/handleInputChange";
import { modalCloser } from "../../../utils/modalCloser";

export function LoginModal({ loginDropdownRef }) {
  const { addAlert, setAlerts } = useAlerts();
  const { getLoginToken, getUser, setUser } = useAuth();
  const modalRef = useRef(null);
  const emailInputRef = useRef(null);

  // Manually control focus to prevent aria errors.
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const modalFocusHandler = () => {
      emailInputRef.current?.focus();
    };

    const modalHideHandler = () => {
      loginDropdownRef.current?.focus();
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

  // Handle manual logins via the modal
  const handleSubmit = (() => {
    let lastAbortController = null;
    return async function (event) {
      event.preventDefault();
      if (lastAbortController) {
        lastAbortController.abort();
      }
      const abortController = new AbortController();
      lastAbortController = abortController;
      try {
        const token = await getLoginToken(formData, {
          signal: abortController.signal,
        });
        const userFromToken = await getUser(token, {
          signal: abortController.signal,
        });

        setUser(userFromToken);
        setAlerts((current) =>
          current.filter((alert) => alert.type !== "no-login")
        );
        addAlert(
          `Successfully logged in as ${userFromToken.firstName} ${userFromToken.lastName}!`,
          "success",
          "login-success"
        );
        // Reset the login form
        setFormData({ email: "", password: "" });
      } catch (error) {
        if (error.name === "AbortError") return;
        // If there is an error, make sure the token gets cleaned up.
        localStorage.removeItem("token");

        // Restore user to the not-logged-in state.
        setUser({
          employeeId: null,
          firstName: "Not Logged In",
          lastName: null,
          email: null,
        });

        addAlert(`Login attempt failed: ${error.message}!`, "danger");
        console.error("Login attempt failed: ", error.message);
      }
      // Close the modal regardless of success or failure
      modalCloser("loginModal");
    };
  })();

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginLabel"
      aria-hidden="true"
      data-bs-focus="false"
      ref={modalRef}
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
                  ref={emailInputRef}
                  value={formData.email}
                  onChange={(event) =>
                    handleInputChange(event, formData, setFormData)
                  }
                  placeholder="employee@example.com"
                  required
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
                  required
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
