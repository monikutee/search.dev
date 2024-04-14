import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { Applicant } from "../applicant/applicant.entity";
import { Quiz } from "../quiz/quiz.entity";

@Entity()
export class JobOffer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Applicant, (applicant) => applicant.jobOffer, {
    cascade: true,
  })
  applicants: Applicant[];

  @OneToMany(() => Quiz, (quiz) => quiz.jobOffer, {
    cascade: true,
  })
  quizzes: Quiz[];

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  country: string;

  @Column({
    type: "enum",
    enum: ["FULL_TIME", "PART_TIME", "CONTRACT"],
    default: "FULL_TIME",
  })
  jobType: string;

  @Column({
    type: "enum",
    enum: ["REMOTE", "ON_SITE", "HYBRID"],
    default: "ON_SITE",
  })
  remote: string;

  @Column({
    type: "enum",
    enum: [
      "INTERNSHIP",
      "ENTRY_LEVEL",
      "ASSOCIATE",
      "JUNIOR",
      "MID",
      "MID_SENIOR",
      "SENIOR",
      "DIRECTOR",
      "EXECUTIVE",
    ],
    default: "MID",
  })
  experienceLevel: string;

  @Column()
  role: string;

  @Column("simple-array")
  benefits: string[];

  @Column("simple-array")
  commitments: string[];

  @Column()
  userId: string;

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
