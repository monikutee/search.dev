import Client from "./client";
import Http from "../http";
import { LoginDto, SignUpDto, UserI } from "../types/user";
import type { AxiosResponse } from "axios";
class User extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      LOGIN: this.defaultUrl(`${this.http.baseUrl}/user/login`),
      SIGNUP: this.defaultUrl(`${this.http.baseUrl}/user/signup`),
      EDIT: this.defaultUrl(`${this.http.baseUrl}/user/{userId}/edit`),
      LOGOUT: this.defaultUrl(`${this.http.baseUrl}/user/{userId}/logout`),
      FETCH_USER: this.defaultUrl(`${this.http.baseUrl}/user/{userId}`),
      VERIFY_EMAIL: this.defaultUrl(`${this.http.baseUrl}/user/verify/{token}`),
      START_PASSWORD_RESET: this.defaultUrl(
        `${this.http.baseUrl}/user/start-password-reset`
      ),
      FINISH_PASSWORD_RESET: this.defaultUrl(
        `${this.http.baseUrl}/user/finish-password-reset`
      ),
    };
  }

  login = (data: LoginDto): Promise<AxiosResponse<{ id?: string }>> => {
    return this.http.post(this.api.LOGIN, data);
  };

  signUp = (data: Omit<SignUpDto, "id">) => {
    return this.http.post(this.api.SIGNUP, data);
  };

  logout = (userId: string) => {
    const url = this.buildUrl(this.api.LOGOUT, { userId });
    return this.http.post(url);
  };

  editUser = (userId: string, data: UserI): Promise<AxiosResponse<UserI>> => {
    const url = this.buildUrl(this.api.EDIT, { userId });
    return this.http.post(url, data);
  };

  fetchUser = (userId: string) => {
    const url = this.buildUrl(this.api.FETCH_USER, { userId });
    return this.http.get(url);
  };

  verifyEmail = (token: string) => {
    const url = this.buildUrl(this.api.VERIFY_EMAIL, { token });
    return this.http.post(url);
  };

  startPasswordReset = (email: string) => {
    return this.http.post(this.api.START_PASSWORD_RESET, { email });
  };

  finishPasswordReset = (payload: { token: string; password: string }) => {
    return this.http.post(this.api.FINISH_PASSWORD_RESET, payload);
  };
}

export default User;
