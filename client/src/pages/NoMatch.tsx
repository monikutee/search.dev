import React from "react";
import { Layout } from "../containers";
import ErrorSvg from "../assets/images/404.svg";
import Typography from "@mui/material/Typography";

export const NoMatch = () => {
  return (
    <Layout>
      <div className="d-flex flex-column gap-5 align-items-center justify-content-center mt-5 pt-5">
        <img src={ErrorSvg} className="w-100" alt="404 error page not found" />
        <Typography variant="h3" color="primary" textAlign={"center"}>
          PAGE NOT FOUND
        </Typography>
      </div>
    </Layout>
  );
};
