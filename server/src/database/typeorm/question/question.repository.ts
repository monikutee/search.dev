import { AppDB } from "../../../connection";
import { Question as QuestionEntity } from "./question.entity";

export async function getQuestionById(id: string) {
  const questionRepository = AppDB.getRepository(QuestionEntity);

  const question = await questionRepository.findOne({
    where: { id },
    relations: ["quiz", "quiz.jobOffer"],
  });

  return question || undefined;
}

export default {
  getQuestionById,
};
