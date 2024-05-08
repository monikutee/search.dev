import Client from "./client";
import Http from "../http";
import type { AxiosResponse } from "axios";
import { JobOfferApplyMiniDto, JobOfferDto } from "../types/jobOffer";
import { ApplicantsDtoI } from "../types/applicant";

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
      FETCH_ALL: this.defaultUrl(`${this.http.baseUrl}/job-offers/all`),
      FETCH_ONE_JOB_OFFER_INFO: this.defaultUrl(
        `${this.http.baseUrl}/job-offers/{jobOfferId}`
      ),
      FETCH_APPLICANTS: this.defaultUrl(
        `${this.http.baseUrl}/{userId}/job-offer/applicants/{jobOfferId}`
      ),
    };
  }

  createJobOffer = (
    id: string,
    data: JobOfferDto
  ): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.CREATE, { userId: id });
    return this.http.post(url, data);
  };

  fetchAllUsersJobOffers = (
    id: string
  ): Promise<AxiosResponse<JobOfferDto>> => {
    const url = this.buildUrl(this.api.FETCH_ALL_USERS, { userId: id });
    return this.http.get(url);
  };

  fetchOneJobOfferUsers = (
    userId: string,
    jobOfferId: string
  ): Promise<AxiosResponse<JobOfferDto>> => {
    const url = this.buildUrl(this.api.FETCH_ONE_USERS, { userId, jobOfferId });
    return this.http.get(url);
  };

  fetchAllJobOffers = (): Promise<AxiosResponse<JobOfferApplyMiniDto[]>> => {
    return this.http.get(this.api.FETCH_ALL);
  };

  fetchOneJobOfferInfo = (
    jobOfferId: string
  ): Promise<AxiosResponse<JobOfferApplyMiniDto>> => {
    const url = this.buildUrl(this.api.FETCH_ONE_JOB_OFFER_INFO, {
      jobOfferId,
    });
    return this.http.get(url);
  };

  fetchApplicants = (
    userId: string,
    jobOfferId: string
  ): Promise<AxiosResponse<ApplicantsDtoI>> => {
    const url = this.buildUrl(this.api.FETCH_APPLICANTS, {
      userId,
      jobOfferId,
    });
    return this.http.get(url);
  };
}

export default JobOffer;
