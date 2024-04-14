import express from "express";
import { jobOfferController } from "../controllers";
import { verifyUser } from "../middleware/verify-user";

const app = express();
const apiRoot = process.env.API_ROOT;

app.post(
  `${apiRoot}/:userId/job-offer/create`,
  verifyUser,
  jobOfferController.createJobOffer
);

app.get(
  `${apiRoot}/:userId/job-offer/all`,
  verifyUser,
  jobOfferController.getAllUserJobOffers
);

app.get(
  `${apiRoot}/job-offer/:jobOfferId`,
  jobOfferController.getSingleJobOfferById
);

export default app;
