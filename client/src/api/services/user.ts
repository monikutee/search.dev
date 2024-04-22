import Client from "./client";
import Http from "../http";
import { LoginDto, SignUpDto, UserI } from "../types/user";
import type { AxiosResponse } from "axios";
class User extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      LOGIN: this.defaultUrl(`${this.http.baseUrl}/user/login`),
      EDIT: this.defaultUrl(`${this.http.baseUrl}/user/edit`),
      LOGOUT: this.defaultUrl(`${this.http.baseUrl}/user/logout`),
      SIGNUP: this.defaultUrl(`${this.http.baseUrl}/user/signup`),
      FETCH_USER: this.defaultUrl(`${this.http.baseUrl}/user/{id}`),
      VERIFY_EMAIL: this.defaultUrl(`${this.http.baseUrl}/user/verify/{token}`),
    };
  }

  login = (data: LoginDto): Promise<AxiosResponse<{ id?: string }>> => {
    return this.http.post(this.api.LOGIN, data);
  };

  logout = () => {
    return this.http.post(this.api.LOGOUT);
  };

  signUp = (data: Omit<SignUpDto, "id">) => {
    return this.http.post(this.api.SIGNUP, data);
  };

  editUser = (data: UserI): Promise<AxiosResponse<{ id: string }>> => {
    return this.http.post(this.api.EDIT, data);
  };

  fetchUser = (id: string) => {
    const url = this.buildUrl(this.api.FETCH_USER, { id });
    return this.http.get(url);
  };

  verifyEmail = (token: string) => {
    const url = this.buildUrl(this.api.VERIFY_EMAIL, { token });
    return this.http.post(url);
  };
}

export default User;
