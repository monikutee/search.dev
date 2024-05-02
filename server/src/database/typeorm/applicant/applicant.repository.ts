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
  const applicants = await applicantRepository.find({
    where: { jobOfferId },
    relations: [
      "answers",
      "answers.questionChoices",
      "answers.question",
      "answers.question.questionChoices",
    ],
    order: { applyDate: "DESC" },
  });

  return applicants.map((applicant) => {
    let overallSelectedCorrect = 0;
    let overallTotalCorrect = 0;

    const detailedAnswers = applicant.answers.map((answer) => {
      let totalCorrectChoices = 0;

      totalCorrectChoices = answer.question.questionChoices.filter(
        (choice) => choice.isCorrect
      ).length;
      overallTotalCorrect += totalCorrectChoices;

      const correctChoicesSet = new Set(
        answer.question.questionChoices
          .filter((choice) => choice.isCorrect)
          .map((choice) => choice.id)
      );
      const selectedChoicesSet = new Set(
        answer.questionChoices.map((choice) => choice.id)
      );

      const correctSelectedCount = [...selectedChoicesSet].filter((id) =>
        correctChoicesSet.has(id)
      ).length;

      const incorrectSelectionExists = answer.questionChoices.some(
        (choice) => !choice.isCorrect
      );

      let score: number;
      if (!incorrectSelectionExists) {
        score = correctSelectedCount / totalCorrectChoices;
      } else {
        score = 0;
      }

      overallSelectedCorrect += score;

      const correctCount = `${correctSelectedCount}/${totalCorrectChoices}`;

      return {
        ...answer,
        correctCount,
        score: score.toFixed(2),
      };
    });

    const overallScore =
      overallTotalCorrect > 0
        ? (overallSelectedCorrect / detailedAnswers.length).toFixed(2)
        : null;

    return {
      ...applicant,
      answers: detailedAnswers,
      overallCorrectCount: overallScore,
    };
  });
}

export async function getJobOfferByApplicantId(applicantId: string) {
  const applicantRepository = AppDB.getRepository(ApplicantEntity);
  return await applicantRepository.findOne({
    where: { id: applicantId },
  });
}

export default {
  upsertApplicant,
  getJobOfferByApplicantId,
  getApplicantsByJobOfferId,
};
