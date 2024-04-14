import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { JobOffer } from "../job-offer/job-offer.entity";
import { Question } from "../question/question.entity";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => JobOffer, (jobOffer) => jobOffer.id)
  jobOffer: JobOffer;

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
  })
  questions: Question[];

  @Column()
  title: string;

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
