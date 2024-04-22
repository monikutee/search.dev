import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn({
    name: "verification_expires",
    type: "timestamp with time zone",
    select: true,
    nullable: true,
  })
  verificationExpires: Date;

  @Column()
  password: string;

  @Column({ name: "phone_number", nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: "text", nullable: true })
  about?: string;

  @Column({ nullable: true })
  city?: string;

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
