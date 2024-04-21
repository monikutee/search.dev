import React from "react";
import TextInput from "../../Global/TextInputFormik";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const SingleChoice: React.FC<{
  index: number;
  fieldName: string;
  formikHelpers: any;
  formikArrayHelpers: any;
  quizIndex: number;
  questionIndex: number;
}> = ({
  index,
  fieldName,
  formikHelpers,
  formikArrayHelpers,
  quizIndex,
  questionIndex,
}) => {
  const choiceText = `${fieldName}[${index}].choiceText`;
  const isCorrect = `${fieldName}[${index}].isCorrect`;

  return (
    <div className="d-flex flex-column gap-2 mt-2">
      <div className="d-flex">
        <Checkbox
          name={isCorrect}
          checked={
            formikHelpers.values["quizzes"][quizIndex]["questions"][
              questionIndex
            ]["questionChoices"][index]["isCorrect"]
          }
          onChange={formikHelpers.handleChange}
        />
        <TextInput name={choiceText} label="Choice" />
        {formikHelpers.values.quizzes[quizIndex].questions[questionIndex]
          .questionChoices.length > 2 && (
          <IconButton
            color="primary"
            aria-label="delete choice"
            onClick={() => formikArrayHelpers.remove(index)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
