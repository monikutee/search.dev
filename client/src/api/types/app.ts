import { AxiosResponse } from "axios";

export interface HttpError {
  message: string;
  response: any;
  status: number;
}
