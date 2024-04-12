import Client from "./client";
import Http from "../http";
import { LoginDto, SignUpDto } from "../types/user";

class User extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      LOGIN: this.defaultUrl(`${this.http.baseUrl}/user/login`),
      SIGNUP: this.defaultUrl(`${this.http.baseUrl}/user/signup`),
    };
  }

  login = (data: LoginDto) => {
    return this.http.post(this.api.LOGIN, data);
  };

  signUp = (data: SignUpDto) => {
    return this.http.post(this.api.SIGNUP, data);
  };
}

export default User;
