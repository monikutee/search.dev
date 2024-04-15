import React from "react";
import * as Yup from "yup";
import Api from "../../api";
import { UserContext } from "../../helpers/UserStore";

import {
  RemoteEnum,
  ExperienceLevelEnum,
  JobTypeEnum,
} from "../../helpers/enums/JobOfferEnums";
import { Formik } from "formik";
import { JobOfferCreateDto } from "../../api/types/jobOffer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import {
  JobTypeText,
  RemoteText,
  RoleText,
  ExperienceLevelText,
  BenefitsText,
  CommitmentsText,
} from "../../helpers/constants/JobOfferText";
import Chip from "@mui/material/Chip";
import { CreatableInput } from "../CreatableInput";

export const JobOffer: React.FC<{ data?: JobOfferCreateDto }> = ({
  data = null,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const [initialValues, setInitialValues] = React.useState<JobOfferCreateDto>({
    title: data?.title ?? "",
    description: data?.description ?? "",
    country: data?.country ?? "",
    jobType: data?.jobType ?? "",
    remote: data?.remote ?? "",
    experienceLevel: data?.experienceLevel ?? "",
    role: data?.role ?? "",
    benefits: data?.benefits ?? [],
    commitments: data?.commitments ?? [],
    isActive: data?.isActive ?? false,
    quizzes: data?.quizzes ?? [],
  });

  const onSubmit = async (req: JobOfferCreateDto) => {
    try {
      console.log(req);
    } catch (e: any) {
      setError(e.definedMessage);
    }
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    jobType: Yup.string().required("Required"),
    remote: Yup.string().required("Required"),
    experienceLevel: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    benefits: Yup.array().of(Yup.string()),
    commitments: Yup.array().of(Yup.string()),
    isActive: Yup.boolean(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnMount={false}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          values,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  value={values.isActive}
                  onChange={handleChange}
                />
              }
              label="Is this job offer active?"
            />

            <TextField
              value={values.title}
              name="title"
              onChange={handleChange}
              label="Job offer title"
              helperText={errors.title}
              error={touched.title && !!errors.title}
            />
            <TextField
              value={values.description}
              name="description"
              rows={10}
              onChange={handleChange}
              multiline
              label="Job offer description"
              helperText={errors.description}
              error={touched.description && !!errors.description}
            />
            <TextField
              name="country"
              value={values.country}
              onChange={handleChange}
              label="Country"
              helperText={errors.country}
              error={touched.country && !!errors.country}
            />
            <FormControl fullWidth>
              <InputLabel id="job-type-label">Job type</InputLabel>
              <Select
                labelId="job-type-label"
                name="jobType"
                label="Job type"
                value={values.jobType}
                onChange={handleChange}
                error={touched.jobType && !!errors.jobType}
              >
                {Object.values(JobTypeEnum).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {JobTypeText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error>{errors.jobType}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="remote-label">Remote</InputLabel>
              <Select
                labelId="remote-label"
                name="remote"
                label="Remote"
                value={values.remote}
                onChange={handleChange}
                error={touched.remote && !!errors.remote}
              >
                {Object.values(RemoteEnum).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {RemoteText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error>{errors.remote}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="experienceLevel-label">Remote</InputLabel>
              <Select
                labelId="experienceLevel-label"
                name="experienceLevel"
                label="Experience level"
                value={values.experienceLevel}
                onChange={handleChange}
                error={touched.experienceLevel && !!errors.experienceLevel}
              >
                {Object.values(ExperienceLevelEnum).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {ExperienceLevelText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error>{errors.experienceLevel}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                label="Role"
                value={values.role}
                onChange={handleChange}
                error={touched.role && !!errors.role}
              >
                {Object.keys(RoleText).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {RoleText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error>{errors.role}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <CreatableInput
                label="Benefits"
                value={values.benefits}
                error={touched.benefits && !!errors.benefits}
                handleChange={(value) => setFieldValue("benefits", value)}
                options={Object.values(BenefitsText)}
              />
              <FormHelperText error>{errors.benefits}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <CreatableInput
                label="Commitments"
                value={values.commitments}
                error={touched.commitments && !!errors.commitments}
                handleChange={(value) => setFieldValue("commitments", value)}
                options={Object.values(CommitmentsText)}
              />
              <FormHelperText error>{errors.commitments}</FormHelperText>
            </FormControl>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
