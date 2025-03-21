import React, { useContext } from "react";
import * as Yup from "yup";
import Api from "../../api";
import { UserContext } from "../../helpers/UserStore";
import Typography from "@mui/material/Typography";
import {
  RemoteEnum,
  ExperienceLevelEnum,
  JobTypeEnum,
} from "../../helpers/enums/JobOfferEnums";
import { Formik } from "formik";
import { JobOfferDto } from "../../api/types/jobOffer";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  JobTypeText,
  RemoteText,
  RoleText,
  ExperienceLevelText,
  BenefitsText,
  CommitmentsText,
} from "../../helpers/constants/JobOffer";
import { CreatableInput } from "../Global/CreatableInput";
import { QuizBlock } from "./Quizes/QuizBlock";
import TextInput from "../Global/TextInputFormik";
import { AnswerTypeEnum } from "../../helpers/enums/JobOfferEnums";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../routes";
import { CountryCitySelect } from "../Global/CountryCitySelect";
import { toast } from "react-toastify";
import { ErrorMessages } from "../../helpers/constants/ErrorMessages";

export const JobOffer: React.FC<{ data?: JobOfferDto }> = ({ data = null }) => {
  const [error, setError] = React.useState<string | null>(null);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const [initialValues] = React.useState<JobOfferDto>({
    title: data?.title ?? "",
    description: data?.description ?? "",
    country: data?.country ?? "",
    city: data?.city ?? "",
    jobType: data?.jobType ?? "",
    remote: data?.remote ?? "",
    experienceLevel: data?.experienceLevel ?? "",
    role: data?.role ?? "",
    benefits: data?.benefits ?? [],
    commitments: data?.commitments ?? [],
    isActive: data?.isActive ?? false,
    quizzes: data?.quizzes ?? [],
  });

  const onSubmit = async (req: JobOfferDto) => {
    if (userId)
      if (data) {
        Api.jobOffer
          .createJobOffer(userId, { ...req, id: data.id })
          .then(() => {
            navigate(RouteList.MY_JOB_OFFERS_LIST);
          })
          .catch((e) => {
            setError(ErrorMessages[e.definedMessage]);
            toast.error(ErrorMessages[e.definedMessage], {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } else
        Api.jobOffer
          .createJobOffer(userId, req)
          .then(() => {
            navigate(RouteList.MY_JOB_OFFERS_LIST);
          })
          .catch((e) => {
            setError(ErrorMessages[e.definedMessage]);
            toast.error(ErrorMessages[e.definedMessage], {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too short")
      .max(100, "Too long")
      .required("Required"),
    description: Yup.string()
      .min(10, "Too short")
      .max(5000, "Too long")
      .required("Required"),
    city: Yup.string().max(50, "Too long").required("Required"),
    country: Yup.string().max(50, "Too long").required("Required"),
    jobType: Yup.string().max(30, "Too long").required("Required"),
    remote: Yup.string().max(30, "Too long").required("Required"),
    experienceLevel: Yup.string().max(100, "Too long").required("Required"),
    role: Yup.string().max(100, "Too long").required("Required"),
    benefits: Yup.array()
      .max(50, "Too much")
      .of(Yup.string().max(100, "Too long")),
    commitments: Yup.array()
      .max(50, "Too much")
      .of(Yup.string().max(100, "Too long")),
    isActive: Yup.boolean().required(),
    quizzes: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        questions: Yup.array()
          .min(1)
          .of(
            Yup.object().shape({
              questionText: Yup.string()
                .max(300, "Too long")
                .required("Required"),
              questionType: Yup.string().required("Required"),
              questionChoices: Yup.array().when(
                "questionType",
                (questionType) => {
                  // eslint-disable-next-line
                  return (questionType as unknown as string) ==
                    AnswerTypeEnum.MULTI
                    ? Yup.array()
                        .min(2, "At least two choices are required")
                        .of(
                          Yup.object().shape({
                            choiceText: Yup.string()
                              .max(100, "Too long")
                              .required("Required"),
                            isCorrect: Yup.boolean().required("Required"),
                          })
                        )
                        .test(
                          "isCorrect-test",
                          "At least one choice must be marked as correct",
                          (choices) =>
                            choices?.some((choice) => choice.isCorrect)
                        )
                        .required("Required")
                    : Yup.array().nullable();
                }
              ),
              codeLanguage: Yup.string().when(
                "questionType",
                (questionType) => {
                  // eslint-disable-next-line
                  return (questionType as unknown as string) ==
                    AnswerTypeEnum.CODE
                    ? Yup.string().required()
                    : Yup.string().nullable();
                }
              ),
            })
          ),
      })
    ),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnMount={false}
        validationSchema={schema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(helpers) => (
          <form
            onSubmit={helpers.handleSubmit}
            className="d-flex flex-column gap-3"
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  checked={helpers.values.isActive}
                  onChange={helpers.handleChange}
                />
              }
              label="Is this job offer active?"
            />
            <TextInput name="title" label="Job offer title" />
            <TextInput
              name="description"
              rows={10}
              multiline
              label="Thoroughly write job description with desirable applicant skill set ant etc."
            />
            <CountryCitySelect helpers={helpers} />

            <FormControl fullWidth>
              <InputLabel id="job-type-label">Job type</InputLabel>
              <Select
                labelId="job-type-label"
                name="jobType"
                label="Job type"
                value={helpers.values.jobType}
                onChange={helpers.handleChange}
                error={helpers.touched.jobType && !!helpers.errors.jobType}
              >
                {Object.values(JobTypeEnum).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {JobTypeText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              {helpers.touched.jobType && (
                <FormHelperText error>{helpers.errors.jobType}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="remote-label">Remote</InputLabel>
              <Select
                labelId="remote-label"
                name="remote"
                label="Remote"
                value={helpers.values.remote}
                onChange={helpers.handleChange}
                error={helpers.touched.remote && !!helpers.errors.remote}
              >
                {Object.values(RemoteEnum).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {RemoteText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              {helpers.touched.remote && (
                <FormHelperText error>{helpers.errors.remote}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="experienceLevel-label">
                Experience Level
              </InputLabel>
              <Select
                labelId="experienceLevel-label"
                name="experienceLevel"
                label="Experience level"
                value={helpers.values.experienceLevel}
                onChange={helpers.handleChange}
                error={
                  helpers.touched.experienceLevel &&
                  !!helpers.errors.experienceLevel
                }
              >
                {Object.values(ExperienceLevelEnum).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {ExperienceLevelText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              {helpers.touched.experienceLevel && (
                <FormHelperText error>
                  {helpers.errors.experienceLevel}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                label="Role"
                value={helpers.values.role}
                onChange={helpers.handleChange}
                error={helpers.touched.role && !!helpers.errors.role}
              >
                {Object.keys(RoleText).map((value) => {
                  return (
                    <MenuItem value={value} key={value}>
                      {RoleText[value]}
                    </MenuItem>
                  );
                })}
              </Select>
              {helpers.touched.role && (
                <FormHelperText error>{helpers.errors.role}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <CreatableInput
                label="Benefits"
                value={helpers.values.benefits}
                error={helpers.touched.benefits && !!helpers.errors.benefits}
                handleChange={(value) =>
                  helpers.setFieldValue("benefits", value)
                }
                options={Object.values(BenefitsText)}
              />
              {helpers.touched.benefits && (
                <FormHelperText error>{helpers.errors.benefits}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <CreatableInput
                label="Commitments"
                value={helpers.values.commitments}
                error={
                  helpers.touched.commitments && !!helpers.errors.commitments
                }
                handleChange={(value) =>
                  helpers.setFieldValue("commitments", value)
                }
                options={Object.values(CommitmentsText)}
              />
              {helpers.touched.commitments && (
                <FormHelperText error>
                  {helpers.errors.commitments}
                </FormHelperText>
              )}
            </FormControl>
            {error && <FormHelperText error>{error}</FormHelperText>}

            <hr />

            {helpers.values.quizzes && (
              <QuizBlock
                disable={
                  data?.applicantCount
                    ? data?.applicantCount > 0
                      ? true
                      : false
                    : false
                }
                quizzes={helpers.values.quizzes}
                fieldName="quizzes"
                formikHelpers={helpers}
              />
            )}
            {data?.applicantCount ? (
              data?.applicantCount > 0 ? (
                <Typography color="secondary">
                  *You can not edit quizzes, because there are applicants.
                </Typography>
              ) : (
                <Typography color="secondary">
                  *When this job offer will have at least one applicant editing
                  quizzes or adding new ones will be forbidden.
                </Typography>
              )
            ) : (
              <Typography color="secondary">
                *When this job offer will have at least one applicant editing
                quizzes or adding new ones will be forbidden.
              </Typography>
            )}

            <hr />
            <Button
              type="submit"
              variant="contained"
              disabled={helpers.isSubmitting}
            >
              {data ? "Update" : "Create"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
