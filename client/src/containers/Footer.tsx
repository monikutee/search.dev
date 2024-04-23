import React from "react";
import LOGO from "../assets/images/logo.svg";
import { StyledFooter } from "./containers.styled";
import { RouteList } from "../routes";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <StyledFooter>
      <Link to={RouteList.HOME}>
        <img src={LOGO} alt="logo" />
      </Link>
      <div>
        <Typography color="primary" variant="body1">
          <a href="mailto:petrulevicmonika@gmail.com">
            petrulevicmonika@gmail.com
          </a>
        </Typography>

        <Typography color="primary" variant="body1">
          <Link to={RouteList.PRIVACY_POLICY}>Privacy Policy</Link>
        </Typography>
      </div>
    </StyledFooter>
  );
};
