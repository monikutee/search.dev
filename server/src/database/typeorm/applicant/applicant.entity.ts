import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column()
  email: string;

  @Column({ name: "apply_date", type: "timestamp with time zone" })
  applyDate: Date;
}
