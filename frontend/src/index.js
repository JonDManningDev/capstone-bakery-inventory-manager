import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AlertsProvider } from "./components/common/alerts/AlertsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AlertsProvider>
        <App />
      </AlertsProvider>
    </Router>
  </React.StrictMode>
);
