import joi from "joi";
import { JwtPayload } from "jsonwebtoken";

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

export async function validateJwt(jwt: JwtPayload | undefined) {
  return await schema.validateAsync(jwt, { allowUnknown: true });
}
