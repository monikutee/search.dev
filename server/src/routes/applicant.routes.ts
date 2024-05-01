import express from "express";
import { applicantController } from "../controllers";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(
  `${apiRoot}/applicant/create/:jobOfferId`,
  applicantController.createApplicant
);

app.get(
  `${apiRoot}/applicant/job-offer/:applicantId`,
  applicantController.getJobOfferByApplicantId
);

app.post(
  `${apiRoot}/applicant/apply/:jobOfferId/:applicantId`,
  applicantController.createApplication
);

app.post(
  `${apiRoot}/applicant/:applicantId/:questionId/run-code`,
  applicantController.runApplicantQuestionCode
);

export default app;
