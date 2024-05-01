import React from "react";
import { ApplyQuestionI } from "../../api/types/applicant";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useField } from "formik";

export const MultiQuestion: React.FC<{
  question: ApplyQuestionI;
  num: number;
  fieldName: string;
}> = ({ question, num, fieldName }) => {
  const [field, , helpers] = useField(`${fieldName}.questionChoices`);

  const [checkboxState, setCheckboxState] = React.useState(
    question.questionChoices.map((choice) => field.value.includes(choice.id))
  );

  React.useEffect(() => {
    setCheckboxState(
      question.questionChoices.map((choice) =>
        field.value.some((v: { id: string }) => v.id === choice.id)
      )
    );
  }, [field.value, question.questionChoices]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxState = checkboxState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckboxState(updatedCheckboxState);

    const newValue = updatedCheckboxState.reduce((acc, checked, idx) => {
      if (checked) acc.push({ id: question.questionChoices[idx].id });
      return acc;
    }, []);

    helpers.setValue(newValue);
  };

  return (
    <div>
      <hr />
      <Typography variant="body1" color="primary">
        {num}. {question.questionText}
      </Typography>
      {question.questionChoices.map((choice, i) => (
        <div key={i}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxState[i]}
                onChange={() => handleCheckboxChange(i)}
              />
            }
            label={choice.choiceText}
          />
        </div>
      ))}
    </div>
  );
};
