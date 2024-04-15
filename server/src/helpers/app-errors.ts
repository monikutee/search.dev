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
  if (e.message.includes("duplicate key value violates unique constraint")) {
    const constraintName = e.message.match(/constraint "(.*?)"/)[1];

    if (constraintName === "IDX_e12875dfb3b1d92d7d7c5377e2") {
      e.code = ERROR_CODES.EMAIL_EXIST;
    } else {
      e.code = ERROR_CODES.RECORD_EXIST;
    }
  } else {
    e.message;
  }

  return res.status(e.statusCode || 400).json({
    error: {
      code:
        e.code && Object.values(ERROR_CODES).includes(e.code)
          ? e.code
          : ERROR_CODES.UNKNOWN,
      message: e.message,
      stack:
        process.env.NODE_ENV && DEBUG_ENV.includes(process.env.NODE_ENV)
          ? e.stack
          : undefined,
    },
  });
};
