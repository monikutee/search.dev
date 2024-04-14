import bcrypt from "bcrypt";
import { User } from "../types/user.type";
import { validateEmail, validateUser } from "../validation/user.validation";
import { DataReset } from "../types/password-reset.type";
import typeormDatabase from "../database/typeorm";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import mailerService from "./mailer.service";

export const createJobOffer =
  (
    dependencies = {
      upsertJobOffer: typeormDatabase.jobOfferRepository.upsertJobOffer,
    }
  ) =>
  async (jobOffer: any) => {
    const newUser = await dependencies.upsertJobOffer(jobOffer);
    return newUser;
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

export default {
  createJobOffer: createJobOffer(),
  getAllUserJobOffers: getAllUserJobOffers(),
  getSingleJobOfferById: getSingleJobOfferById(),
};
