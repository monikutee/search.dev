import { In } from "typeorm";
import { AppDB } from "../../../connection";
import { JobOffer as JobOfferType } from "../../../types/jobOffer.type";
import { User as UserEntity } from "../user/user.entity";
import { JobOffer as JobOfferEntity } from "./job-offer.entity";

export async function getSingleJobOfferById(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: [
      "quizzes",
      "quizzes.questions",
      "quizzes.questions.questionChoices",
    ],
  });

  jobOffer.quizzes.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      question.questionChoices.forEach((choice) => {
        delete choice.isCorrect;
      });
    });
  });
  return jobOffer || undefined;
}

export async function getAllUserJobOffers(userId: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);

  return (
    (await jobOfferRepository.find({
      where: { user: { id: userId } },
    })) || []
  );
}

// ALL INFO
// export async function getAllUserJobOffers(userId: string) {
//   const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
//   const jobOffers = await jobOfferRepository.find({
//     where: { user: { id: userId } },
//     relations: [
//       "user",
//       "quizzes",
//       "quizzes.questions",
//       "quizzes.questions.questionChoices",
//     ],
//   });

//   jobOffers.forEach((jobOffer) => {
//     jobOffer.quizzes.forEach((quiz) => {
//       quiz.questions.forEach((question) => {
//         question.questionChoices.forEach((choice) => {
//           delete choice.isCorrect;
//         });
//       });
//     });
//   });

//   return jobOffers || [];
// }

export async function disableJobOffer(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const disabledJobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: ["user", "quiz"],
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
  getAllUserJobOffers,
  upsertJobOffer,
  disableJobOffer,
};
