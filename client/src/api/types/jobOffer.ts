import {
  JobTypeEnum,
  ExperienceLevelEnum,
  RemoteEnum,
  AnswerTypeEnum,
} from "../../helpers/enums/JobOfferEnums";

export interface JobOfferCreateDto {
  title: string;
  description: string;
  country: string;
  jobType: JobTypeEnum | string;
  remote: RemoteEnum | string;
  experienceLevel: ExperienceLevelEnum | string;
  role: string;
  benefits: string[];
  commitments: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quizzes?: QuizI[];
}

export interface QuizI {
  title: string;
  questions?: QuestionI[];
}
export interface QuestionChoiceI {
  choiceText: string;
  isCorrect: boolean;
}

export interface QuestionI {
  questionText: string;
  questionType: AnswerTypeEnum | string;
  questionChoices?: QuestionChoiceI[];
  isActive: boolean;
}
