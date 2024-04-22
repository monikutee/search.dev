export interface User {
  id?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  name?: string;
  country?: string;
  city?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verificationExpires?: Date;
  isVerified?: boolean;
}
