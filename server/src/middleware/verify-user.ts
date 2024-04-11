import { AppErrors } from "../helpers/app-errors";
import { verifyAccessToken } from "../helpers/util";
import userService from "../services/user.service";
import { ERROR_CODES } from "../types/errors.enum";

export const verifyUser = async (req, _res, next) => {
  const userData = verifyAccessToken(req.cookies.jwt);

  if (!userData) {
    throw new AppErrors(ERROR_CODES.INVALID_TOKEN, undefined, 401);
  }

  const userCompact = await userService.getUser(userData.email);
  if (userData.userId !== userCompact.id) {
    throw new AppErrors(ERROR_CODES.INVALID_TOKEN, undefined, 401);
  }

  req.userData = userData;
  req.userCompact = userCompact;
  next();
};
