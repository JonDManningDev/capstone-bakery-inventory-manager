import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlerts } from "../../../context/AlertsContext";
import { handleInputChange } from "../../../utils/handleInputChange";
import { modalCloser } from "../../../utils/modalCloser";

export function RegisterModal({ loginDropdownRef }) {
  const { getUser, registerUser, setUser } = useAuth();
  const { addAlert } = useAlerts();
  const modalRef = useRef(null);
  const firstNameInputRef = useRef(null);

  // Manually control focus to prevent aria errors.
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const modalFocusHandler = () => {
      firstNameInputRef.current?.focus();
    };

    const modalHideHandler = () => {
      loginDropdownRef.current?.focus();
    };

    modal.addEventListener("shown.bs.modal", modalFocusHandler);
    modal.addEventListener("hide.bs.modal", modalHideHandler);

    return () => {
      modal.removeEventListener("shown.bs.modal", modalFocusHandler);
      modal.removeEventListener("hide.bs.modal", modalHideHandler);
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

  // Handle new user registrations
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
      // Close the modal so that the user can see the error message
      modalCloser("registerModal");
      return;
    }

    try {
      // After registration in the database, this route returns a login token, if successful
      const token = await registerUser(formData);
      const userFromToken = await getUser(token);

      // Set the user, alert the successful login, and reset formData
      setUser(userFromToken);
      addAlert(
        `Successfully registered and logged in as ${userFromToken.firstName} ${userFromToken.lastName}!`,
        "success",
        "getUser-success"
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // If there is an error, make sure the token gets cleaned up.
      localStorage.removeItem("token");

      // Restore user to the not-logged-in state.
      setUser({
        employeeId: null,
        firstName: "Not Logged In",
        lastName: null,
        email: null,
      });

      addAlert(
        `There was an error during registration: ${error.message}!`,
        "danger",
        "register-failure"
      );
      console.error("There was an error during registration: ", error.message);
    }
    // Close the modal regardless of success or failure
    modalCloser("registerModal");
  }

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerLabel"
      aria-hidden="true"
      data-bs-focus="false"
      ref={modalRef}
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
                    ref={firstNameInputRef}
                    value={formData.firstName}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter your first name"
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
