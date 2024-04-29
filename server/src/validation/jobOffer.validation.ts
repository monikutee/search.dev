import joi from "joi";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import { AnswerTypeEnum, CodeLanguageEnum } from "../types/jobOffer.type";

// Assuming these are the main attributes of a job offer you want to validate
const titleSchema = joi.string().min(3).max(100).required().messages({
  "string.base": ERROR_CODES.WRONG_TITLE_BASE,
  "string.empty": ERROR_CODES.WRONG_TITLE_EMPTY,
  "string.min": ERROR_CODES.WRONG_TITLE_SHORT,
  "string.max": ERROR_CODES.WRONG_TITLE_LONG,
  "any.required": ERROR_CODES.WRONG_TITLE_UNDEFINED,
});

const descriptionSchema = joi.string().min(10).max(5000).required().messages({
  "string.base": ERROR_CODES.WRONG_DESCRIPTION_BASE,
  "string.empty": ERROR_CODES.WRONG_DESCRIPTION_EMPTY,
  "string.min": ERROR_CODES.WRONG_DESCRIPTION_SHORT,
  "string.max": ERROR_CODES.WRONG_DESCRIPTION_LONG,
  "any.required": ERROR_CODES.WRONG_DESCRIPTION_UNDEFINED,
});

const isActiveSchema = joi.boolean().required().messages({
  "boolean.base": ERROR_CODES.WRONG_IS_ACTIVE_BASE,
  "any.required": ERROR_CODES.WRONG_IS_ACTIVE_UNDEFINED,
});

const choiceSchema = joi.object({
  choiceText: joi.string().required(),
  isCorrect: joi.boolean().required(),
});

const questionsSchema = joi
  .array()
  .min(1)
  .items(
    joi.object({
      questionText: joi.string().required(),
      questionType: joi.string().required(),
      questionChoices: joi.alternatives().conditional("questionType", {
        is: AnswerTypeEnum.MULTI,
        then: joi
          .array()
          .min(2)
          .items(choiceSchema)
          .required()
          .has(
            joi
              .object({
                isCorrect: joi.boolean().valid(true),
              })
              .required()
          )
          .message(ERROR_CODES.CHOICE_MUST),
        otherwise: joi.array().sparse(),
      }),
      codeLanguage: joi.alternatives().conditional("questionType", {
        is: AnswerTypeEnum.CODE,
        then: joi
          .string()
          .valid(...Object.values(CodeLanguageEnum))
          .required()
          .messages({
            "string.empty": ERROR_CODES.INVALID_DATA,
            "any.required": ERROR_CODES.FIELD_REQUIRED,
            "any.only": ERROR_CODES.INVALID_DATA,
          }),
        otherwise: joi.allow(null),
      }),
    })
  );

const quizSchema = joi.object({
  title: joi.string().required(),
  questions: questionsSchema,
});

const jobOfferSchema = joi.object({
  title: titleSchema,
  description: descriptionSchema,
  isActive: isActiveSchema,
  city: joi.string().required().messages({
    "string.empty": ERROR_CODES.INVALID_STRING_BASE,
    "any.required": ERROR_CODES.FIELD_REQUIRED,
  }),
  country: joi.string().required().messages({
    "string.empty": ERROR_CODES.INVALID_STRING_BASE,
    "any.required": ERROR_CODES.FIELD_REQUIRED,
  }),
  jobType: joi.string().required().messages({
    "string.empty": ERROR_CODES.INVALID_STRING_BASE,
    "any.required": ERROR_CODES.FIELD_REQUIRED,
  }),
  remote: joi.string().required().messages({
    "string.empty": ERROR_CODES.INVALID_STRING_BASE,
    "any.required": ERROR_CODES.FIELD_REQUIRED,
  }),
  experienceLevel: joi.string().required().messages({
    "string.empty": ERROR_CODES.INVALID_STRING_BASE,
    "any.required": ERROR_CODES.FIELD_REQUIRED,
  }),
  role: joi.string().required().messages({
    "string.empty": ERROR_CODES.INVALID_STRING_BASE,
    "any.required": ERROR_CODES.FIELD_REQUIRED,
  }),
  benefits: joi.array().items(joi.string()),
  commitments: joi.array().items(joi.string()),
  quizzes: joi.array().items(quizSchema),
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
    .catch(handleJobOfferError);
}
