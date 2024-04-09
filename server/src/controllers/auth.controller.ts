import { Request, Response } from "express";
import { verifyAccessToken } from "../helpers/util";
import { authService, userService } from "../services";
import { handleErrorResponse } from "../helpers/app-errors";

export const authJWT =
  (
    dependencies = {
      authJwt: authService.authJwt,
      getUser: userService.getUser,
    }
  ) =>
  async (req: Request, res: Response) => {
    const { jwt } = req.body;
    console.log("jwt", jwt);
    try {
      const userData = verifyAccessToken(jwt);
      await dependencies.authJwt(userData);
      const userCompact = await dependencies.getUser(userData.email);
      return res.status(200).json(userCompact);
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

export default {
  authJWT: authJWT(),
};
