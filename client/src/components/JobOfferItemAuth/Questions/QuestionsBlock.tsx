import React from "react";
import { FieldArray, FieldArrayRenderProps } from "formik";
import Button from "@mui/material/Button";
import { SingleQuestion } from "./SingleQuestion";
import { INITIAL_QUESTION } from "../../../helpers/constants/JobOffer";
import { QuestionI } from "../../../api/types/jobOffer";

export const QuestionsBlock: React.FC<{
  questions: QuestionI[];
  fieldName: string;
  formikHelpers: any;
  parentIndex: number;
  disable: boolean;
}> = ({ questions, fieldName, formikHelpers, parentIndex, disable }) => {
  return (
    <FieldArray
      name={fieldName}
      render={(arrayHelpers: FieldArrayRenderProps) => {
        const emptyQuestion = INITIAL_QUESTION;

        const addQuestion = () => {
          arrayHelpers.push({ ...emptyQuestion });
        };

        return (
          <>
            {questions.map((question: QuestionI, index: number) => (
              <SingleQuestion
                disable={disable}
                question={question}
                key={index}
                index={index}
                parentIndex={parentIndex}
                fieldName={fieldName}
                formikHelpers={formikHelpers}
                formikArrayHelpers={arrayHelpers}
              />
            ))}
            {!disable && (
              <div className={"mt-4 mb-4 w-25"}>
                <Button
                  onClick={async () => {
                    addQuestion();
                  }}
                  variant="contained"
                >
                  Add question
                </Button>
              </div>
            )}
          </>
        );
      }}
    />
  );
};
