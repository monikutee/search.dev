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
import { ForgotPasswordFinish } from "./ForgotPassswordFinish";

export const ForgotPasswordStart = () => {
  const { hideModal, showModal } = useGlobalModalContext();
  const [error, setError] = React.useState<string | null>(null);

  const [initialValues] = React.useState({
    email: "",
  });

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Must be valid email address")
      .required("Required"),
  });

  const onSubmit = async (req: { email: string }) => {
    Api.user
      .startPasswordReset(req.email)
      .then(() => {
        toast.success("Please check you email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        showModal(<ForgotPasswordFinish />);
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
                name="email"
                onChange={helpers.handleChange}
                label="Email"
                error={helpers.touched.email && !!helpers.errors.email}
                helperText={helpers.errors.email}
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
              <Button
                type="submit"
                variant="contained"
                disabled={helpers.isSubmitting}
              >
                Send password reset token
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
