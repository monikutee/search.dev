import userRepository from "./user/user.repository";
import dataResetRepository from "./data-resets/data-reset.repository";
import jobOfferRepository from "./job-offer/job-offer.repository";
import questionRepository from "./question/question.repository";
import applicantRepository from "./applicant/applicant.repository";
import questionChoiceRepository from "./question-choice/question-choice.repository";
import * as ApiDataRepository from "./api-data/api-data.repository";

export default {
  userRepository,
  dataResetRepository,
  jobOfferRepository,
  ApiDataRepository,
  applicantRepository,
  questionRepository,
  questionChoiceRepository,
};
