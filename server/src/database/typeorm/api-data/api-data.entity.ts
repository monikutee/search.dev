import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class ApiData {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  endpoint: string;

  @Column()
  method: string;

  @Column()
  status: number;

  @Column("jsonb", { name: "request_body", nullable: true })
  requestBody?: any;

  @Column("jsonb", { name: "response_body", nullable: true })
  responseBody?: any;

  @Column({ nullable: true })
  ip?: string;

  @Column("jsonb", { nullable: true })
  headers?: any;

  @Column({ name: "call_api", nullable: true })
  stopRequest?: boolean;

  @Column({ nullable: true })
  error?: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt?: Date;
}
