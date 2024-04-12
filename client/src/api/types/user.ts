export interface LoginDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  repeat_password: string;
  name: string;
  phone: string;
  country: string;
  city: string;
}
