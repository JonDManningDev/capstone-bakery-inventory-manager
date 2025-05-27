import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AlertsProvider } from "./context/AlertsContext";
import { AuthProvider } from "./context/AuthContext";
import { RecipesProvider } from "./context/RecipesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AlertsProvider>
        <AuthProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </AuthProvider>
      </AlertsProvider>
    </Router>
  </React.StrictMode>
);
