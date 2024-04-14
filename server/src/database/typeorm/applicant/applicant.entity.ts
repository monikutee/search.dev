import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
  CreateDateColumn,
} from "typeorm";
import { ApplicantAnswer } from "../applicant-answer/applicant-answer.entity";
import { JobOffer } from "../job-offer/job-offer.entity";

@Entity()
@Unique(["email", "jobOfferId"])
export class Applicant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  fullName?: string;

  @ManyToOne(() => JobOffer, (jobOffer) => jobOffer.applicants)
  jobOffer: JobOffer;

  @Column()
  jobOfferId: string;

  @OneToMany(() => ApplicantAnswer, (answer) => answer.applicant, {
    cascade: true,
  })
  answers: ApplicantAnswer[];

  @Column()
  email: string;

  @CreateDateColumn({
    name: "apply_date",
    type: "timestamp with time zone",
  })
  applyDate: Date;
}
