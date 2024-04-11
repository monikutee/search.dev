import { User } from "./user.type";

export type JobOffer = {
  id: string;
  user: User;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
