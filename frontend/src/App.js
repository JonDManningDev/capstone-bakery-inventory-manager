import { Routes, Route } from "react-router-dom";

import { LoginModal } from "./components/common/page-toolbar/LoginModal";
import { RegisterModal } from "./components/common/page-toolbar/RegisterModal";
import { PageToolbar } from "./components/common/page-toolbar/PageToolbar";
import { Alerts } from "./components/common/Alerts";
import { Header } from "./components/common/Header";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Header />
      <PageToolbar />
      <Alerts />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
