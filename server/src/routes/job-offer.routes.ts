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
  `${apiRoot}/:userId/job-offer/:jobOfferId`,
  verifyUser,
  jobOfferController.getSingleJobOfferById
);

app.get(`${apiRoot}/job-offers/all`, jobOfferController.getAllJobOffersApply);
app.get(
  `${apiRoot}/job-offers/:jobOfferId`,
  jobOfferController.getSingleJobOfferByIdApplyInfo
);

app.get(
  `${apiRoot}/apply/:jobOfferId`,
  jobOfferController.getSingleJobOfferByIdApply
);

export default app;
