import { Request, Response } from "express";
import { AppErrors, handleErrorResponse } from "../helpers/app-errors";
import { getAccessToken, verifyAccessToken } from "../helpers/util";
import { authService, jobOfferService } from "../services";
import { ERROR_CODES } from "../types/errors.enum";

export const createJobOffer =
  (
    dependencies = {
      createJobOffer: jobOfferService.createJobOffer,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const jobOffer = req.body;
      const { userId } = req.params;

      const newJobOffer = await dependencies.createJobOffer({
        ...jobOffer,
        userId,
      });

      res.status(200);
      res.json(newJobOffer);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getAllUserJobOffers =
  (
    dependencies = {
      getAllUserJobOffers: jobOfferService.getAllUserJobOffers,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const getAllUserJobOffers = await dependencies.getAllUserJobOffers(
        userId
      );

      res.status(200);
      res.json(getAllUserJobOffers);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getSingleJobOfferById =
  (
    dependencies = {
      getSingleJobOfferById: jobOfferService.getSingleJobOfferById,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { jobOfferId } = req.params;

      const getJobOffer = await dependencies.getSingleJobOfferById(jobOfferId);

      res.status(200);
      res.json(getJobOffer);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getSingleJobOfferByIdApply =
  (
    dependencies = {
      getSingleJobOfferByIdApply: jobOfferService.getSingleJobOfferByIdApply,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { jobOfferId } = req.params;

      const getJobOffer = await dependencies.getSingleJobOfferByIdApply(
        jobOfferId
      );

      res.status(200);
      res.json(getJobOffer);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  createJobOffer: createJobOffer(),
  getAllUserJobOffers: getAllUserJobOffers(),
  getSingleJobOfferById: getSingleJobOfferById(),
  getSingleJobOfferByIdApply: getSingleJobOfferByIdApply(),
};
