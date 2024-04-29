import Client from "./client";
import Http from "../http";
import type { AxiosResponse } from "axios";
import { ApplicantEntryI } from "../types/applicant";

class Applicant extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      CREATE: this.defaultUrl(
        `${this.http.baseUrl}/applicant/create/{jobOfferId}`
      ),
      //   FETCH_ALL_USERS: this.defaultUrl(
      //     `${this.http.baseUrl}/{userId}/job-offer/all`
      //   ),
      //   FETCH_ONE_USERS: this.defaultUrl(
      //     `${this.http.baseUrl}/{userId}/job-offer/{jobOfferId}`
      //   ),
      //   FETCH_ALL: this.defaultUrl(`${this.http.baseUrl}/job-offers/all`),
      //   FETCH_ONE_JOB_OFFER_INFO: this.defaultUrl(
      //     `${this.http.baseUrl}/job-offers/{jobOfferId}`
      //   ),
      //   FETCH_ONE_JOB_OFFER_APPLY: this.defaultUrl(
      //     `${this.http.baseUrl}/apply/{jobOfferId}`
      //   ),
    };
  }

  createApplicantEntry = (
    id: string,
    data: ApplicantEntryI
  ): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.CREATE, { jobOfferId: id });
    return this.http.post(url, data);
  };
}

export default Applicant;
