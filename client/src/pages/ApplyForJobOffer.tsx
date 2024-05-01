import React from "react";
import { Layout } from "../containers";
import { useParams, useNavigate } from "react-router-dom";
import { RouteList } from "../routes";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {
  ExperienceLevelText,
  JobTypeText,
  RemoteText,
  RoleText,
} from "../helpers/constants/JobOffer";
import Loader from "../components/Global/Loader";
import { AnswerTypeEnum } from "../helpers/enums/JobOfferEnums";
import { CodeQuestion } from "../components/ApplicantQuestions/CodeQuestion";
import { MultiQuestion } from "../components/ApplicantQuestions/MultiQuestion";
import { OpenQuestion } from "../components/ApplicantQuestions/OpenQuestion";
import { ApplyAnswerI, ApplyQuestionI } from "../api/types/applicant";
import { Formik, Form, FieldArray } from "formik";
import Button from "@mui/material/Button";
import Api from "../api";
import { toast } from "react-toastify";
import { ErrorMessages } from "../helpers/constants/ErrorMessages";
import * as Yup from "yup";

type QuestionComponentProps = {
  question: ApplyQuestionI;
  num: number;
  fieldName: string;
  form?: any;
};

const questionComponents: Record<
  AnswerTypeEnum,
  React.FC<QuestionComponentProps>
> = {
  [AnswerTypeEnum.CODE]: CodeQuestion,
  [AnswerTypeEnum.MULTI]: MultiQuestion,
  [AnswerTypeEnum.OPEN]: OpenQuestion,
};

export const ApplyForJobOffer = () => {
  const [jobOffer, setJobOffer] = React.useState<any | null>(null);
  const { applicantId } = useParams<{ applicantId: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (applicantId) {
      Api.applicant
        .fetchOneJobOfferApply(applicantId)
        .then((res) => setJobOffer(res.data))
        .catch((e) => {
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
          navigate(RouteList.HOME);
        });
    } else {
      navigate(RouteList.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicantId]);

  if (!jobOffer) {
    return (
      <Layout>
        <div className="d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      </Layout>
    );
  }

  const initialValues = {
    quizzes: jobOffer.quizzes.map(
      (quiz: { id: string; questions: ApplyQuestionI[] }) => ({
        id: quiz.id,
        questions: quiz.questions.map((question) => {
          switch (question.questionType) {
            case AnswerTypeEnum.CODE:
              return {
                question: { id: question.id },
                answerText: "",
                codeOutput: "",
              };
            case AnswerTypeEnum.MULTI:
              return {
                question: { id: question.id },
                questionChoices: [],
              };
            case AnswerTypeEnum.OPEN:
              return {
                question: { id: question.id },
                answerText: "",
              };
          }
          return null;
        }),
      })
    ),
  };

  const validationSchema = Yup.object({
    quizzes: Yup.array()
      .of(
        Yup.object({
          questions: Yup.array()
            .of(
              Yup.object()
                .shape({
                  question: Yup.object({
                    id: Yup.string().required("Question ID is required"),
                  }),
                  answerText: Yup.string(),
                  codeOutput: Yup.string(),
                  questionChoices: Yup.array().of(
                    Yup.object({
                      id: Yup.string().required("Question ID is required"),
                    })
                  ),
                })
                .nullable()
            )
            .required("Questions are required"),
        })
      )
      .required("Quizzes are required"),
  });

  const handleSubmit = (values: any) => {
    const answers = values.quizzes.flatMap(
      (quiz: { id: string; questions: ApplyAnswerI[] }) =>
        quiz.questions.map((question: ApplyAnswerI) => {
          return question;
        })
    );

    if (!applicantId || !jobOffer.id) {
      navigate(RouteList.HOME);
      return;
    }

    Api.applicant
      .submitApplicantAnswers(jobOffer.id, applicantId, { answers })
      .then(() => {
        toast.success(
          "Thank you for applying! We will collect everything and hopefully will get back to you",
          {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        navigate(RouteList.HOME);
      })
      .catch((e) => {
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

  return (
    <Layout>
      <div className="job-offer-apply applicant">
        <Typography variant="h4" color="primary">
          {jobOffer.title}
        </Typography>
        <Typography variant="body1" color="secondary">
          {jobOffer.user.name}
        </Typography>
        <div className="d-flex gap-2 flex-wrap mt-2">
          <Chip label={ExperienceLevelText[jobOffer.experienceLevel]} />
          <Chip label={RoleText[jobOffer.role]} />
          <Chip label={JobTypeText[jobOffer.jobType]} />
          <Chip
            label={`${jobOffer.city}, ${jobOffer.country} (${
              RemoteText[jobOffer.remote]
            })`}
          />
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            {formik.values.quizzes.map(
              (
                quiz: { title: string; questions: ApplyAnswerI[] },
                index: number
              ) => (
                <div className="mt-4" key={index}>
                  <Typography variant="h6" color="primary">
                    {jobOffer.quizzes[index].title}
                  </Typography>
                  <FieldArray name={`quizzes.${index}.questions`}>
                    {({ form }) =>
                      quiz.questions.map((question, qIndex) => {
                        if (
                          question.question.id !==
                          jobOffer.quizzes[index].questions[qIndex].id
                        )
                          return null;

                        const questionType = jobOffer.quizzes[index].questions[
                          qIndex
                        ].questionType as AnswerTypeEnum;
                        const QuestionComponent =
                          questionComponents[questionType];

                        return QuestionComponent ? (
                          <QuestionComponent
                            key={qIndex}
                            question={jobOffer.quizzes[index].questions[qIndex]}
                            num={qIndex + 1}
                            form={form}
                            fieldName={`quizzes.${index}.questions.${qIndex}`}
                          />
                        ) : null;
                      })
                    }
                  </FieldArray>
                </div>
              )
            )}
            {console.log(formik.errors)}
            <div className="d-flex justify-content-end">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
