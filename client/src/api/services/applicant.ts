import Client from "./client";
import Http from "../http";
import type { AxiosResponse } from "axios";
import { ApplicantEntryI, ApplyAnswerI } from "../types/applicant";
import { CodeLanguageEnum } from "../../helpers/enums/JobOfferEnums";

class Applicant extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      CREATE: this.defaultUrl(
        `${this.http.baseUrl}/applicant/create/{jobOfferId}`
      ),
      FETCH_ONE_JOB_OFFER_APPLY: this.defaultUrl(
        `${this.http.baseUrl}/applicant/job-offer/{applicantId}`
      ),
      RUN_CODE: this.defaultUrl(
        `${this.http.baseUrl}/applicant/{applicantId}/{questionId}/run-code`
      ),
      SUBMIT_ANSWERS: this.defaultUrl(
        `${this.http.baseUrl}/applicant/apply/{jobOfferId}/{applicantId}`
      ),
    };
  }

  fetchOneJobOfferApply = (
    applicantId: string
  ): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.FETCH_ONE_JOB_OFFER_APPLY, {
      applicantId,
    });
    return this.http.get(url);
  };

  runQuestionCode = (
    applicantId: string,
    questionId: string,
    data: { code: string; language: CodeLanguageEnum }
  ): Promise<AxiosResponse<{ output: string }>> => {
    const url = this.buildUrl(this.api.RUN_CODE, {
      applicantId,
      questionId,
    });
    return this.http.post(url, data);
  };

  createApplicantEntry = (
    id: string,
    data: ApplicantEntryI
  ): Promise<AxiosResponse<any>> => {
    const url = this.buildUrl(this.api.CREATE, { jobOfferId: id });
    return this.http.post(url, data);
  };

  submitApplicantAnswers = (
    jobOfferId: string,
    applicantId: string,
    data: { answers: ApplyAnswerI }
  ) => {
    const url = this.buildUrl(this.api.SUBMIT_ANSWERS, {
      jobOfferId,
      applicantId,
    });
    return this.http.post(url, data);
  };
}

export default Applicant;
