import { AppDB } from "../../../connection";
import { JobOfferType as JobOfferType } from "../../../types/jobOffer.type";
import { Applicant as ApplicantEntity } from "../applicant/applicant.entity";
import { Question as QuestionEntity } from "../question/question.entity";
import { JobOffer as JobOfferEntity } from "./job-offer.entity";

export async function getSingleJobOfferByIdApply(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id, isActive: true },
    relations: [
      "user",
      "quizzes",
      "quizzes.questions",
      "quizzes.questions.questionChoices",
    ],
  });

  if (!jobOffer) return undefined;

  delete jobOffer.userId;
  delete jobOffer.user.password;
  delete jobOffer.user.createdAt;
  delete jobOffer.user.updatedAt;
  delete jobOffer.user.id;
  delete jobOffer.user.city;
  delete jobOffer.user.country;
  delete jobOffer.user.isVerified;
  delete jobOffer.user.verificationExpires;

  jobOffer.quizzes.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      question.questionChoices.forEach((choice) => {
        delete choice.isCorrect;
      });
    });
  });

  return { ...jobOffer } || undefined;
}

export async function getSingleJobOfferByIdApplyInfo(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);
  const applicantRepository = AppDB.getRepository(ApplicantEntity);
  const questionRepository = AppDB.getRepository(QuestionEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id, isActive: true },
    relations: ["user", "quizzes"],
  });

  if (!jobOffer) return undefined;

  delete jobOffer.userId;
  delete jobOffer.user.password;
  delete jobOffer.user.createdAt;
  delete jobOffer.user.updatedAt;
  delete jobOffer.user.id;
  delete jobOffer.user.city;
  delete jobOffer.user.country;
  delete jobOffer.user.isVerified;
  delete jobOffer.user.verificationExpires;

  const questionsCountPromises = jobOffer.quizzes.map(async (quiz) => {
    const counts = await questionRepository
      .createQueryBuilder("question")
      .select("question.questionType", "type")
      .addSelect("COUNT(*)", "count")
      .where("question.quizId = :id", { id: quiz.id })
      .groupBy("question.questionType")
      .getRawMany();

    delete quiz.createdAt;
    delete quiz.updatedAt;
    delete quiz.id;

    return counts.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + parseInt(curr.count);
      return acc;
    }, {});
  });

  const questionsCounts = await Promise.all(questionsCountPromises);
  const totalQuestionCount = questionsCounts.reduce(
    (acc, count) =>
      acc + Object.values(count).reduce((a: number, b: number) => a + b, 0),
    0
  );
  const openTypeCount = questionsCounts.reduce(
    (acc, count) => acc + (count.OPEN || 0),
    0
  );
  const choiceTypeCount = questionsCounts.reduce(
    (acc, count) => acc + (count.MCQ || 0),
    0
  );

  const codeTypeCount = questionsCounts.reduce(
    (acc, count) => acc + (count.CODE || 0),
    0
  );

  const applicantCount = await applicantRepository
    .createQueryBuilder("applicant")
    .where("applicant.jobOfferId = :id", { id })
    .getCount();

  return (
    {
      ...jobOffer,
      applicantCount,
      totalQuestionCount,
      openTypeCount,
      choiceTypeCount,
      codeTypeCount,
    } || undefined
  );
}

export async function getSingleJobOfferById(id: string) {
  const jobOfferRepository = AppDB.getRepository(JobOfferEntity);

  const jobOffer = await jobOfferRepository.findOne({
    where: { id },
    relations: [
      "quizzes",
      "quizzes.questions",
      "quizzes.questions.questionChoices",
      // "applicants.answers",
      // "applicants.answers.question",
      // "applicants.answers.question.questionChoices",
      // "applicants.answers.questionChoices",
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
    delete jobOffer.user.isVerified;
    delete jobOffer.user.city;
    delete jobOffer.user.country;
    delete jobOffer.user.verificationExpires;

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
