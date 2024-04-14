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
      const applicant = req.body;
      const newApplicant = await dependencies.createApplicant(applicant);

      res.status(200);
      res.json(newApplicant);
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
  getApplicantsByJobOfferId: getApplicantsByJobOfferId(),
};
