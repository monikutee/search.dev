import React from "react";
import { FieldArray, FieldArrayRenderProps } from "formik";
import { SingleChoice } from "./SingleChoice";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormHelperText from "@mui/material/FormHelperText";
import { QuestionChoiceI } from "../../../api/types/jobOffer";
import { INITIAL_QUESTION_CHOICE } from "../../../helpers/constants/JobOffer";
import Typography from "@mui/material/Typography";

export const ChoicesBlock: React.FC<{
  choices: QuestionChoiceI[];
  fieldName: string;
  formikHelpers: any;
  quizIndex: number;
  questionIndex: number;
}> = ({ choices, fieldName, formikHelpers, quizIndex, questionIndex }) => {
  const error =
    formikHelpers.errors.quizzes?.[quizIndex]?.questions?.[questionIndex]
      ?.questionChoices;

  return (
    <FieldArray
      name={fieldName}
      render={(arrayHelpers: FieldArrayRenderProps) => {
        const emptyChoice = INITIAL_QUESTION_CHOICE;

        const addChoice = () => {
          arrayHelpers.push({ ...emptyChoice });
        };

        return (
          <>
            {choices.map((_choice: QuestionChoiceI, index: number) => (
              <SingleChoice
                key={index}
                index={index}
                quizIndex={quizIndex}
                questionIndex={questionIndex}
                fieldName={fieldName}
                formikHelpers={formikHelpers}
                formikArrayHelpers={arrayHelpers}
              />
            ))}
            {typeof error === "string" && (
              <FormHelperText error>{error}</FormHelperText>
            )}
            <Typography variant="body1" color="primary">
              *Filled checkbox means correct answer
            </Typography>
            <div className={" mb-4 w-25"}>
              <IconButton
                color="primary"
                aria-label="add choice"
                onClick={async () => {
                  addChoice();
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
          </>
        );
      }}
    />
  );
};
