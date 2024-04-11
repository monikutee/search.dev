import { In } from "typeorm";
import { AppDB } from "../../../connection";
import { JobOffer as JobOfferType } from "../../../types/jobOffer.type";
import { User as UserEntity } from "../user/user.entity";
import { JobOffer as JobOfferEntity } from "./job-offer.entity";

export async function getSingleJobOfferById(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  return (
    (await jobOfferRepository.findOne({
      where: { id },
      relations: ["user", "quizzes"],
    })) || undefined
  );
}

export async function getAllJobOffers() {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  return (
    (await jobOfferRepository.find({
      relations: ["user", "quizzes"],
    })) || []
  );
}

export async function disableJobOffer(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const disabledJobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: ["user", "quizzes"],
  });
  if (disabledJobOffer) {
    disabledJobOffer.isActive = false;
    return await jobOfferRepository.save(disabledJobOffer);
  }
  return await jobOfferRepository.save(disabledJobOffer);
}

export async function upsertJobOffer(jobOffer: JobOfferType) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const newjobOffer = jobOfferRepository.create(jobOffer);
  return await jobOfferRepository.save(newjobOffer);
}

export default {
  getSingleJobOfferById,
  getAllJobOffers,
  upsertJobOffer,
  disableJobOffer,
};
