import { AppDB } from "../../../connection";
import { AnswerTypeEnum } from "../../../types/jobOffer.type";
import { Applicant as ApplicantEntity } from "./applicant.entity";

export async function upsertApplicant(applicant: {
  id?: string;
  email?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  about?: string;
  country?: string;
  city?: string;
  jobOfferId?: string;
  answers?: any[];
  applied?: boolean;
}) {
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
    let multiQuestionCount = 0;

    const detailedAnswers = applicant.answers.map((answer) => {
      let totalCorrectChoices = 0;
      if (answer.question.questionType === AnswerTypeEnum.MULTI) {
        multiQuestionCount++;
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

        if (isNaN(score)) {
          score = 0;
        }

        overallSelectedCorrect += score;

        const correctCount = `${correctSelectedCount}/${totalCorrectChoices}`;

        return {
          ...answer,
          correctCount,
          score: score.toFixed(2),
        };
      } else {
        return {
          ...answer,
        };
      }
    });

    const overallScore =
      overallTotalCorrect > 0
        ? (overallSelectedCorrect / multiQuestionCount).toFixed(2)
        : null;

    return {
      ...applicant,
      answers: detailedAnswers,
      overallCorrectCount: overallScore,
    };
  });
}

export async function getApplicantById(applicantId: string) {
  const applicantRepository = AppDB.getRepository(ApplicantEntity);
  return await applicantRepository.findOne({
    where: { id: applicantId },
  });
}

export default {
  upsertApplicant,
  getApplicantById,
  getApplicantsByJobOfferId,
};
