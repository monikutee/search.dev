import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "../../api";
import { SignUpDto } from "../../api/types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGlobalModalContext } from "../Global/GlobalModal";
import FormHelperText from "@mui/material/FormHelperText";
import { ErrorMessages } from "../../helpers/constants/ErrorMessages";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../routes";
import { CountryCitySelect } from "../Global/CountryCitySelect";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const { hideModal } = useGlobalModalContext();
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const [initialValues] = React.useState({
    email: "",
    password: "",
    repeat_password: "",
    name: "",
    phoneNumber: "",
    country: "",
    city: "",
    consent: false,
  });

  const schema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
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
    name: Yup.string().max(100, "Too long").required("Required"),
    phoneNumber: Yup.string()
      .min(8, "Too short")
      .max(21, "Too long")
      .required("Required"),
    country: Yup.string().max(50, "Too long").required("Required"),
    city: Yup.string().max(50, "Too long").required("Required"),
    consent: Yup.boolean()
      .required("Required")
      .isTrue("This field must be checked"),
  });

  const onSubmit = async (req: SignUpDto) => {
    Api.user
      .signUp(req)
      .then(() => {
        navigate(RouteList.EMAIL_VERIFICATION);
      })
      .catch((e) => setError(ErrorMessages[e.definedMessage]));
    hideModal();
  };

  return (
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
            name="name"
            onChange={helpers.handleChange}
            label="Company name"
            helperText={helpers.errors.name}
            error={helpers.touched.name && !!helpers.errors.name}
          />
          <TextField
            name="email"
            onChange={helpers.handleChange}
            label="Email"
            helperText={helpers.errors.email}
            error={helpers.touched.email && !!helpers.errors.email}
          />
          <TextField
            name="phoneNumber"
            onChange={helpers.handleChange}
            label="Phone number"
            helperText={helpers.errors.phoneNumber}
            error={helpers.touched.phoneNumber && !!helpers.errors.phoneNumber}
          />
          <CountryCitySelect helpers={helpers} />
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
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        </form>
      )}
    </Formik>
  );
};
