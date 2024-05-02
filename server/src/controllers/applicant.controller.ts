import { Request, Response } from "express";
import { AppErrors, handleErrorResponse } from "../helpers/app-errors";
import { axiosRequests } from "../helpers/util";
import { applicantsService } from "../services";
import { ERROR_CODES } from "../types/errors.enum";
import { AnswerTypeEnum, CodeLanguageEnum } from "../types/jobOffer.type";

const CODE_RUNNER_PORT = process.env.CODE_RUNNER_PORT;
const CODE_RUNNER_ENDPOINT = process.env.CODE_RUNNER_ENDPOINT;

const userAxiosRequests = axiosRequests(
  CODE_RUNNER_ENDPOINT as string,
  CODE_RUNNER_PORT as string
);
const axiosPost = userAxiosRequests.axiosPost;

export const createApplicant =
  (
    dependencies = {
      createApplicant: applicantsService.createApplicant,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const {
        email,
        name,
        surname,
        phoneNumber,
        about,
        country,
        city,
        consent,
      } = req.body;
      const { jobOfferId } = req.params;

      if (!consent) res.status(200).send("Need consent");
      await dependencies.createApplicant(
        {
          email,
          name,
          surname,
          phoneNumber,
          about,
          country,
          city,
          jobOfferId,
        },
        req.headers.origin
      );

      res.status(200);
      res.send(
        "An e-mail has been sent to " + email + " with further instructions."
      );
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const createApplication =
  (
    dependencies = {
      createApplication: applicantsService.createApplication,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { answers } = req.body;
      const { jobOfferId, applicantId } = req.params;

      const apply = await dependencies.createApplication(
        {
          answers,
          id: applicantId,
          applied: true,
        },
        jobOfferId
      );

      res.status(200);
      res.json(apply);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getJobOfferByApplicantId =
  (
    dependencies = {
      getJobOfferByApplicantId: applicantsService.getJobOfferByApplicantId,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { applicantId } = req.params;
      const jobOffer = await dependencies.getJobOfferByApplicantId(applicantId);

      res.status(200);
      res.json(jobOffer);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const runApplicantQuestionCode =
  (
    dependencies = {
      getJobOfferByApplicantId: applicantsService.getJobOfferByApplicantId,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { applicantId, questionId } = req.params;
      const { code, language } = req.body;

      if (!Object.values(CodeLanguageEnum).includes(language)) {
        throw new AppErrors(ERROR_CODES.WRONG_CODE_LANGUAGE);
      }
      if (!code || code === undefined || code === null || code === "") {
        throw new AppErrors(ERROR_CODES.INVALID_DATA);
      }

      const jobOffer = await dependencies.getJobOfferByApplicantId(applicantId);

      const validQuestion = jobOffer.quizzes.some((quiz) =>
        quiz.questions.some(
          (question) =>
            question.id === questionId &&
            question.questionType === AnswerTypeEnum.CODE
        )
      );

      if (!validQuestion) {
        throw new AppErrors(ERROR_CODES.INVALID_DATA);
      }

      const runCode = (
        await axiosPost(`/run-code`, {
          code,
          language,
        })
      ).data;

      return res.status(200).json(runCode);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  createApplicant: createApplicant(),
  createApplication: createApplication(),
  getJobOfferByApplicantId: getJobOfferByApplicantId(),
  runApplicantQuestionCode: runApplicantQuestionCode(),
};
