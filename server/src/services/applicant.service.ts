import typeormDatabase from "../database/typeorm";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import mailerService from "./mailer.service";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_SECRET_KEY });

export const createApplicant =
  (
    dependencies = {
      upsertApplicant: typeormDatabase.applicantRepository.upsertApplicant,
      getSingleJobOfferByIdApplyInfo:
        typeormDatabase.jobOfferRepository.getSingleJobOfferByIdApplyInfo,
      sendApplicantLink: mailerService.sendApplicantLink,
    }
  ) =>
  async (
    applicant: {
      email: string;
      name: string;
      surname: string;
      phoneNumber: string;
      about: string;
      country: string;
      city: string;
      jobOfferId: string;
    },
    origin: string
  ) => {
    const jobOffer = await dependencies.getSingleJobOfferByIdApplyInfo(
      applicant.jobOfferId
    );
    if (!jobOffer) {
      throw new AppErrors(ERROR_CODES.INVALID_DATA);
    }
    const moderation = await openai.moderations.create({
      input: applicant.about,
    });

    if (moderation.results[0].flagged) {
      throw new AppErrors(ERROR_CODES.PROVIDED_TEXT_FLAGGED);
    }
    const newApplicant = await dependencies.upsertApplicant(applicant);
    const applyLink = origin + "/apply/" + newApplicant.id;

    await dependencies.sendApplicantLink(
      applicant.email,
      applyLink,
      jobOffer.title,
      jobOffer.user.name
    );

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
      getSingleJobOfferById:
        typeormDatabase.jobOfferRepository.getSingleJobOfferById,
    }
  ) =>
  async (jobOfferId: string, userId: string) => {
    const jobOffer = await dependencies.getSingleJobOfferById(jobOfferId);

    if (jobOffer) {
      if (jobOffer.userId !== userId) {
        throw new AppErrors(ERROR_CODES.VALIDATION_ERROR);
      }
      const applicants = await dependencies.getApplicantsByJobOfferId(
        jobOfferId
      );
      if (!applicants) {
        throw new AppErrors(ERROR_CODES.VALIDATION_ERROR);
      }
      return applicants;
    }
  };

export const getJobOfferByApplicantId =
  (
    dependencies = {
      getApplicantById: typeormDatabase.applicantRepository.getApplicantById,
      getSingleJobOfferByIdApply:
        typeormDatabase.jobOfferRepository.getSingleJobOfferByIdApply,
    }
  ) =>
  async (applicantId: string) => {
    const applicantData = await dependencies.getApplicantById(applicantId);
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
