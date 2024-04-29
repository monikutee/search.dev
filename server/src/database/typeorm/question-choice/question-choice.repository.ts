import { AppDB } from "../../../connection";
import { QuestionChoice as QuestionChoiceEntity } from "./question-choice.entity";

export async function getQuestionChoicesByQuestionId(id: string) {
  const questionChoiceRepository = AppDB.getRepository(QuestionChoiceEntity);

  const questionChoices = await questionChoiceRepository.find({
    where: {
      question: { id },
    },
  });

  return questionChoices || undefined;
}

export default {
  getQuestionChoicesByQuestionId,
};
