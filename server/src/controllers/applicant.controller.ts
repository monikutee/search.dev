import { Request, Response } from "express";
import { AppErrors, handleErrorResponse } from "../helpers/app-errors";
import { getAccessToken, verifyAccessToken } from "../helpers/util";
import { authService, applicantsService } from "../services";
import { ERROR_CODES } from "../types/errors.enum";

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
      const newApplicant = await dependencies.createApplicant({
        email,
        name,
        surname,
        phoneNumber,
        about,
        country,
        city,
        jobOfferId,
      });

      res.status(200);
      res.json(newApplicant);
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
        },
        jobOfferId
      );

      res.status(200);
      res.json(apply);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getApplicantsByJobOfferId =
  (
    dependencies = {
      getApplicantsByJobOfferId: applicantsService.getApplicantsByJobOfferId,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { jobOfferId } = req.body;
      const newApplicant = await dependencies.getApplicantsByJobOfferId(
        jobOfferId
      );

      res.status(200);
      res.json(newApplicant);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  createApplicant: createApplicant(),
  createApplication: createApplication(),
  getApplicantsByJobOfferId: getApplicantsByJobOfferId(),
};
