import { ErrorCodeEnum } from "../enums/ErrorCodeEnum";

export const ErrorMessages: { [key: string]: string } = {
  [ErrorCodeEnum.USER_MISSING]: "User with these credentials does not exist",
  [ErrorCodeEnum.WRONG_PASSWORD]: "Your password is incorrect",
  [ErrorCodeEnum.EMAIL_EXIST]: "An account with this email already exists",
  [ErrorCodeEnum.RECORD_EXIST]: "Record with given data already exists",
  [ErrorCodeEnum.OPEN_QUESTIONS_DOES_NEED_CHOICE]:
    "Open questions should not have choices.",
  [ErrorCodeEnum.QUESTION_CHOICES_MUST]:
    "Questions of type ONE or MULTI should have choices.",
  [ErrorCodeEnum.ALREADY_APPLIED]: "You already applied for this position",
  [ErrorCodeEnum.JOB_OFFER_HAS_APPLICANTS]:
    "This job offer already has applicants, thus you can not edit it",
  [ErrorCodeEnum.INVALID_DATA]: "Given data is invalid",
  [ErrorCodeEnum.PROVIDED_TEXT_FLAGGED]:
    "Provided description was classified as potentially harmful across several categories.",
};
