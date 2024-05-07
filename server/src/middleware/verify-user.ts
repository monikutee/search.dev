import { AppErrors } from "../helpers/app-errors";
import { verifyAccessToken } from "../helpers/util";
import userService from "../services/user.service";
import { ERROR_CODES } from "../types/errors.enum";

export const verifyUser = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      throw new AppErrors(ERROR_CODES.MISSING_TOKEN, undefined, 501);
    }
    const userData = verifyAccessToken(req.cookies.jwt);

    if (!userData) {
      throw new AppErrors(ERROR_CODES.INVALID_TOKEN, undefined, 401);
    }

    const { userId } = req.params;

    if (userData.userId !== userId) {
      throw new AppErrors(ERROR_CODES.PERMISSION_DENIED, undefined, 401);
    }

    const userCompact = await userService.getUser(userData.email);
    if (userData.userId !== userCompact.id) {
      throw new AppErrors(ERROR_CODES.INVALID_TOKEN, undefined, 401);
    }

    req.userData = userData;
    req.userCompact = userCompact;
    next();
  } catch (error) {
    if (error.code === "INVALID_TOKEN") {
      res.status(401).send({ error: "Invalid token" });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};
