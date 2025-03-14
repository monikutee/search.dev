import { Request, Response } from "express";
import { AppErrors, handleErrorResponse } from "../helpers/app-errors";
import {
  getAccessToken,
  getVerificationAccessToken,
  verifyAccessToken,
} from "../helpers/util";
import { authService, userService } from "../services";
import { ERROR_CODES } from "../types/errors.enum";

export const getUserById =
  (
    dependencies = {
      getUserById: userService.getUserById,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await dependencies.getUserById(userId);
      if (!user) {
        res.status(400).json("User not found");
      }

      delete user.password;

      res.status(200).json(user);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const edit =
  (
    dependencies = {
      editUser: userService.editUser,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const user = req.body;

      const editedUser = await dependencies.editUser({
        id: user.id,
        about: user.about,
      });

      res.status(200).json(editedUser);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const logout = () => async (_req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: false,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    handleErrorResponse(e, res);
  }
};

export const signup =
  (
    dependencies = {
      createUser: userService.createUser,
      verifyEmail: userService.verifyEmail,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { email, password, name, city, country, phoneNumber, consent } =
        req.body;

      if (!consent) {
        throw new AppErrors(ERROR_CODES.CONSENT);
      }

      const origin = req.headers.origin;

      const user = await dependencies.createUser({
        email,
        password,
        name,
        city,
        country,
        phoneNumber,
        verificationExpires: new Date(new Date().getTime() + 30 * 60 * 1000),
      });
      const accessToken = getVerificationAccessToken(user.id, user.email);
      await dependencies.verifyEmail(user.email, accessToken, origin);

      res.send(
        "An e-mail has been sent to " + email + " with further instructions."
      );
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const refresh =
  (
    dependencies = {
      getUserCompact: userService.getUserCompact,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const compactUser = await dependencies.getUserCompact(email);
    delete compactUser.id;
    res.status(200).json(compactUser);
  };

export const startPasswordReset =
  (
    dependencies = {
      startPasswordReset: userService.startPasswordReset,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await dependencies.startPasswordReset(email);
      res.send(
        "An e-mail has been sent to " + email + " with further instructions."
      );
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const finishPasswordReset =
  (
    dependencies = {
      finishPasswordReset: userService.finishPasswordReset,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      await dependencies.finishPasswordReset(token, password);
      res.status(200).send("ok");
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const loginLocal =
  (
    dependencies = {
      getUser: userService.getUser,
      authLocal: authService.authLocal,
      verifyEmail: userService.verifyEmail,
      editUser: userService.editUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const origin = req.headers.origin;

    try {
      const user = await dependencies.getUser(email);
      await dependencies.authLocal(password, user);

      if (user.isVerified) {
        const accessToken = getAccessToken(user.id, email);

        res
          .cookie("jwt", accessToken, {
            httpOnly: true,
            secure: false,
          })
          .status(200)
          .json({ id: user.id });
      } else {
        if (
          new Date().getTime() > new Date(user.verificationExpires).getTime()
        ) {
          const verificationAccessToken = getVerificationAccessToken(
            user.id,
            user.email
          );
          await dependencies.verifyEmail(
            user.email,
            verificationAccessToken,
            origin
          );
          await dependencies.editUser({
            id: user.id,
            verificationExpires: new Date(
              new Date().getTime() + 30 * 60 * 1000
            ),
          });
        }
        res
          .status(200)
          .send(
            "An e-mail has been sent to " +
              email +
              " with further instructions."
          );
      }
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const checkVerification =
  (
    dependencies = {
      getUserById: userService.getUserById,
      editUser: userService.editUser,
      authJwt: authService.authJwt,
    }
  ) =>
  async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
      const userData = verifyAccessToken(token);
      await dependencies.authJwt(userData);

      const user = await dependencies.getUserById(userData.userId);
      const edited = await dependencies.editUser({
        id: user.id,
        isVerified: true,
      });
      const accessToken = getAccessToken(edited.id, edited.email);

      return res
        .cookie("jwt", accessToken, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({ id: edited.id });
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  login: loginLocal(),
  getUserById: getUserById(),
  edit: edit(),
  signup: signup(),
  refresh: refresh(),
  startPasswordReset: startPasswordReset(),
  finishPasswordReset: finishPasswordReset(),
  logout: logout(),
  checkVerification: checkVerification(),
};
