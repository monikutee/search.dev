import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class DataReset {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @CreateDateColumn({
    name: "reset_password_expires",
    type: "timestamp with time zone",
    select: true,
    nullable: true,
  })
  resetExpires: Date;

  @Column({ default: false })
  reseted: boolean;

  @Column("jsonb")
  data: any;

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
