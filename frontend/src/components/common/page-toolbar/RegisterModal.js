import { useEffect } from "react";

export function RegisterModal() {
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

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="loginLabel"
      aria-hidden="true"
      data-bs-focus="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4" id="loginLabel">
              Register Your Account
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
