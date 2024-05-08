import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGlobalModalContext } from "../Global/GlobalModal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Formik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import Api from "../../api";
import TextField from "@mui/material/TextField";
import { ErrorMessages } from "../../helpers/constants/ErrorMessages";
import { toast } from "react-toastify";
import { LoginSignUpModal } from "../LoginSignup";

export const ForgotPasswordFinish = () => {
  const { hideModal, showModal } = useGlobalModalContext();
  const [error, setError] = React.useState<string | null>(null);

  const [initialValues] = React.useState({
    token: "",
    password: "",
    repeat_password: "",
  });

  const schema = Yup.object().shape({
    token: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
        "Password should contain at least 8 characters, one upper case letter, and one lower case letter, special symbol and number"
      ),
    repeat_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (req: { token: string; password: string }) => {
    Api.user
      .finishPasswordReset(req)
      .then(() => {
        toast.success("Password updated successfully, please login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        showModal(<LoginSignUpModal />);
      })
      .catch((e) => setError(ErrorMessages[e.definedMessage]));
  };

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
            To reset your password please enter your email
          </Typography>
          <IconButton
            color="primary"
            aria-label="close modal"
            onClick={hideModal}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Formik
          initialValues={initialValues}
          validateOnMount={false}
          validationSchema={schema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(helpers) => (
            <form
              onSubmit={helpers.handleSubmit}
              className="d-flex flex-column gap-3"
            >
              <TextField
                name="token"
                onChange={helpers.handleChange}
                label="Token"
                error={helpers.touched.token && !!helpers.errors.token}
                helperText={helpers.errors.token}
              />
              <TextField
                name="password"
                onChange={helpers.handleChange}
                label="Password"
                type="password"
                helperText={helpers.errors.password}
                error={helpers.touched.password && !!helpers.errors.password}
              />
              <TextField
                name="repeat_password"
                onChange={helpers.handleChange}
                type="password"
                label="Repeat password"
                helperText={helpers.errors.repeat_password}
                error={
                  helpers.touched.repeat_password &&
                  !!helpers.errors.repeat_password
                }
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
              <Button
                type="submit"
                variant="contained"
                disabled={helpers.isSubmitting}
              >
                Reset password
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
