import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./helpers/ScrollToTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const history = createBrowserHistory();

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  </ThemeProvider>
);

reportWebVitals();
