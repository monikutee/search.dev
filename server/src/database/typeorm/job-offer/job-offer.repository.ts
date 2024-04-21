import { AppDB } from "../../../connection";
import { JobOfferType as JobOfferType } from "../../../types/jobOffer.type";
import { Applicant as ApplicantEntity } from "../applicant/applicant.entity";
import { JobOffer as JobOfferEntity } from "./job-offer.entity";

export async function getSingleJobOfferByIdApply(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const applicantRepository = AppDB.getRepository(ApplicantEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: [
      "quizzes",
      "quizzes.questions",
      "quizzes.questions.questionChoices",
    ],
  });

  const applicantCount = await applicantRepository
    .createQueryBuilder("applicant")
    .where("applicant.jobOfferId = :id", { id })
    .getCount();

  jobOffer.quizzes.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      question.questionChoices.forEach((choice) => {
        delete choice.isCorrect;
      });
    });
  });

  return { ...jobOffer, applicantCount } || undefined;
}

export async function getSingleJobOfferByIdApplyInfo(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const applicantRepository = AppDB.getRepository(ApplicantEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: ["quizzes"],
  });

  jobOffer.quizzes.forEach((quiz) => {
    delete quiz.createdAt;
    delete quiz.updatedAt;
    delete quiz.id;
  });
  delete jobOffer.userId;

  const applicantCount = await applicantRepository
    .createQueryBuilder("applicant")
    .where("applicant.jobOfferId = :id", { id })
    .getCount();

  return { ...jobOffer, applicantCount } || undefined;
}

export async function getSingleJobOfferById(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: [
      "quizzes",
      "quizzes.questions",
      "quizzes.questions.questionChoices",
      "applicants.answers",
      "applicants.answers.questionChoice",
    ],
  });

  return jobOffer || undefined;
}

export async function getAllUserJobOffers(userId: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);

  return (
    (await jobOfferRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: "DESC" },
    })) || []
  );
}

export async function getAllJobOffersApply() {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const jobOffers = await jobOfferRepository.find({
    where: { isActive: true },
    relations: ["user", "quizzes"],
    order: { updatedAt: "DESC" },
  });

  jobOffers.forEach((jobOffer) => {
    delete jobOffer.userId;
    delete jobOffer.user.password;
    delete jobOffer.user.createdAt;
    delete jobOffer.user.updatedAt;
    delete jobOffer.user.id;
    delete jobOffer.user.city;
    delete jobOffer.user.country;
    jobOffer.quizzes.forEach((quiz) => {
      delete quiz.createdAt;
      delete quiz.updatedAt;
      delete quiz.id;
    });
  });

  return jobOffers;
}

export async function upsertJobOffer(jobOffer: JobOfferType) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const newjobOffer = jobOfferRepository.create(jobOffer);
  return await jobOfferRepository.save(newjobOffer);
}

export default {
  getSingleJobOfferByIdApply,
  getSingleJobOfferByIdApplyInfo,
  getSingleJobOfferById,
  getAllUserJobOffers,
  getAllJobOffersApply,
  upsertJobOffer,
};
