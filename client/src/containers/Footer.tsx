import React from "react";
import LOGO from "../assets/images/logo.svg";
import { StyledFooter } from "./containers.styled";
import Link from "@mui/material/Link";
import { RouteList } from "../routes";

export const Footer = () => {
  return (
    <StyledFooter>
      <Link href={RouteList.HOME}>
        <img src={LOGO} alt="logo" />
      </Link>
    </StyledFooter>
  );
};
