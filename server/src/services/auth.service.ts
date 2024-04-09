import bcrypt from "bcrypt";
import { User } from "../types/user.type";
import { JwtPayload } from "jsonwebtoken";
import { validatePassword } from "../validation/user.validation";
import { validateJwt } from "../validation/jwt.validation";
import { ERROR_CODES } from "../types/errors.enum";
import { AppErrors } from "../helpers/app-errors";

export async function authLocal(password: string, user?: User) {
  if (!user) {
    throw new AppErrors(ERROR_CODES.WRONG_EMAIL);
  }
  await validatePassword(user.password);
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new AppErrors(ERROR_CODES.WRONG_PASSWORD);
  }
}

export async function authJwt(jwtPayload: JwtPayload) {
  await validateJwt(jwtPayload);
}

export default { authLocal, authJwt };
