import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGlobalModalContext } from "./Global/GlobalModal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";
import { Formik } from "formik";
import { CountryCitySelect } from "./Global/CountryCitySelect";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Link } from "react-router-dom";
import { RouteList } from "../routes";
import TextInput from "./Global/TextInputFormik";

export const ApplicantContactInfoModal = () => {
  const { hideModal } = useGlobalModalContext();

  const [initialValues] = React.useState({
    email: "",
    name: "",
    surname: "",
    phoneNumber: "",
    about: "",
    country: "",
    city: "",
    consent: false,
  });

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Must be valid email address")
      .required("Required"),
    name: Yup.string().max(30, "Too long").required("Required"),
    surname: Yup.string().max(50, "Too long").required("Required"),
    phoneNumber: Yup.string()
      .min(8, "Too short")
      .max(21, "Too long")
      .required("Required"),
    country: Yup.string().max(50, "Too long").required("Required"),
    about: Yup.string().max(5000, "Too long").required("Required"),
    city: Yup.string().max(50, "Too long").required("Required"),
    consent: Yup.boolean()
      .required("Required")
      .isTrue("This field must be checked"),
  });

  const onSubmit = async (req: {
    email: string;
    name: string;
    surname: string;
    about: string;
    phoneNumber: string;
    country: string;
    city: string;
  }) => {
    try {
      //   await Api.user.signUp(req).then(() => {
      //     navigate(RouteList.EMAIL_VERIFICATION);
      //   });
      console.log(req);
      //   hideModal();
    } catch (e: any) {
      //   setError(ErrorMessages[e.definedMessage]);
    }
  };

  return (
    <Modal
      open={true}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal"
    >
      <Box className="view big">
        <div className="d-flex justify-content-between align-items-center">
          <Typography variant="body1" mb={2}>
            Please fill the info below to apply, if there is a quiz, we will
            send you the link to given email for applying further
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
              <TextInput name="name" label="Name" />
              <TextInput name="surname" label="Surname" />
              <TextInput name="email" label="Email" />
              <TextInput name="phoneNumber" label="Phone number" />
              <TextInput name="about" rows={10} multiline label="About me" />
              <CountryCitySelect helpers={helpers} />

              <FormControlLabel
                control={
                  <Checkbox
                    name="consent"
                    checked={helpers.values.consent}
                    onChange={helpers.handleChange}
                  />
                }
                label={
                  <Typography color="primary" variant="body1">
                    I have read{" "}
                    <Link to={RouteList.PRIVACY_POLICY} target="_blank">
                      privacy policy
                    </Link>
                  </Typography>
                }
              />
              {helpers.touched.consent && (
                <FormHelperText error>{helpers.errors.consent}</FormHelperText>
              )}

              <Button type="submit" variant="contained">
                Apply
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
