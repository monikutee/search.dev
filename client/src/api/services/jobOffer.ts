import Client from "./client";
import Http from "../http";
import { LoginDto, SignUpDto } from "../types/user";
import type { AxiosResponse } from "axios";

class JobOffer extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      LOGIN: this.defaultUrl(`${this.http.baseUrl}/user/login`),
      LOGOUT: this.defaultUrl(`${this.http.baseUrl}/user/logout`),
      SIGNUP: this.defaultUrl(`${this.http.baseUrl}/user/signup`),
      FETCH_USER: this.defaultUrl(`${this.http.baseUrl}/user/{id}`),
    };
  }

  createJobOffer = (data: LoginDto): Promise<AxiosResponse<{ id: string }>> => {
    return this.http.post(this.api.LOGIN, data);
  };
}

export default JobOffer;
