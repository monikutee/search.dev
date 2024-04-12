import React from "react";
import { Layout } from "../containers";
import ErrorSvg from "../assets/images/404.svg";

export const NoMatch = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
        <img src={ErrorSvg} className="w-100" alt="404 error page not found" />
      </div>
    </Layout>
  );
};
