import { DataSource } from "typeorm";
import { DataReset } from "./database/typeorm/data-resets/data-reset.entity";
import { User } from "./database/typeorm/user/user.entity";
import { JobOffer } from "./database/typeorm/job-offer/job-offer.entity";
import { Quiz } from "./database/typeorm/quiz/quiz.entity";
import { ApplicantAnswer } from "./database/typeorm/applicant-answer/applicant-answer.entity";
import { Applicant } from "./database/typeorm/applicant/applicant.entity";
import { Question } from "./database/typeorm/question/question.entity";
import { QuestionChoice } from "./database/typeorm/question-choice/question-choice.entity";
import { ApiData } from "./database/typeorm/api-data/api-data.entity";

require("dotenv").config({
  path: __dirname + `/../.env`,
});

export const AppDB = new DataSource({
  name: "default",
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dropSchema: false,
  logging: false,
  synchronize: true,
  migrationsRun: true,
  entities: [
    ApiData,
    User,
    DataReset,
    JobOffer,
    Quiz,
    ApplicantAnswer,
    Applicant,
    Question,
    QuestionChoice,
  ],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

const connection = {
  async create() {
    return AppDB.initialize();
  },

  async close() {
    await AppDB.destroy();
  },

  async clear() {
    const entities = AppDB.entityMetadatas;

    for (const entity of entities) {
      const repository = AppDB.getRepository(entity.name);
      repository && (await repository.clear());
    }
  },
};
export default connection;
