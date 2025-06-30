import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export function ToolbarDropdown({ label, links = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li className="nav-item dropdown" ref={dropdownRef}>
      <button
        className="nav-link dropdown-toggle btn btn-link text-light"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {label}
      </button>
      <ul className={`dropdown-menu${isOpen ? " show" : ""}`}>
        {links.map(({ to, label }, index) => (
          <li key={index}>
            <Link
              className="dropdown-item"
              to={to}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
