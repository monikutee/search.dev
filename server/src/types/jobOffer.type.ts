// import { User } from "./user.type";

export type JobOfferType = {
  id?: string;
  userId: string;
  title: string;
  description: string;
  country: string;
  jobType: JobTypeEnum;
  remote: RemoteEnum;
  experienceLevel: ExperienceLevelEnum;
  role: string;
  benefits: string[];
  commitments: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  quizzes?: {
    title: string;
    questions?: {
      questionText: string;
      questionType: AnswerTypeEnum;
      questionChoices?: {
        choiceText: string;
        isCorrect: boolean;
      }[];
      isActive: boolean;
    }[];
  }[];
};

export enum AnswerTypeEnum {
  CODE = "CODE",
  MULTI = "MCQ",
  OPEN = "OPEN",
}

export enum CodeLanguageEnum {
  PYTHON = "python",
  JAVASCRIPT = "javascript",
}

export enum ExperienceLevelEnum {
  INTERNSHIP = "INTERNSHIP",
  ENTRY_LEVEL = "ENTRY_LEVEL",
  ASSOCIATE = "ASSOCIATE",
  JUNIOR = "JUNIOR",
  MID = "MID",
  MID_SENIOR = "MID_SENIOR",
  SENIOR = "SENIOR",
  DIRECTOR = "DIRECTOR",
  EXECUTIVE = "EXECUTIVE",
}

export enum RemoteEnum {
  REMOTE = "REMOTE",
  ON_SITE = "ON_SITE",
  HYBRID = "HYBRID",
}

export enum JobTypeEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
}
