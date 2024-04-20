import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";

export function getAccessToken(id: string, email: string) {
  const accessToken = jwt.sign(
    { email, userId: id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "2h",
    }
  );
  return accessToken;
}

export function verifyAccessToken(jwtString: string) {
  const verify = jwt.verify(
    jwtString,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
  return verify;
}

export function convertToSnakeCase(value: string) {
  return value
    .replace(/\.?([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
}

export function axiosRequests(url: string, port: string) {
  function combineParams(params?: { [key: string]: string }) {
    if (!params) {
      return "";
    }
    let paramString = "";
    for (const [key, value] of Object.entries(params)) {
      if (paramString === "") {
        paramString += "?";
      } else {
        paramString += "&";
      }
      paramString += `${key}=${value}`;
    }
    return paramString;
  }

  function axiosGet(
    endpoint: string,
    params?: { [key: string]: string },
    headers?: { [key: string]: string }
  ) {
    return axios.get(
      `${url}:${port}${endpoint}${combineParams(params)}`,
      headers
    );
  }

  function axiosPost(
    endpoint: string,
    body?: any,
    params?: { [key: string]: string },
    headers?: { [key: string]: string }
  ) {
    return axios.post(
      `${url}:${port}${endpoint}${combineParams(params)}`,
      body,
      headers
    );
  }

  return {
    axiosGet,
    axiosPost,
  };
}
