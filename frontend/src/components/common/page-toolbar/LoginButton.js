import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

export function LoginButton() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button className="btn btn-primary" type="button">
        Not Logged In
        <i className="bi bi-person-circle ms-3"></i>
      </button>
    );
  }

  return (
    <div className="dropdown" ref={loginRef}>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        id="loginDropdown"
      >
        {user.firstName}
        <i className="bi bi-person-circle ms-3"></i>
      </button>
      <ul className={`dropdown-menu${isOpen ? " show" : ""}`}>
        {user?.employeeId ? (
          <>
            <li>
              <button type="button" className="btn" onClick={() => logout()}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Log In
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Register
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
