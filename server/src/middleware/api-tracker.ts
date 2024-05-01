import { Request, Response } from "express";
import { ApiData, ApiDataDB } from "../types/api-data.type";
import onFinished from "on-finished";
import typeormDatabase from "../database/typeorm";

interface PreCallbackOptions {
  trackRequestData?: boolean;
  trackIp?: boolean;
  trackHeaders?: boolean;
  limitRateForIp?: {
    limit: number;
  };
}

interface PostCallbackOptions {
  trackResponseData?: boolean;
}

interface TrackerOptions {
  preCallback: PreCallbackOptions;
  postCallback?: PostCallbackOptions;
}

interface OptionFunctionContext {
  body?: any;
  req?: Request;
  res?: Response;
}

const DEFAULT_OPTIONS: TrackerOptions = {
  preCallback: {
    trackIp: true,
    trackRequestData: false,
    trackHeaders: false,
    limitRateForIp: undefined,
  },
  postCallback: {
    trackResponseData: false,
  },
};

export function hookApiTracker(
  dependencies = {
    getEndpointDayCallCountByIp:
      typeormDatabase.ApiDataRepository.getEndpointDayCallCountByIp,
    saveApiData: typeormDatabase.ApiDataRepository.saveApiData,
  }
) {
  const OPTION_CALLS = {
    trackRequestData: getRequestData,
    trackIp: getIp,
    trackHeaders: getHeaders,
    limitRateForIp: checkIpRateLimitCount,
    trackResponseData: getResponseData,
  } as {
    [key: string]: (
      context: OptionFunctionContext
    ) => ApiData | Promise<ApiData>;
  };

  function getRequestData(context: OptionFunctionContext): ApiData {
    return { requestBody: context.req?.body };
  }

  function getResponseData(context: OptionFunctionContext): ApiData {
    return { responseBody: context.res?.locals.body };
  }

  function getIp(context: OptionFunctionContext): ApiData {
    return {
      ip: (context.req?.headers["x-forwarded-for"] ||
        context.req?.socket.remoteAddress) as string,
    };
  }

  function getHeaders(context: OptionFunctionContext): ApiData {
    return { headers: context.req?.headers };
  }

  function getEndpoint(context: OptionFunctionContext): ApiData {
    return { endpoint: context.req?.url };
  }

  function getMethod(context: OptionFunctionContext): ApiData {
    return { method: context.req?.method };
  }

  function getStatus(context: OptionFunctionContext): ApiData {
    return { status: context.res?.statusCode };
  }

  async function checkIpRateLimitCount(context: OptionFunctionContext) {
    const limit = context.body.limit;
    const ip = getIp(context).ip;
    if (!ip) {
      return {
        stopRequest: true,
        error: "Unable to get ip",
        status: 400,
      };
    }
    const count = await dependencies.getEndpointDayCallCountByIp(ip);
    if (count > limit) {
      return {
        stopRequest: true,
        error: `Call limit of ${limit} was reached`,
        status: 429,
      };
    }
    return {};
  }

  async function callOptionFunctions(
    req: Request,
    res: Response,
    optionObject: PreCallbackOptions | PostCallbackOptions | undefined
  ) {
    if (!optionObject) {
      return {};
    }
    let apiData = {};
    for (const [optionName, optionBody] of Object.entries(optionObject)) {
      if (!optionBody) {
        continue;
      }
      apiData = {
        ...apiData,
        ...(await OPTION_CALLS[optionName]({
          body: optionBody,
          req,
          res,
        })),
      };
    }
    return apiData;
  }

  function endRequest(res: Response, apiData: ApiData) {
    res.status(apiData.status || 400).json(apiData.error);
  }

  function checkForRequired(apiData: ApiData) {
    if (!apiData.endpoint || !apiData.method || !apiData.status) {
      return {
        ...apiData,
        stopRequest: true,
        error: "Something went wrong",
        status: 400,
      };
    }
    return apiData;
  }

  const hookApiTracker = async (
    req: Request,
    res: Response,
    next: (req: Request, res: Response) => Promise<Response>,
    options: TrackerOptions = DEFAULT_OPTIONS
  ) => {
    let apiData = {
      ...getEndpoint({ req }),
      ...getMethod({ req }),
      stopRequest: false,
    } as ApiData;
    apiData = {
      ...apiData,
      ...(await callOptionFunctions(req, res, options?.preCallback)),
    };
    const oldJson = res.json;
    res.json = (body) => {
      res.locals.body = body;
      return oldJson.call(res, body);
    };
    if (apiData.stopRequest) {
      endRequest(res, apiData);
    } else {
      next(req, res);
      apiData = await new Promise((resolve) => {
        onFinished(res, async function (err, res) {
          apiData = {
            ...apiData,
            ...(await callOptionFunctions(req, res, options?.postCallback)),
            ...getStatus({ res }),
          };
          resolve(apiData);
        });
      });
    }
    apiData = checkForRequired(apiData);
    if (apiData.stopRequest) {
      endRequest(res, apiData);
    }
    dependencies.saveApiData(apiData as ApiDataDB);
  };

  return hookApiTracker;
}
export default hookApiTracker();
