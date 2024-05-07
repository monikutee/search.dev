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
import { toast } from "react-toastify";
import { CountryCitySelect } from "./Global/CountryCitySelect";

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
    about: Yup.string().max(5000).required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const onSubmit = async (req: UserI) => {
    if (!user) return;
    Api.user
      .editUser(user.id, req)
      .then((res) => {
        setUserId(res.data.id);
        toast.success("Successfully updated your profile", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((e) => {
        setError(e.definedMessage);
      });
  };

  return initialValues ? (
    <Formik
      initialValues={initialValues}
      validateOnMount={false}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {(helpers) => (
        <form
          onSubmit={helpers.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <TextField
            disabled
            value={helpers.values.name}
            name="name"
            onChange={helpers.handleChange}
            label="Company name"
            helperText={helpers.errors.name}
            error={helpers.touched.name && !!helpers.errors.name}
          />
          <TextField
            value={helpers.values.about}
            name="about"
            onChange={helpers.handleChange}
            multiline
            rows={7}
            label="About company"
            helperText={helpers.errors.about}
            error={helpers.touched.about && !!helpers.errors.about}
          />
          <TextField
            disabled
            name="email"
            value={helpers.values.email}
            onChange={helpers.handleChange}
            label="Email"
            helperText={helpers.errors.email}
            error={helpers.touched.email && !!helpers.errors.email}
          />
          <TextField
            disabled
            value={helpers.values.phoneNumber}
            name="phoneNumber"
            onChange={helpers.handleChange}
            label="Phone number"
            helperText={helpers.errors.phoneNumber}
            error={helpers.touched.phoneNumber && !!helpers.errors.phoneNumber}
          />
          <CountryCitySelect helpers={helpers} disabled />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Typography variant="body1" color="secondary">
            *If you want to update any of the disabled fields, please contact{" "}
            <a href="mailto:petrulevicmonika@gmail.com">our support</a>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={helpers.isSubmitting}
          >
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
