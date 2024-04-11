import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Question } from "../question/question.entity";

@Entity()
export class QuestionChoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @Column("text")
  choiceText: string;

  @Column({ default: false })
  isCorrect: boolean;
}
