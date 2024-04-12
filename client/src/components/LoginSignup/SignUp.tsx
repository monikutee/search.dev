import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "../../api";
import { SignUpDto } from "../../api/types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGlobalModalContext } from "../GlobalModal";
import FormHelperText from "@mui/material/FormHelperText";

export const SignUp = () => {
  const { hideModal } = useGlobalModalContext();
  const [error, setError] = React.useState(null);

  const [initialValues] = React.useState({
    email: "",
    password: "",
    repeat_password: "",
    name: "",
    phone: "",
    country: "",
    city: "",
  });

  const schema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    repeat_password: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Passwords must match"
    ),
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const onSubmit = async (req: SignUpDto) => {
    try {
      await Api.user.signUp(req);
      hideModal();
    } catch (e: any) {
      setError(e.definedMessage);
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
            name="phone"
            onChange={handleChange}
            label="Phone number"
            helperText={errors.phone}
            error={touched.phone && !!errors.phone}
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
