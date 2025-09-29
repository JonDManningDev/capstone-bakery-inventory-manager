import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";

export function LoginButton({ loginDropdownRef }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle shadow-sm"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        ref={loginDropdownRef}
        id="loginDropdown"
      >
        {user.firstName}
        <i className="bi bi-person-circle ms-3"></i>
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          className={`dropdown-menu ${isOpen ? "show" : ""}`}
        >
          {user?.employeeId ? (
            <li>
              <button type="button" className="btn" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className="btn dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
