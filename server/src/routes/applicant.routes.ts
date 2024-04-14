import express from "express";
import { applicantController } from "../controllers";
// import { verifyUser } from "../middleware/verify-user";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(`${apiRoot}/applicant/create`, applicantController.createApplicant);
app.get(
  `${apiRoot}/applicant/get-all`,
  applicantController.getApplicantsByJobOfferId
);

export default app;
