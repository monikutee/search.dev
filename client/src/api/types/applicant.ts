import {
  AnswerTypeEnum,
  CodeLanguageEnum,
} from "../../helpers/enums/JobOfferEnums";

export interface ApplicantEntryI {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  about: string;
  country: string;
  city: string;
  consent: boolean;
}

export interface ApplyQuestionI {
  id: string;
  questionText: string;
  questionType: AnswerTypeEnum;
  questionChoices: ApplyQuestionChoiceI[];
  codeLanguage: CodeLanguageEnum | null;
}

export interface ApplyAnswerI {
  question: { id: string };
  questionChoices: { id: string }[];
  answerText: string;
  codeOutput: string;
}

export interface ApplyQuestionChoiceI {
  id: string;
  choiceText: string;
}
