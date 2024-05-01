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
@Unique(["phoneNumber", "jobOfferId"])
export class Applicant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column()
  country: string;

  @Column({ type: "text" })
  about: string;

  @Column()
  city: string;

  @Column({ default: false })
  applied: boolean;

  @ManyToOne(() => JobOffer, (jobOffer) => jobOffer.applicants)
  jobOffer: JobOffer;

  @Column()
  jobOfferId: string;

  @OneToMany(() => ApplicantAnswer, (answer) => answer.applicant, {
    cascade: true,
  })
  answers: ApplicantAnswer[];

  @CreateDateColumn({
    name: "apply_date",
    type: "timestamp with time zone",
  })
  applyDate: Date;
}
