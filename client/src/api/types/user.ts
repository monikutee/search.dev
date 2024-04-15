export interface LoginDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  repeat_password: string;
  name: string;
  phoneNumber: string;
  country: string;
  city: string;
}

export interface UserI {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  country: string;
  city: string;
  about: string | null;
}
