import Client from "./client";
import Http from "../http";
import { LoginDto, SignUpDto } from "../types/user";
import type { AxiosResponse } from "axios";
import { JobOfferCreateDto } from "../types/jobOffer";

class JobOffer extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      CREATE: this.defaultUrl(`${this.http.baseUrl}/{userId}/job-offer/create`),
      FETCH_ALL_USERS: this.defaultUrl(
        `${this.http.baseUrl}/{userId}/job-offer/all`
      ),
      FETCH_ONE_USERS: this.defaultUrl(
        `${this.http.baseUrl}/{userId}/job-offer/{jobOfferId}`
      ),
    };
  }

  createJobOffer = (
    id: string,
    data: JobOfferCreateDto
  ): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.CREATE, { userId: id });
    return this.http.post(url, data);
  };

  fetchAllUsersJobOffers = (id: string): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.FETCH_ALL_USERS, { userId: id });
    return this.http.get(url);
  };

  fetchOneJobOfferUsers = (id: string): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.FETCH_ONE_USERS, { userId: id });
    return this.http.get(url);
  };
}

export default JobOffer;
