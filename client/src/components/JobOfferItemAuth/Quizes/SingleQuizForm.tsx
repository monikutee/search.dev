import React from "react";
import { StyledQuiz } from "../styled";
import Button from "@mui/material/Button";
import TextInput from "../../Global/TextInputFormik";
import { QuestionsBlock } from "../Questions/QuestionsBlock";

export const SingleQuizForm: React.FC<{
  index: number;
  fieldName: string;
  formikHelpers: any;
  formikArrayHelpers: any;
}> = ({ index, fieldName, formikHelpers, formikArrayHelpers }) => {
  const title = `${fieldName}[${index}].title`;
  const questions = `${fieldName}[${index}].questions`;

  return (
    <StyledQuiz>
      <div className="mb-4">
        <TextInput variant="filled" name={title} label="Quiz title" />
      </div>
      <QuestionsBlock
        questions={formikHelpers.values["quizzes"][index]["questions"]}
        fieldName={questions}
        formikHelpers={formikHelpers}
        parentIndex={index}
      />
      <div className="mt-3 d-flex justify-content-end">
        <Button onClick={() => formikArrayHelpers.remove(index)} variant="text">
          Remove quiz
        </Button>
      </div>
    </StyledQuiz>
  );
};
