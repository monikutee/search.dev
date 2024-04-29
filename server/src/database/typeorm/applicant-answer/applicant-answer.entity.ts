import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  Unique,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Applicant } from "../applicant/applicant.entity";
import { Question } from "../question/question.entity";
import { QuestionChoice } from "../question-choice/question-choice.entity";

@Entity()
@Unique(["applicant", "question"])
export class ApplicantAnswer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.id, {
    nullable: true,
  })
  @JoinColumn({ name: "applicant_id" })
  applicant: Applicant;

  @ManyToOne(() => Question, (question) => question.id, {
    nullable: true,
    cascade: true,
  })
  question: Question;

  @Column("text", { nullable: true })
  codeOutput: string;

  @ManyToMany(() => QuestionChoice, { cascade: true })
  @JoinTable({
    name: "applicant_answer_choices",
    joinColumn: {
      name: "answer_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "choice_id",
      referencedColumnName: "id",
    },
  })
  questionChoices: QuestionChoice[];

  @Column("text", { nullable: true })
  answerText: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt: Date;
}
