import bcrypt from "bcrypt";
import { User } from "../types/user.type";
import { validateEmail, validateUser } from "../validation/user.validation";
import { DataReset } from "../types/password-reset.type";
import typeormDatabase from "../database/typeorm";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import mailerService from "./mailer.service";

export const createApplicant =
  (
    dependencies = {
      upsertApplicant: typeormDatabase.applicantRepository.upsertApplicant,
      getSingleJobOfferById:
        typeormDatabase.jobOfferRepository.getSingleJobOfferById,
    }
  ) =>
  async (applicant: any) => {
    const newApplicant = await dependencies.upsertApplicant(applicant);
    return newApplicant;
  };

export const getApplicantsByJobOfferId =
  (
    dependencies = {
      getApplicantsByJobOfferId:
        typeormDatabase.applicantRepository.getApplicantsByJobOfferId,
    }
  ) =>
  async (jobOfferId: string) => {
    const applicants = await dependencies.getApplicantsByJobOfferId(jobOfferId);
    if (!applicants) {
      //   throw new AppErrors(ERROR_CODES.USER_MISSING);
      console.log("ERROR getApplicantsByJobOfferId");
    }
    return applicants;
  };

export default {
  createApplicant: createApplicant(),
  getApplicantsByJobOfferId: getApplicantsByJobOfferId(),
};
