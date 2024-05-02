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

export const verifyEmail =
  () => async (email: string, token: string, origin: string) => {
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
          Subject: "Verify your email",
          TextPart:
            "Dear user, You have recently visited our website and entered your email. Please follow the given link to verify your email, thanks",
          HTMLPart: `<h3>Dear user,</h3><p>You have recently visited our website and entered your email.</p><p>Please follow the given link to verify your email: ${origin}/verify/${token}</p><p>Thanks</p>`,
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

export const sendApplicantLink =
  () =>
  async (
    email: string,
    link: string,
    jobOfferTitle: string,
    companyName: string
  ) => {
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
          Subject: "Apply link",
          TextPart:
            "Hello, Thank you for visiting our website and applying for the position. We are sending you the link to proceed with your application.",
          HTMLPart: `<h3>Hello,</h3><p>Thank you for visiting our website and applying for the position ${jobOfferTitle} (${companyName}).</p><p> We are sending you the link to proceed with your application: ${link}</p><p>Thanks</p>`,
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
  verifyEmail: verifyEmail(),
  sendApplicantLink: sendApplicantLink(),
};
