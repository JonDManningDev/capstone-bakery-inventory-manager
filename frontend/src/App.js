import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAlerts } from "./components/common/alerts/AlertsContext";

import { LoginModal } from "./components/common/page-toolbar/LoginModal";
import { RegisterModal } from "./components/common/page-toolbar/RegisterModal";
import { PageToolbar } from "./components/common/page-toolbar/PageToolbar";
import { Alerts } from "./components/common/alerts/Alerts";
import { Header } from "./components/common/Header";
import { Home } from "./components/Home";

function App() {
  const [user, setUser] = useState({
    employee_id: null,
    firstName: "Guest",
    lastName: "",
    email: "",
    password_hash: "",
  });

  const { addAlert } = useAlerts();

  // Show a welcome alert if the user has not logged in
  useEffect(() => {
    if (user.employee_id === null) {
      addAlert(
        `Welcome, ${user.firstName}! Please log in or register to properly track bakes.`,
        "warning"
      );
    }
    // The following line silences the warning that addAlert hasn't been added as a dependency (including addAlert causes the effect to loop infinitely)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.employee_id, user.firstName]);

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Header />
      <PageToolbar user={user} setUser={setUser} />
      <Alerts />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
