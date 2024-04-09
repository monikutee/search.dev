import joi from "joi";
import { JwtPayload } from "jsonwebtoken";

const schema = joi
  .object({
    POSTGRES_DB: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.number().required(),

    PGADMIN_EMAIL: joi.string().required(),
    PGADMIN_PASSWORD: joi.string().required(),
    PGADMIN_PORT: joi.string().required(),

    API_ROOT: joi.string().required(),

    ACCESS_TOKEN_SECRET: joi.string().required(),
  })
  .required()
  .messages({
    "any.required": `env is missing`,
  });

export async function validateEnv(env: JwtPayload | undefined) {
  return await schema.validateAsync(env, { allowUnknown: true });
}
