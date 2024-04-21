import { Request, Response } from "express";
import { handleErrorResponse } from "../helpers/app-errors";
import { getAccessToken } from "../helpers/util";
import { authService, userService } from "../services";

export const getUserById =
  (
    dependencies = {
      getUserById: userService.getUserById,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await dependencies.getUserById(id);
      if (!user) {
        res.status(400).json("User not found");
      }

      delete user.password;

      res.status(200).json(user);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const getUsersByIds =
  (
    dependencies = {
      getUsersByIds: userService.getUsersByIds,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { ids } = req.body;
      const users = await dependencies.getUsersByIds(ids);

      users.forEach((user) => delete user.password);
      res.status(200).json(users);
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
      delete user.password;

      const editedUser = await dependencies.editUser(user);
      const accessToken = getAccessToken(editedUser.id, editedUser.email);

      res
        .cookie("jwt", accessToken, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json(editedUser);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export const logout = () => async (req: Request, res: Response) => {
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
    }
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { email, password, name, city, country, phoneNumber } = req.body;
      const user = await dependencies.createUser({
        email,
        password,
        name,
        city,
        country,
        phoneNumber,
      });
      const accessToken = getAccessToken(user.id, user.email);

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: false,
      });
      res.status(200);
      res.json({ id: user.id });
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
        .json({ id: user.id });
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
  logout: logout(),
};
