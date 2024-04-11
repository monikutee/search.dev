import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  "1a78b3707b8106db2e30b4aa2ce22c63",
  "44fe545b3cc9926b7dcd6aec58ae07f0"
);

export const resetPassword = () => async (email: string, token: string) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "petrulevicmonika@gmail.com",
          Name: "MONIKA SEARCH.DEV",
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: "Your password reset link",
        TextPart: "Dear user, here is your password reset link.",
        HTMLPart: `<h3>Dear user,</h3><p>Here is your password reset token: ${token}</p>`,
      },
    ],
  });

  return request
    .then((result) => {
      return result.body;
    })
    .catch((err) => {
      return undefined;
    });
};

export default {
  resetPassword: resetPassword(),
};
