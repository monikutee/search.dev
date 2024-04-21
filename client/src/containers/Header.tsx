import React, { useContext } from "react";
import LOGO from "../assets/images/logo.svg";
import Button from "@mui/material/Button";
import { StyledHeader } from "./containers.styled";
import { useGlobalModalContext } from "../components/Global/GlobalModal";
import { LoginSignUpModal } from "../components/LoginSignup";
import { UserContext } from "../helpers/UserStore";
import Api from "../api";
import Loader from "../components/Global/Loader";
import { RouteList } from "../routes";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link } from "react-router-dom";

export const Header = () => {
  const { showModal } = useGlobalModalContext();
  const { user, setUser, setUserId, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await Api.user.logout().then(() => {
        setUser(null);
        setUserId(null);
        localStorage.removeItem("user");
        navigate(RouteList.HOME);
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
      <Link to={RouteList.HOME}>
        <img src={LOGO} alt="logo" />
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <div className="d-flex gap-3">
              <Link to={RouteList.PROFILE}>
                <IconButton color="primary" aria-label="close modal">
                  <AccountCircleIcon />
                </IconButton>
              </Link>

              <Button variant="contained" color="primary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Link to={RouteList.ALL_JOB_OFFERS}>
                <Button variant="text" color="primary">
                  Find jobs
                </Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  showModal(<LoginSignUpModal />);
                }}
              >
                Hire
              </Button>
            </div>
          )}
        </>
      )}
    </StyledHeader>
  );
};
