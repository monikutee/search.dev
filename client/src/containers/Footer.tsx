import React from "react";
import LOGO from "../assets/images/logo.svg";
import { StyledFooter } from "./containers.styled";

export const Footer = () => {
  return (
    <StyledFooter>
      <img src={LOGO} alt="logo" />
    </StyledFooter>
  );
};
