import React from "react";
import LOGO from "../assets/images/logo.svg";
import Button from "@mui/material/Button";
import { StyledHeader } from "./containers.styled";
import { useGlobalModalContext } from "../components/GlobalModal";
import { LoginSignupModal } from "../components/LoginSignup";

export const Header = () => {
  const { showModal } = useGlobalModalContext();

  return (
    <StyledHeader>
      <img src={LOGO} alt="logo" />
      <div className="d-flex gap-3">
        <Button href="/about" variant="text" color="primary">
          Find jobs
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            showModal(<LoginSignupModal />);
          }}
        >
          Login
        </Button>
      </div>
    </StyledHeader>
  );
};
