import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlerts } from "../../../context/AlertsContext";
import { handleInputChange } from "../../../utils/handleInputChange";
import { modalCloser } from "../../../utils/modalCloser";

export function RegisterModal() {
  // Manually control focus to prevent aria errors.
  useEffect(() => {
    const modal = document.getElementById("registerModal");
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
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();
  const { addAlert } = useAlerts();

  async function handleSubmit(event) {
    event.preventDefault();

    // Logic for ensuring email and password fields match
    if (
      formData.email !== formData.confirmEmail ||
      formData.password !== formData.confirmPassword
    ) {
      addAlert(
        "Registration error: Both pairs of email and password inputs must match!",
        "danger",
        "register-failure"
      );
      console.error(
        "Registration error: Both pairs of email and password inputs must match!"
      );
      // Yes, bad things happen if you don't include "return" here
      return modalCloser("registerModal");
    }

    try {
      // After registration in the database, this route returns a login token, if successful
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${baseUrl}/employees`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          },
        }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (response.ok) {
        // Store the token locally, then use it to retrieve user info
        await login(json.token);

        // Close the modal
        modalCloser("registerModal");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
        });      } else {
        addAlert(
          json.error || "Registration failed.",
          "danger",
          "register-failure"
        );
      }
    } catch (error) {
      addAlert(
        "There was an error during registration: " + error.message,
        "danger",
        "register-failure"
      );
      console.error(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerLabel"
      aria-hidden="true"
      data-bs-focus="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4" id="registerLabel">
              Register Your Account
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
              <div className="p-3">
                <h2 className="fs-5">Name</h2>
                <div className="m-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter your first name"
                  ></input>
                </div>
                <div className="m-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter your last name"
                  ></input>
                </div>
              </div>
              <div className="p-3">
                <h2 className="fs-5">Email</h2>
                <div className="m-3">
                  <label htmlFor="registerEmailAddress" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="registerEmailAddress"
                    name="email"
                    value={formData.email}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="employee@example.com"
                  ></input>
                </div>
                <div className="m-3">
                  <label htmlFor="confirmEmailAddress" className="form-label">
                    Confirm Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="confirmEmailAddress"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                  ></input>
                </div>
              </div>
              <div className="p-3">
                <h2 className="fs-5">Password</h2>
                <div className="m-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerPassword"
                    name="password"
                    value={formData.password}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                  ></input>
                </div>
                <div className="m-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                  ></input>
                </div>
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
