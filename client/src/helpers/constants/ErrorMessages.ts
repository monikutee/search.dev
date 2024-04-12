import { ErrorCodeEnum } from "../enums/ErrorCodeEnum";

export const ErrorMessages: { [key: string]: string } = {
  [ErrorCodeEnum.USER_MISSING]: "User with these credentials does not exist",
  [ErrorCodeEnum.WRONG_PASSWORD]: "Your password is incorrect",
};
