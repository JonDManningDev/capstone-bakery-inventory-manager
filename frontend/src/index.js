import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AlertsProvider } from "./context/AlertsContext";
import { AuthProvider } from "./context/AuthContext";
import { UnitsProvider } from "./context/UnitsContext";
import { RecipesProvider } from "./context/RecipesContext";
import { IngredientsProvider } from "./context/IngredientsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AlertsProvider>
        <AuthProvider>
          <UnitsProvider>
            <RecipesProvider>
              <IngredientsProvider>
                  <App />
              </IngredientsProvider>
            </RecipesProvider>
          </UnitsProvider>
        </AuthProvider>
      </AlertsProvider>
    </Router>
  </React.StrictMode>
);
