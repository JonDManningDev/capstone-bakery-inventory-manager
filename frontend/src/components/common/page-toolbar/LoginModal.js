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
      const input = document.getElementById("loginEmailAddress");
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
      await login(formData);

      // Close the modal
      modalCloser("loginModal");

      // Reset form
      setFormData({ email: "", password: "" });
    } catch (error) {
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
