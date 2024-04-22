import React from "react";
import LOGO from "../assets/images/logo.svg";
import { StyledFooter } from "./containers.styled";
import Link from "@mui/material/Link";
import { RouteList } from "../routes";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <StyledFooter>
      <Link href={RouteList.HOME}>
        <img src={LOGO} alt="logo" />
      </Link>
      <Typography color="primary" variant="body1">
        Contact us:{" "}
        <a href="mailto:petrulevicmonika@gmail.com">
          petrulevicmonika@gmail.com
        </a>
      </Typography>
    </StyledFooter>
  );
};
