import Http from "./http";
import JobOffer from "./services/jobOffer";
import User from "./services/user";
import Applicant from "./services/applicant";

export const http = new Http();
export { http as Http };

const Api = {
  user: new User(http),
  applicant: new Applicant(http),
  jobOffer: new JobOffer(http),
};

export default Api;
