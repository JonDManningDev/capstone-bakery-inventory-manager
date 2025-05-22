import { useState, useRef, useEffect } from "react";

export function LoginButton({ user, setUser }) {
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
      </ul>
    </div>
  );
}
