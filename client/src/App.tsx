import React from "react";
import "./App.css";
import { GlobalModal } from "./components/GlobalModal";
import LogoutTimer from "./components/LogoutTimer";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteList } from "./routes";
import { Homepage } from "./pages/Homepage";
import { NoMatch } from "./pages/NoMatch";

const App = () => {
  return (
    <React.Fragment>
      <GlobalModal>
        <>
          <LogoutTimer />
          <Routes>
            <Route path={RouteList.HOME} element={<Homepage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/404" element={<NoMatch />} />
          </Routes>
        </>
      </GlobalModal>
    </React.Fragment>
  );
};

export default App;
