import typeormDatabase from "../database/typeorm";
import { AnswerTypeEnum, JobOfferType } from "../types/jobOffer.type";

export const createJobOffer =
  (
    dependencies = {
      upsertJobOffer: typeormDatabase.jobOfferRepository.upsertJobOffer,
    }
  ) =>
  async (jobOffer: JobOfferType) => {
    for (const quiz of jobOffer.quizzes) {
      for (const question of quiz.questions) {
        switch (question.questionType) {
          case AnswerTypeEnum.OPEN:
            if (question.questionChoices.length !== 0) {
              throw new Error("Open questions should not have choices.");
            }
            break;
          case AnswerTypeEnum.ONE:
          case AnswerTypeEnum.MULTI:
            if (question.questionChoices.length === 0) {
              throw new Error(
                "Questions of type ONE or MULTI should have choices."
              );
            }
            break;
        }
      }
    }
    const newJobOffer = await dependencies.upsertJobOffer(jobOffer);
    return newJobOffer;
  };

export const getAllUserJobOffers =
  (
    dependencies = {
      getAllUserJobOffers:
        typeormDatabase.jobOfferRepository.getAllUserJobOffers,
    }
  ) =>
  async (userId: string) => {
    const newUser = await dependencies.getAllUserJobOffers(userId);
    return newUser;
  };

export const getSingleJobOfferById =
  (
    dependencies = {
      getSingleJobOfferById:
        typeormDatabase.jobOfferRepository.getSingleJobOfferById,
    }
  ) =>
  async (jobOfferId: string) => {
    const jobOffer = await dependencies.getSingleJobOfferById(jobOfferId);
    return jobOffer;
  };

export const getSingleJobOfferByIdApply =
  (
    dependencies = {
      getSingleJobOfferByIdApply:
        typeormDatabase.jobOfferRepository.getSingleJobOfferByIdApply,
    }
  ) =>
  async (jobOfferId: string) => {
    const jobOffer = await dependencies.getSingleJobOfferByIdApply(jobOfferId);
    return jobOffer;
  };

export default {
  createJobOffer: createJobOffer(),
  getAllUserJobOffers: getAllUserJobOffers(),
  getSingleJobOfferById: getSingleJobOfferById(),
  getSingleJobOfferByIdApply: getSingleJobOfferByIdApply(),
};
