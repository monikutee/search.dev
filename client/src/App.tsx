import React, { Suspense } from "react";
import "./App.css";
import { GlobalModal } from "./components/GlobalModal";
import LogoutTimer from "./components/LogoutTimer";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteList } from "./routes";
import { Homepage } from "./pages/Homepage";
import { NoMatch } from "./pages/NoMatch";
import { UserContextProvider } from "./helpers/UserStore";
import GlobalLoader from "./components/GlobalLoader";
import { Profile } from "./pages/Profile";

const App = () => {
  return (
    <React.Fragment>
      <UserContextProvider>
        <GlobalModal>
          <Suspense fallback={<GlobalLoader />}>
            <LogoutTimer />
            <Routes>
              <Route path={RouteList.HOME} element={<Homepage />} />
              <Route path={RouteList.PROFILE} element={<Profile />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </GlobalModal>
      </UserContextProvider>
    </React.Fragment>
  );
};

export default App;
