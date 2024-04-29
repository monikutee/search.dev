import express from "express";
import { applicantController } from "../controllers";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(
  `${apiRoot}/applicant/create/:jobOfferId`,
  applicantController.createApplicant
);

app.post(
  `${apiRoot}/applicant/apply/:jobOfferId/:applicantId`,
  applicantController.createApplication
);

app.get(
  `${apiRoot}/applicant/get-all`,
  applicantController.getApplicantsByJobOfferId
);

export default app;
