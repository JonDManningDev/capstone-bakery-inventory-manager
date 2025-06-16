import { Link, useLocation } from "react-router-dom";

import { ToolbarDropdown } from "./ToolbarDropdown";
import { LoginButton } from "./LoginButton";

export function PageToolbar() {
  const location = useLocation();

  const homeLink = () => {
    if (location.pathname === "/") {
      return (
        <Link to="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      );
    } else {
      return (
        <Link to="/" className="nav-link">
          Home
        </Link>
      );
    }
  };

  const bakesLink = () => {
    if (location.pathname === "/bakes") {
      return (
        <Link to="/bakes" className="nav-link active" aria-current="page">
          Bakes
        </Link>
      );
    } else {
      return (
        <Link to="/bakes" className="nav-link">
          Bakes
        </Link>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-secondary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">{homeLink()}</li>
            <ToolbarDropdown
              label="Recipes"
              links={[
                { to: "/recipes", label: "View Recipes " },
                { to: "/recipes/new", label: "Create Recipe" },
              ]}
            />
            <ToolbarDropdown
              label="Ingredients"
              links={[
                { to: "/ingredients", label: "View Ingredients" },
                { to: "/ingredients/new", label: "Create Ingredient" },
              ]}
            />
            <li className="nav-item">{bakesLink()}</li>          </ul>
        </div>
        <LoginButton />
      </div>
    </nav>
  );
}
