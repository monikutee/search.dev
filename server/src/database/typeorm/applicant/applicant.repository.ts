import { In } from "typeorm";
import { AppDB } from "../../../connection";
// import { JobOffer as JobOfferType } from "../../../types/jobOffer.type";
import { User as UserEntity } from "../user/user.entity";
import { Applicant as ApplicantEntity } from "./applicant.entity";

export async function upsertApplicant(applicant: any) {
  const applicantRepository = AppDB.getRepository(ApplicantEntity);
  const newApplicant = applicantRepository.create(applicant);
  return await applicantRepository.save(newApplicant);
}

export async function getApplicantsByJobOfferId(jobOfferId: string) {
  const applicantRepository = AppDB.getRepository(ApplicantEntity);
  return await applicantRepository.find({
    where: { jobOfferId: jobOfferId },
    relations: ["answers", "answers.questionChoice", "answers.questionId"], // Assuming you want to load related entities
  });
}

export default {
  upsertApplicant,
  getApplicantsByJobOfferId,
};
