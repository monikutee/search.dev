import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "../../api";
import { SignUpDto } from "../../api/types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGlobalModalContext } from "../Global/GlobalModal";
import FormHelperText from "@mui/material/FormHelperText";
import { UserContext } from "../../helpers/UserStore";
import { ErrorMessages } from "../../helpers/constants/ErrorMessages";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../routes";

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
  });

  const schema = Yup.object().shape({
    email: Yup.string().required("Required"),
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
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const onSubmit = async (req: SignUpDto) => {
    try {
      await Api.user.signUp(req).then(() => {
        navigate(RouteList.EMAIL_VERIFICATION);
      });
      hideModal();
    } catch (e: any) {
      setError(ErrorMessages[e.definedMessage]);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={false}
      validationSchema={schema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit, handleChange, touched, errors }) => (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <TextField
            name="name"
            onChange={handleChange}
            label="Company name"
            helperText={errors.name}
            error={touched.name && !!errors.name}
          />
          <TextField
            name="email"
            onChange={handleChange}
            label="Email"
            helperText={errors.email}
            error={touched.email && !!errors.email}
          />
          <TextField
            name="phoneNumber"
            onChange={handleChange}
            label="Phone number"
            helperText={errors.phoneNumber}
            error={touched.phoneNumber && !!errors.phoneNumber}
          />
          <TextField
            name="country"
            onChange={handleChange}
            label="Country"
            helperText={errors.country}
            error={touched.country && !!errors.country}
          />
          <TextField
            name="city"
            onChange={handleChange}
            label="City"
            helperText={errors.city}
            error={touched.city && !!errors.city}
          />
          <TextField
            name="password"
            onChange={handleChange}
            label="Password"
            type="password"
            helperText={errors.password}
            error={touched.password && !!errors.password}
          />
          <TextField
            name="repeat_password"
            onChange={handleChange}
            type="password"
            label="Repeat password"
            helperText={errors.repeat_password}
            error={touched.repeat_password && !!errors.repeat_password}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        </form>
      )}
    </Formik>
  );
};
