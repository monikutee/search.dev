import React from "react";
import { ApplyQuestionI } from "../../api/types/applicant";
import Typography from "@mui/material/Typography";
import TextInput from "../Global/TextInputFormik";
import { useField } from "formik";

export const OpenQuestion: React.FC<{
  question: ApplyQuestionI;
  num: number;
  fieldName: string;
}> = ({ question, num, fieldName }) => {
  const [field] = useField(fieldName);

  return (
    <div>
      <hr />
      <Typography variant="body1" color="primary" mb={2}>
        {num}. {question.questionText}
      </Typography>
      <TextInput
        label="Answer"
        name={`${field.name}.answerText`}
        multiline
        rows={5}
      />
    </div>
  );
};
