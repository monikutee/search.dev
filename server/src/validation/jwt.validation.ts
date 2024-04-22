import joi from "joi";
import { JwtPayload } from "jsonwebtoken";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";

const schema = joi
  .object({
    exp: joi
      .number()
      .required()
      .min(Date.now() / 1000)
      .messages({
        "number.base": `Expiration should be a type of number`,
        "number.empty": `Expiration missing`,
        "number.max": `User login time expired`,
        "any.required": `Expiration missing`,
      }),
  })
  .required()
  .messages({
    "any.required": `JWT token missing`,
  });

function handleError(e: joi.ValidationError) {
  throw new AppErrors(
    e.details.length > 0
      ? (e.details[0]?.message as ERROR_CODES)
      : ERROR_CODES.INVALID_TOKEN
  );
}

export async function validateJwt(jwt: JwtPayload | undefined) {
  return await schema
    .validateAsync(jwt, { allowUnknown: true })
    .catch(handleError);
}
