import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "../../api";
import { LoginDto } from "../../api/types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGlobalModalContext } from "../GlobalModal";
import FormHelperText from "@mui/material/FormHelperText";
import { ErrorMessages } from "../../helpers/constants/ErrorMessages";
import { UserContext } from "../../helpers/UserStore";

export const Login = () => {
  const { hideModal } = useGlobalModalContext();
  const [error, setError] = React.useState<string | null>(null);
  const { setUserId } = useContext(UserContext);

  const [initialValues] = React.useState({
    email: "",
    password: "",
  });

  const schema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (req: LoginDto) => {
    try {
      await Api.user.login(req).then((res) => {
        setUserId(res.data.id);
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
            name="email"
            onChange={handleChange}
            label="Email"
            error={touched.email && !!errors.email}
          />
          <TextField
            name="password"
            onChange={handleChange}
            label="Password"
            type="password"
            error={touched.password && !!errors.password}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </form>
      )}
    </Formik>
  );
};
