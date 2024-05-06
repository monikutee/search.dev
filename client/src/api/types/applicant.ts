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

export interface ApplicantFullI extends ApplicantEntryI {
  applied: boolean;
  answers: ApplicantAnswerDto[];
  id: string;
  overallCorrectCount: string | null;
  applyDate: string;
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

export interface ApplicantAnswerDto {
  id: string;
  codeOutput?: string | null;
  answerText?: string | null;
  createdAt: string;
  questionChoices: QuestionChoice[];
  question: ApplicantQuestionI;
  correctCount: string | null;
}

interface QuestionChoice {
  id: string;
  choiceText: string;
  isCorrect?: boolean;
}

export interface ApplicantQuestionI {
  id: string;
  questionText: string;
  questionType: AnswerTypeEnum;
  codeLanguage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  questionChoices: QuestionChoice[];
}
