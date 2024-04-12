import Http from "./http";
import User from "./services/user";

export const http = new Http();
export { http as Http };

const Api = {
  user: new User(http),
};

export default Api;
