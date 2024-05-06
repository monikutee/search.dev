import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "../../api";
import { LoginDto } from "../../api/types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGlobalModalContext } from "../Global/GlobalModal";
import FormHelperText from "@mui/material/FormHelperText";
import { ErrorMessages } from "../../helpers/constants/ErrorMessages";
import { UserContext } from "../../helpers/UserStore";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../routes";

export const Login = () => {
  const { hideModal } = useGlobalModalContext();
  const [error, setError] = React.useState<string | null>(null);
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const [initialValues] = React.useState({
    email: "",
    password: "",
  });

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Must be valid email address")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (req: LoginDto) => {
    Api.user
      .login(req)
      .then((res) => {
        if (res.data.id) {
          setUserId(res.data.id);
          hideModal();
          navigate(RouteList.MY_JOB_OFFERS_LIST);
        } else {
          hideModal();
          navigate(RouteList.EMAIL_VERIFICATION);
        }
      })
      .catch((e) => setError(ErrorMessages[e.definedMessage]));
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
            name="email"
            onChange={helpers.handleChange}
            label="Email"
            error={helpers.touched.email && !!helpers.errors.email}
            helperText={helpers.errors.email}
          />
          <TextField
            name="password"
            onChange={helpers.handleChange}
            label="Password"
            type="password"
            error={helpers.touched.password && !!helpers.errors.password}
            helperText={helpers.errors.password}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button
            type="submit"
            variant="contained"
            disabled={helpers.isSubmitting}
          >
            Log in
          </Button>
        </form>
      )}
    </Formik>
  );
};
