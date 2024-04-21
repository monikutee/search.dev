import React from "react";

import Button from "@mui/material/Button";
import TextInput from "../../Global/TextInputFormik";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AnswerTypeEnum } from "../../../helpers/enums/JobOfferEnums";
import { AnswerTypeText } from "../../../helpers/constants/JobOffer";
import { ChoicesBlock } from "../Choices/ChoicesBlock";
import { useFormikContext } from "formik";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { QuestionChoiceI, QuestionI, QuizI } from "../../../api/types/jobOffer";

export const SingleQuestion: React.FC<{
  question: QuestionI;
  index: number;
  fieldName: string;
  formikHelpers: any;
  formikArrayHelpers: any;
  parentIndex: number;
}> = ({
  question,
  index,
  fieldName,
  formikHelpers,
  formikArrayHelpers,
  parentIndex,
}) => {
  const [show, setShow] = React.useState<boolean>(true);
  const formikContext = useFormikContext();

  const questionsLength =
    formikHelpers.values.quizzes[parentIndex].questions.length ?? 0;

  const questionText = `${fieldName}[${index}].questionText`;
  const questionType = `${fieldName}[${index}].questionType`;
  const questionChoices = `${fieldName}[${index}].questionChoices`;

  const setVisibility = React.useCallback(async () => {
    const errors = await formikHelpers.validateForm();
    const isVisible = !!errors.quizzes?.[parentIndex]?.questions?.[index];
    setShow(isVisible);
  }, [formikHelpers, parentIndex, index]);

  const validateQuestion = async () => {
    const errors: any = formikContext.errors;

    const currentQuestionErrors =
      errors?.quizzes?.[parentIndex]?.questions?.[index];

    if (
      currentQuestionErrors &&
      Object.keys(currentQuestionErrors).length > 0
    ) {
      // Set touched for the current question fields
      formikHelpers.setTouched({
        ...formikHelpers.touched,
        quizzes: formikHelpers.values.quizzes.map((quiz: QuizI, qi: number) =>
          qi === parentIndex
            ? {
                ...quiz,
                questions: quiz.questions.map((q: QuestionI, qi: number) =>
                  qi === index ? { ...q, ...currentQuestionErrors } : q
                ),
              }
            : quiz
        ),
      });
      return currentQuestionErrors;
    }
    return {};
  };

  React.useEffect(() => {
    setVisibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    index,
    formikHelpers.validateForm,
    formikHelpers.submitCount,
    questionsLength,
  ]);

  if (!show) {
    return (
      <div className="d-flex flex-column gap-2 mt-2">
        <span> No. {index + 1}</span>
        <div className="d-flex gap-5">
          <div>
            Question: <br />
            <b> {question.questionText}</b>
          </div>
          <div>
            Type: <br />
            <b> {AnswerTypeText[question.questionType]}</b>
          </div>
          {question.questionChoices?.length > 0 && (
            <div>
              Choices: <br />
              {question.questionChoices.map(
                (answer: QuestionChoiceI, ai: number) => (
                  <div key={ai}>
                    {answer.isCorrect ? (
                      <CheckIcon fontSize="small" color="success" />
                    ) : (
                      <ClearIcon fontSize="small" color="error" />
                    )}
                    <b>{answer.choiceText}</b>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="mt-1 d-flex justify-content-end">
          <Button onClick={() => setShow(true)} variant="text">
            Edit
          </Button>
          {formikHelpers.values.quizzes[parentIndex].questions.length > 1 && (
            <Button
              onClick={() => formikArrayHelpers.remove(index)}
              variant="text"
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2 mt-2">
      <span> No. {index + 1}</span>
      <TextInput name={questionText} label="Question" />
      <FormControl fullWidth>
        <InputLabel id={`${questionType}-label`}>Question type</InputLabel>
        <Select
          labelId={`${questionType}-label`}
          name={questionType}
          label="Question type"
          value={
            formikHelpers.values.quizzes[parentIndex].questions[index]
              .questionType
          }
          onChange={(event) => {
            const newType = event.target.value;
            formikHelpers.handleChange(event);

            if (newType === AnswerTypeEnum.OPEN) {
              formikHelpers.setFieldValue(questionChoices, []);
            } else {
              formikHelpers.setFieldValue(questionChoices, [
                {
                  choiceText: "",
                  isCorrect: true,
                },
                {
                  choiceText: "",
                  isCorrect: false,
                },
              ]);
            }
          }}
          error={
            formikHelpers.touched.quizzes?.[parentIndex]?.questions?.[index]
              ?.questionType &&
            !!formikHelpers.errors.quizzes?.[parentIndex]?.questions?.[index]
              ?.questionType
          }
        >
          {Object.values(AnswerTypeEnum).map((value) => {
            return (
              <MenuItem value={value} key={value}>
                {AnswerTypeText[value]}
              </MenuItem>
            );
          })}
        </Select>
        {formikHelpers.touched.quizzes?.[parentIndex]?.questions?.[index]
          ?.questionType && (
          <FormHelperText error>
            {
              formikHelpers.errors.quizzes?.[parentIndex]?.questions?.[index]
                ?.questionType
            }
          </FormHelperText>
        )}
      </FormControl>
      {formikHelpers.values.quizzes[parentIndex].questions[index]
        .questionType === AnswerTypeEnum.MULTI && (
        <ChoicesBlock
          choices={
            formikHelpers.values["quizzes"][parentIndex]["questions"][index][
              "questionChoices"
            ]
          }
          fieldName={questionChoices}
          formikHelpers={formikHelpers}
          quizIndex={parentIndex}
          questionIndex={index}
        />
      )}

      <div className="mt-1 d-flex justify-content-end">
        <Button
          onClick={() => {
            validateQuestion();
            setVisibility();
          }}
          variant="text"
        >
          Save
        </Button>
        {formikHelpers.values.quizzes[parentIndex].questions.length > 1 && (
          <Button
            onClick={() => formikArrayHelpers.remove(index)}
            variant="text"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
