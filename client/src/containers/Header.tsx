import React, { useContext } from "react";
import LOGO from "../assets/images/logo.svg";
import Button from "@mui/material/Button";
import { StyledHeader } from "./containers.styled";
import { useGlobalModalContext } from "../components/GlobalModal";
import { LoginSignUpModal } from "../components/LoginSignup";
import { UserContext } from "../helpers/UserStore";
import Api from "../api";

export const Header = () => {
  const { showModal } = useGlobalModalContext();
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await Api.user.logout().then(() => {
        setUser(null);
        localStorage.removeItem("user");
      });
    } catch (e: any) {
      //   setError(e.definedMessage);
    }
  };

  return (
    <StyledHeader>
      <img src={LOGO} alt="logo" />
      {user ? (
        <div className="d-flex gap-3">
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="d-flex gap-3">
          <Button href="/about" variant="text" color="primary">
            Find jobs
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              showModal(<LoginSignUpModal />);
            }}
          >
            Login
          </Button>
        </div>
      )}
    </StyledHeader>
  );
};
