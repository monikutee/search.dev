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
  jobType: JobTypeEnum;
  remote: RemoteEnum;
  experienceLevel: ExperienceLevelEnum;
  role: string;
  benefits: string[];
  commitments: string[];
  quiz: {
    title: string;
    questions: {
      questionText: string;
      questionChoices: { choiceText: string; isCorrect: boolean }[];
      questionType: AnswerTypeEnum;
    }[];
  };
}
