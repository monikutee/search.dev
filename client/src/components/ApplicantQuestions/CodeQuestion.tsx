import React from "react";
import { ApplyQuestionI } from "../../api/types/applicant";
import Typography from "@mui/material/Typography";
import { useField } from "formik";
import { CodeLanguageEnum } from "../../helpers/enums/JobOfferEnums";
import { PythonEditor } from "../PythonEditor";
import { JavascriptEditor } from "../JavascriptEditor";
import Api from "../../api/";
import { useParams } from "react-router-dom";

export const CodeQuestion: React.FC<{
  question: ApplyQuestionI;
  num: number;
  fieldName: string;
}> = ({ question, num, fieldName }) => {
  const [answerField, , answerHelpers] = useField(`${fieldName}.answerText`);
  const [outputField, , outputHelpers] = useField(`${fieldName}.codeOutput`);

  const { applicantId } = useParams<{ applicantId: string }>();

  const runPythonCode = (code: string) => {
    if (!applicantId) return;

    Api.applicant
      .runQuestionCode(applicantId, question.id, {
        code,
        language: CodeLanguageEnum.PYTHON,
      })
      .then((res) => outputHelpers.setValue(res.data.output))
      .catch((e) => console.log(e));
  };

  const runJavascriptCode = (code: string) => {
    if (!applicantId) return;
    Api.applicant
      .runQuestionCode(applicantId, question.id, {
        code,
        language: CodeLanguageEnum.JAVASCRIPT,
      })
      .then((res) => outputHelpers.setValue(res.data.output));
  };

  if (question.codeLanguage === CodeLanguageEnum.JAVASCRIPT) {
    return (
      <div>
        <hr />
        <Typography variant="body1" color="primary">
          {num}. {question.questionText}
        </Typography>
        <JavascriptEditor
          value={answerField.value}
          onChange={answerHelpers.setValue}
          handleRun={() =>
            answerField.value && runJavascriptCode(answerField.value)
          }
        />
        {outputField.value && (
          <JavascriptEditor readonly value={outputField.value} />
        )}
      </div>
    );
  } else if (question.codeLanguage === CodeLanguageEnum.PYTHON) {
    return (
      <div>
        <hr />
        <Typography variant="body1" color="primary">
          {num}. {question.questionText}
        </Typography>
        <PythonEditor
          value={answerField.value}
          onChange={answerHelpers.setValue}
          handleRun={() =>
            answerField.value && runPythonCode(answerField.value)
          }
        />
        {outputField.value && (
          <PythonEditor readonly value={outputField.value} />
        )}
      </div>
    );
  } else
    return (
      <div>
        <Typography variant="body1" color="primary">
          NOT SUPPORTED CODE QUESTION
        </Typography>
      </div>
    );
};
