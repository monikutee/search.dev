import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "../api";
import { UserI } from "../api/types/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { UserContext } from "../helpers/UserStore";
import Loader from "./Global/Loader";
import Typography from "@mui/material/Typography";

export const ProfileInfo: React.FC<{ user: UserI }> = ({ user }) => {
  const [error, setError] = React.useState(null);
  const { setUserId } = useContext(UserContext);
  const [initialValues, setInitialValues] = React.useState<UserI | null>(null);

  React.useEffect(() => {
    setInitialValues({
      id: user.id,
      email: user.email,
      about: user.about ?? "",
      name: user.name ?? "",
      phoneNumber: user.phoneNumber ?? "",
      country: user.country ?? "",
      city: user.city ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const schema = Yup.object().shape({
    email: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const onSubmit = async (req: UserI) => {
    try {
      if (!user) return;
      await Api.user.editUser(req).then((res) => {
        setUserId(res.data.id);
      });
    } catch (e: any) {
      setError(e.definedMessage);
    }
  };

  return initialValues ? (
    <Formik
      initialValues={initialValues}
      validateOnMount={false}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, touched, errors, values }) => (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <TextField
            disabled
            value={values.name}
            name="name"
            onChange={handleChange}
            label="Company name"
            helperText={errors.name}
            error={touched.name && !!errors.name}
          />
          <TextField
            value={values.about}
            name="about"
            onChange={handleChange}
            multiline
            rows={7}
            label="About company"
            helperText={errors.about}
            error={touched.about && !!errors.about}
          />
          <TextField
            disabled
            name="email"
            value={values.email}
            onChange={handleChange}
            label="Email"
            helperText={errors.email}
            error={touched.email && !!errors.email}
          />
          <TextField
            disabled
            value={values.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            label="Phone number"
            helperText={errors.phoneNumber}
            error={touched.phoneNumber && !!errors.phoneNumber}
          />
          <TextField
            disabled
            name="country"
            value={values.country}
            onChange={handleChange}
            label="Country"
            helperText={errors.country}
            error={touched.country && !!errors.country}
          />
          <TextField
            disabled
            name="city"
            value={values.city}
            onChange={handleChange}
            label="City"
            helperText={errors.city}
            error={touched.city && !!errors.city}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Typography variant="body1" color="secondary">
            *If you want to update any of the disabled fields, please contact{" "}
            <a href="mailto:petrulevicmonika@gmail.com">our support</a>
          </Typography>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      )}
    </Formik>
  ) : (
    <div className="d-flex align-items-center justify-content-center">
      <Loader />
    </div>
  );
};
