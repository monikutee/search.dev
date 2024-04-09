import { axiosRequests } from "../helpers/util";

const NOTIFICATION_API_PORT = process.env.NOTIFICATION_API_PORT;
const NOTIFICATION_API_ENDPOINT = process.env.NOTIFICATION_API_ENDPOINT;
const API_ROOT = process.env.API_ROOT;

const userAxiosRequests = axiosRequests(
  NOTIFICATION_API_ENDPOINT as string,
  NOTIFICATION_API_PORT as string
);
const axiosPost = userAxiosRequests.axiosPost;

export const resetPassword =
  (
    dependencies = {
      axiosPost,
    }
  ) =>
  async (email: string, token: string) => {
    await dependencies
      .axiosPost(`${API_ROOT}/mailer/reset-password`, {
        email,
        token,
      })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e.message, e.stack);
        return undefined;
      });
  };

export const resetPasswordSucc =
  (
    dependencies = {
      axiosPost,
    }
  ) =>
  async (email: string) => {
    await dependencies
      .axiosPost(`${API_ROOT}/mailer/reset-password-success`, {
        email,
      })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e.message, e.stack);
        return undefined;
      });
  };

export const resetEmail =
  (
    dependencies = {
      axiosPost,
    }
  ) =>
  async (email: string, token: string) => {
    await dependencies
      .axiosPost(`${API_ROOT}/mailer/reset-email`, {
        email,
        token,
      })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e.message, e.stack);
        return undefined;
      });
  };

export const resetEmailSucc =
  (
    dependencies = {
      axiosPost,
    }
  ) =>
  async (email: string) => {
    await dependencies
      .axiosPost(`${API_ROOT}/mailer/reset-email-success`, {
        email,
      })
      .then((response) => response.data)
      .catch((e) => {
        console.log(e.message, e.stack);
        return undefined;
      });
  };

export default {
  resetPassword: resetPassword(),
  resetPasswordSucc: resetPasswordSucc(),
  resetEmail: resetEmail(),
  resetEmailSucc: resetEmailSucc(),
};
