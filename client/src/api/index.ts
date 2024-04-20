import Http from "./http";
import JobOffer from "./services/jobOffer";
import User from "./services/user";

export const http = new Http();
export { http as Http };

const Api = {
  user: new User(http),
  jobOffer: new JobOffer(http),
};

export default Api;
