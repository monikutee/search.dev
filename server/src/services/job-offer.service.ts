import typeormDatabase from "../database/typeorm";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import { JobOfferType } from "../types/jobOffer.type";
import { validateJobOffer } from "../validation/jobOffer.validation";

export const createJobOffer =
  (
    dependencies = {
      upsertJobOffer: typeormDatabase.jobOfferRepository.upsertJobOffer,
      getSingleJobOfferByIdApplyInfo:
        typeormDatabase.jobOfferRepository.getSingleJobOfferByIdApplyInfo,
    }
  ) =>
  async (jobOffer: JobOfferType) => {
    if (jobOffer.id) {
      const oldJobOffer = await dependencies.getSingleJobOfferByIdApplyInfo(
        jobOffer.id
      );

      if (
        oldJobOffer &&
        oldJobOffer.applicantCount &&
        oldJobOffer.applicantCount > 0
      ) {
        const { quizzes, ...restJobOffer } = jobOffer;
        await validateJobOffer(restJobOffer);
        const newJobOffer = await dependencies.upsertJobOffer(restJobOffer);
        return newJobOffer;
      }
    }

    await validateJobOffer(jobOffer);
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
    const jobOffers = await dependencies.getAllUserJobOffers(userId);
    return jobOffers;
  };

export const getAllJobOffersApply =
  (
    dependencies = {
      getAllJobOffersApply:
        typeormDatabase.jobOfferRepository.getAllJobOffersApply,
    }
  ) =>
  async () => {
    const jobOffers = await dependencies.getAllJobOffersApply();
    return jobOffers;
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

export const getSingleJobOfferByIdApplyInfo =
  (
    dependencies = {
      getSingleJobOfferByIdApplyInfo:
        typeormDatabase.jobOfferRepository.getSingleJobOfferByIdApplyInfo,
    }
  ) =>
  async (jobOfferId: string) => {
    const jobOffer = await dependencies.getSingleJobOfferByIdApplyInfo(
      jobOfferId
    );
    return jobOffer;
  };

export default {
  createJobOffer: createJobOffer(),
  getAllJobOffersApply: getAllJobOffersApply(),
  getAllUserJobOffers: getAllUserJobOffers(),
  getSingleJobOfferById: getSingleJobOfferById(),
  getSingleJobOfferByIdApply: getSingleJobOfferByIdApply(),
  getSingleJobOfferByIdApplyInfo: getSingleJobOfferByIdApplyInfo(),
};
