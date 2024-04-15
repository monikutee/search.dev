import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";
import { Subject } from "rxjs";
import { HttpError } from "./types/app";

export type CustomAxiosError = AxiosError & {
  status: number | null;
};

type RequestConfig = AxiosRequestConfig & {
  ignoreException?: boolean;
};

export type RequestUrl = {
  url: string;
  protected: boolean;
};

type RequestInterface = <T = any, R = AxiosResponse<T>>(
  url: RequestUrl,
  data?: any,
  config?: RequestConfig | undefined
) => Promise<R>;

class Http {
  axios: AxiosInstance;

  post: RequestInterface;

  get: RequestInterface;

  put: RequestInterface;

  delete: RequestInterface;

  baseUrl = process.env.REACT_APP_BASE_URL;

  session: Subject<Date>;

  constructor() {
    this.session = new Subject<Date>();

    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Expose-Headers": "Access-Control-*",
      "Access-Control-Allow-Headers":
        "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
      "Access-Control-Allow-Origin": "*",
      Allow: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
      crossdomain: true,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    this.axios = axios.create({
      withCredentials: true,
      headers: defaultHeaders,
    });

    this.post = (url, data, config) => {
      return this.axios.post(url.url, data, config as AxiosRequestConfig);
    };

    this.get = (url, config) => {
      return this.axios.get(url.url, config as AxiosRequestConfig);
    };

    this.put = (url, data, config) => {
      return this.axios.put(url.url, data, config as AxiosRequestConfig);
    };

    this.delete = (url, data, config) => {
      return this.axios.delete(url.url, config as AxiosRequestConfig);
    };

    this.axios.interceptors.response.use((response: AxiosResponse) => {
      return response;
    }, this.errorInterceptor);
  }

  errorInterceptor = async (
    error: AxiosError
  ): Promise<CustomAxiosError | any> => {
    const status = error.response?.status || null;
    const data =
      error?.response?.data instanceof Blob
        ? JSON.parse(await error.response.data.text())
        : error?.response?.data;

    const httpError: HttpError = {
      message: error.message,
      response: data || {},
      status: error?.response?.status || 500,
    };

    error.response = data || {};

    return Promise.reject({
      ...error,
      status: status,
      definedMessage: httpError.response.error.code,
    });
  };
}

export default Http;
