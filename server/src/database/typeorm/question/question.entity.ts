import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { QuestionChoice } from "../question-choice/question-choice.entity";
import { Quiz } from "../quiz/quiz.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.id)
  quiz: Quiz;

  @OneToMany(
    () => QuestionChoice,
    (questionChoice) => questionChoice.question,
    {
      cascade: true,
    }
  )
  questionChoices: QuestionChoice[];

  @Column("text")
  questionText: string;

  @Column({
    type: "enum",
    enum: ["MCQ", "CODE", "OPEN"],
    default: "MCQ",
  })
  questionType: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp with time zone",
  })
  updatedAt: Date;
}
