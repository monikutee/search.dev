import { Request, Response } from "express";
import { AppErrors, handleErrorResponse } from "../helpers/app-errors";
import { jobOfferService } from "../services";
import applicantService from "../services/applicant.service";
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
      const { jobOfferId, userId } = req.params;

      const jobOffer = await dependencies.getSingleJobOfferById(jobOfferId);

      if (jobOffer.userId !== userId) {
        throw new AppErrors(ERROR_CODES.INVALID_DATA);
      }
      res.status(200);
      res.json(jobOffer);
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

export const getSingleJobOfferByIdApplyInfo =
  (
    dependencies = {
      getSingleJobOfferByIdApplyInfo:
        jobOfferService.getSingleJobOfferByIdApplyInfo,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { jobOfferId } = req.params;

      const getJobOffer = await dependencies.getSingleJobOfferByIdApplyInfo(
        jobOfferId
      );

      res.status(200);
      res.json(getJobOffer);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getAllJobOffersApply =
  (
    dependencies = {
      getAllJobOffersApply: jobOfferService.getAllJobOffersApply,
    }
  ) =>
  async (_req: Request, res: Response) => {
    try {
      const getAllJobOffers = await dependencies.getAllJobOffersApply();

      res.status(200);
      res.json(getAllJobOffers);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getJobOfferApplicants =
  (
    dependencies = {
      getApplicantsByJobOfferId: applicantService.getApplicantsByJobOfferId,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { jobOfferId, userId } = req.params;

      const applicants = await dependencies.getApplicantsByJobOfferId(
        jobOfferId,
        userId
      );

      res.status(200);
      res.json(applicants);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  createJobOffer: createJobOffer(),
  getAllUserJobOffers: getAllUserJobOffers(),
  getSingleJobOfferById: getSingleJobOfferById(),
  getSingleJobOfferByIdApply: getSingleJobOfferByIdApply(),
  getSingleJobOfferByIdApplyInfo: getSingleJobOfferByIdApplyInfo(),
  getAllJobOffersApply: getAllJobOffersApply(),
  getJobOfferApplicants: getJobOfferApplicants(),
};
