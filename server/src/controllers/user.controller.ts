import { Request, Response } from "express";
import { handleErrorResponse } from "../helpers/app-errors";
import { getAccessToken } from "../helpers/util";
import { authService, userService } from "../services";

export const getUserById =
  (
    dependencies = {
      getUserById: userService.getUserById,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await dependencies.getUserById(id).catch(() => undefined);
      if (!user) {
        res.status(400).json("User not found");
      }

      res.status(200).json(user);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getUsersByIds =
  (
    dependencies = {
      getUsersByIds: userService.getUsersByIds,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { ids } = req.body;
      const users = await dependencies
        .getUsersByIds(ids)
        .catch(() => undefined);
      res.status(200).json(users);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const edit =
  (
    dependencies = {
      editUser: userService.editUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      //local auth on gateway side
      const user = req.body;
      delete user.credits;
      delete user.password;
      console.log("user before", user);
      const editedUser = await dependencies.editUser(user);
      const accessToken = getAccessToken(editedUser.id, editedUser.email);

      res
        .cookie("jwt", accessToken, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({ accessToken, user: editedUser });
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const signup =
  (
    dependencies = {
      createUser: userService.createUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await dependencies.createUser(email, password, "signup");
      const accessToken = getAccessToken(user.id, user.email);

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: false,
      });
      res.status(200);
      res.json({ accessToken: accessToken });
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const refresh =
  (
    dependencies = {
      getUserCompact: userService.getUserCompact,
    }
  ) =>
  async (req: Request, res: Response) => {
    //jwt auth on gateway side
    const { email } = req.body;

    const compactUser = await dependencies.getUserCompact(email);
    delete compactUser.id;
    res.status(200).json(compactUser);
  };

export const startPasswordReset =
  (dependencies = { startPasswordReset: userService.startPasswordReset }) =>
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
  (dependencies = { finishPasswordReset: userService.finishPasswordReset }) =>
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
    }
  ) =>
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await dependencies.getUser(email);
      await dependencies.authLocal(password, user);
      const accessToken = getAccessToken(user.id, email);

      res
        .cookie("jwt", accessToken, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({ accessToken });
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  login: loginLocal(),
  getUserById: getUserById(),
  getUsersByIds: getUsersByIds(),
  edit: edit(),
  signup: signup(),
  refresh: refresh(),
  startPasswordReset: startPasswordReset(),
  finishPasswordReset: finishPasswordReset(),
};
