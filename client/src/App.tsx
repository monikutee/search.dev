import React, { Suspense } from "react";
import "./App.css";
import { GlobalModal } from "./components/Global/GlobalModal";
import LogoutTimer from "./components/Global/LogoutTimer";
import { Routes, Route, Navigate } from "react-router-dom";
import { RouteList } from "./routes";
import { Homepage } from "./pages/Homepage";
import { NoMatch } from "./pages/NoMatch";
import { UserContextProvider } from "./helpers/UserStore";
import GlobalLoader from "./components/Global/GlobalLoader";
import { Profile } from "./pages/Profile";
import { EditJobOffer } from "./pages/EditJobOffer";
import { AllJobOffers } from "./pages/AllJobOffers";
import { ViewJobOffer } from "./pages/ViewJobOffer";
import { ApplyForJobOffer } from "./pages/ApplyForJobOffer";
import { EmailVerification } from "./pages/EmailVerification";
import { EmailVerificationCheck } from "./pages/EmailVerificationCheck";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

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
              <Route
                path={RouteList.PRIVACY_POLICY}
                element={<PrivacyPolicy />}
              />
              <Route
                path={RouteList.EMAIL_VERIFICATION}
                element={<EmailVerification />}
              />
              <Route
                path={RouteList.EMAIL_VERIFICATION_PROCESS}
                element={<EmailVerificationCheck />}
              />
              <Route
                path={RouteList.MY_JOB_OFFERS_LIST}
                element={<Profile value={1} />}
              />
              <Route
                path={RouteList.CREATE_JOB_OFFER}
                element={<Profile value={2} />}
              />
              <Route
                path={RouteList.EDIT_JOB_OFFER}
                element={<EditJobOffer />}
              />
              <Route
                path={RouteList.ALL_JOB_OFFERS}
                element={<AllJobOffers />}
              />
              <Route
                path={RouteList.VIEW_JOB_OFFER}
                element={<ViewJobOffer />}
              />
              <Route path={RouteList.APPLY} element={<ApplyForJobOffer />} />

              <Route
                path="*"
                element={<Navigate to={RouteList.PAGE_NOT_FOUND} replace />}
              />
              <Route path="/404" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </GlobalModal>
      </UserContextProvider>
    </React.Fragment>
  );
};

export default App;
