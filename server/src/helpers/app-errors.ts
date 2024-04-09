import { ERROR_CODES } from "../types/errors.enum";
import { Response } from "express";

const DEBUG_ENV = ["production", "development"];

export class AppErrors extends Error {
  code: ERROR_CODES;
  statusCode?: number;

  constructor(
    code: ERROR_CODES | string,
    message?: string,
    statusCode?: number
  ) {
    super(message);
    this.code = code as ERROR_CODES;
    this.statusCode = statusCode;
  }
}

export const handleErrorResponse = (e: AppErrors, res: Response) => {
  if (process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)) {
    console.log(e.message, e.stack);
  }
  return res.status(e.statusCode || 400).json({
    error: {
      code:
        e.code && Object.values(ERROR_CODES).includes(e.code)
          ? e.code
          : ERROR_CODES.UNKNOWN,
      message:
        process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)
          ? e.message
          : undefined,
      stack:
        process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)
          ? e.stack
          : undefined,
    },
  });
};
