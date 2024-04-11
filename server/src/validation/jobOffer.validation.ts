import joi from "joi";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";

// Assuming these are the main attributes of a job offer you want to validate
const titleSchema = joi.string().min(3).max(100).required().messages({
  "string.base": ERROR_CODES.WRONG_TITLE_BASE,
  "string.empty": ERROR_CODES.WRONG_TITLE_EMPTY,
  "string.min": ERROR_CODES.WRONG_TITLE_SHORT,
  "string.max": ERROR_CODES.WRONG_TITLE_LONG,
  "any.required": ERROR_CODES.WRONG_TITLE_UNDEFINED,
});

const descriptionSchema = joi.string().min(10).max(1000).required().messages({
  "string.base": ERROR_CODES.WRONG_DESCRIPTION_BASE,
  "string.empty": ERROR_CODES.WRONG_DESCRIPTION_EMPTY,
  "string.min": ERROR_CODES.WRONG_DESCRIPTION_SHORT,
  "string.max": ERROR_CODES.WRONG_DESCRIPTION_LONG,
  "any.required": ERROR_CODES.WRONG_DESCRIPTION_UNDEFINED,
});

const isActiveSchema = joi.boolean().required().messages({
  "boolean.base": ERROR_CODES.WRONG_ISACTIVE_BASE,
  "any.required": ERROR_CODES.WRONG_ISACTIVE_UNDEFINED,
});

const jobOfferSchema = joi.object({
  title: titleSchema,
  description: descriptionSchema,
  isActive: isActiveSchema,
  // Add additional fields as necessary
});

function handleJobOfferError(e: joi.ValidationError) {
  throw new AppErrors(
    e.details.length > 0
      ? (e.details[0]?.message as ERROR_CODES)
      : ERROR_CODES.VALIDATION_ERROR // Generic validation error code
  );
}

export async function validateJobOffer(jobOffer) {
  return await jobOfferSchema
    .validateAsync(jobOffer, { allowUnknown: true })
    .catch((e) => handleJobOfferError(e));
}
