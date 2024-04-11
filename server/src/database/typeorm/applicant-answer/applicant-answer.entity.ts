import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Applicant } from "../applicant/applicant.entity";
import { Question } from "../question/question.entity";
import { QuestionChoice } from "../question-choice/question-choice.entity";

@Entity()
export class ApplicantAnswer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.id)
  applicant: Applicant;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @ManyToOne(() => QuestionChoice, (questionChoice) => questionChoice.id, {
    nullable: true,
  })
  questionChoice: QuestionChoice;

  @Column("text", { nullable: true })
  answerText: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt: Date;
}
