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

export const createApplication =
  (
    dependencies = {
      upsertApplicant: typeormDatabase.applicantRepository.upsertApplicant,
      getQuestionById: typeormDatabase.questionRepository.getQuestionById,
      getQuestionChoicesByQuestionId:
        typeormDatabase.questionChoiceRepository.getQuestionChoicesByQuestionId,
    }
  ) =>
  async (
    applicant: {
      id: string;
      answers: {
        question: { id: string };
        questionChoices?: { id: string }[];
        answerText?: string;
        codeOutput?: string;
      }[];
      applied: boolean;
    },
    jobOfferId: string
  ) => {
    for (const answer of applicant.answers) {
      const question = await dependencies.getQuestionById(answer.question.id);

      if (!question || question.quiz.jobOffer.id !== jobOfferId) {
        throw new AppErrors(ERROR_CODES.QUESTION_DOES_NOT_BELONG);
      }

      if (answer.questionChoices && answer.questionChoices.length > 0) {
        const validChoices = await dependencies.getQuestionChoicesByQuestionId(
          answer.question.id
        );
        const validChoiceIds = validChoices.map((choice) => choice.id);

        const allChoicesValid = answer.questionChoices.every((choice) =>
          validChoiceIds.includes(choice.id)
        );

        if (!allChoicesValid) {
          throw new AppErrors(ERROR_CODES.CHOICE_DOES_NOT_BELONG);
        }
      }
    }
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

export const getJobOfferByApplicantId =
  (
    dependencies = {
      getJobOfferByApplicantId:
        typeormDatabase.applicantRepository.getJobOfferByApplicantId,
      getSingleJobOfferByIdApply:
        typeormDatabase.jobOfferRepository.getSingleJobOfferByIdApply,
    }
  ) =>
  async (applicantId: string) => {
    const applicantData = await dependencies.getJobOfferByApplicantId(
      applicantId
    );
    if (!applicantData.jobOfferId) {
      throw new AppErrors(ERROR_CODES.APPLICANT_JOB_OFFER_MISSING);
    }
    if (applicantData.applied) {
      throw new AppErrors(ERROR_CODES.ALREADY_APPLIED);
    }

    const jobOffer = await dependencies.getSingleJobOfferByIdApply(
      applicantData.jobOfferId
    );

    if (!jobOffer) {
      throw new AppErrors(ERROR_CODES.APPLICANT_JOB_OFFER_MISSING);
    }

    return jobOffer;
  };

export default {
  createApplicant: createApplicant(),
  createApplication: createApplication(),
  getJobOfferByApplicantId: getJobOfferByApplicantId(),
  getApplicantsByJobOfferId: getApplicantsByJobOfferId(),
};
