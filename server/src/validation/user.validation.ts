import joi from "joi";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import { User } from "../types/user.type";

const emailShema = joi
  .string()
  .pattern(
    new RegExp("^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$")
  )
  .required()
  .messages({
    "string.base": ERROR_CODES.WRONG_EMAIL_BASE,
    "string.empty": ERROR_CODES.WRONG_EMAIL_EMPTY,
    "string.pattern.base": ERROR_CODES.WRONG_EMAIL_FORMAT,
    "any.required": ERROR_CODES.WRONG_EMAIL_UNDEFINED,
  });

const passwordShema = joi
  .string()
  .pattern(
    new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
  )
  .required()
  .min(5)
  .max(60)
  .messages({
    "string.base": ERROR_CODES.WRONG_PASSWORD_BASE,
    "string.empty": ERROR_CODES.WRONG_PASSWORD_EMPTY,
    "string.pattern.base": ERROR_CODES.WRONG_PASSWORD_PATTERN,
    "string.min": ERROR_CODES.WRONG_PASSWORD_SHORT,
    "string.max": ERROR_CODES.WRONG_PASSWORD_LONG,
    "any.required": ERROR_CODES.WRONG_PASSWORD_UNDEFINED,
  });

const schema = joi.object({
  email: emailShema,
  password: passwordShema,
});

function handleError(e: joi.ValidationError) {
  throw new AppErrors(
    e.details.length > 0
      ? (e.details[0]?.message as ERROR_CODES)
      : ERROR_CODES.WRONG_EMAIL
  );
}

export async function validateUser(user: User) {
  return await schema
    .validateAsync(user, { allowUnknown: true })
    .catch(handleError);
}

export async function validateEmail(email: string) {
  return await emailShema.validateAsync(email).catch(handleError);
}

export async function validatePassword(password: string) {
  return await passwordShema.validateAsync(password).catch(handleError);
}
