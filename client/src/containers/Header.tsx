import React, { useContext } from "react";
import LOGO from "../assets/images/logo.svg";
import Button from "@mui/material/Button";
import { StyledHeader } from "./containers.styled";
import { useGlobalModalContext } from "../components/GlobalModal";
import { LoginSignUpModal } from "../components/LoginSignup";
import { UserContext } from "../helpers/UserStore";
import Api from "../api";
import Loader from "../components/Loader";
import Link from "@mui/material/Link";
import { RouteList } from "../routes";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

export const Header = () => {
  const { showModal } = useGlobalModalContext();
  const { user, setUser, setUserId, isLoading } = useContext(UserContext);

  const logout = async () => {
    try {
      await Api.user.logout().then(() => {
        setUser(null);
        setUserId(null);
        localStorage.removeItem("user");
      });
    } catch (e: any) {
      toast.error("An unexpected error occured!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <StyledHeader>
      <Link href={RouteList.HOME}>
        <img src={LOGO} alt="logo" />
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <div className="d-flex gap-3">
              <IconButton
                color="primary"
                aria-label="close modal"
                href={RouteList.PROFILE}
              >
                <AccountCircleIcon />
              </IconButton>
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
        </>
      )}
    </StyledHeader>
  );
};
