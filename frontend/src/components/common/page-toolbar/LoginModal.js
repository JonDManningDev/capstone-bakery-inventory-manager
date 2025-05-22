import { useEffect } from "react";

export function LoginModal() {
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
          <div className="modal-body bg-light-subtle">
            <div className="m-3">
              <label htmlFor="loginEmailAddress" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="loginEmailAddress"
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
              ></input>
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
