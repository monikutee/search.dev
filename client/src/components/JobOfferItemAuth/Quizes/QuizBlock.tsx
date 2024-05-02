import React from "react";
import { FieldArray, FieldArrayRenderProps } from "formik";
import Button from "@mui/material/Button";
import { SingleQuizForm } from "./SingleQuizForm";
import { INITIAL_QUESTION } from "../../../helpers/constants/JobOffer";
import { QuizI } from "../../../api/types/jobOffer";

export const QuizBlock: React.FC<{
  quizzes: QuizI[];
  fieldName: string;
  formikHelpers: any;
  disable: boolean;
}> = ({ quizzes, fieldName, formikHelpers, disable }) => {
  return (
    <FieldArray
      name={fieldName}
      render={(arrayHelpers: FieldArrayRenderProps) => {
        const emptyQuiz: QuizI = {
          title: "",
          questions: [INITIAL_QUESTION],
        };

        const addQuiz = () => {
          arrayHelpers.push({ ...emptyQuiz });
        };

        return (
          <>
            {quizzes.map((_quiz: any, index: number) => (
              <SingleQuizForm
                key={index}
                disable={disable}
                index={index}
                fieldName={fieldName}
                formikHelpers={formikHelpers}
                formikArrayHelpers={arrayHelpers}
              />
            ))}
            {!disable && (
              <div className={"mt-4 mb-4 w-25"}>
                <Button
                  onClick={async () => {
                    addQuiz();
                  }}
                  variant="contained"
                >
                  Add QUIZ
                </Button>
              </div>
            )}
          </>
        );
      }}
    />
  );
};
