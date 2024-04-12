import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGlobalModalContext } from "../GlobalModal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const LoginSignUpModal = () => {
  const { hideModal } = useGlobalModalContext();
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <Modal
      open={true}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal"
    >
      <Box className="view">
        <div className="d-flex justify-content-between align-items-center">
          <Typography variant="h6" component="h2" mb={2}>
            Welcome, please fill the info below to{" "}
            {isLogin ? "login" : "sign up"}
          </Typography>
          <IconButton
            color="primary"
            aria-label="close modal"
            onClick={hideModal}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {isLogin ? <Login /> : <SignUp />}
        {isLogin ? (
          <Button
            variant={"text"}
            size={"small"}
            sx={{ mt: 2 }}
            onClick={() => setIsLogin(false)}
          >
            Do not have an account?
          </Button>
        ) : (
          <Button
            variant={"text"}
            size={"small"}
            sx={{ mt: 2 }}
            onClick={() => setIsLogin(true)}
          >
            Do you have an account?
          </Button>
        )}
      </Box>
    </Modal>
  );
};
