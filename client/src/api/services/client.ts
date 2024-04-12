import Http, { RequestUrl } from '../http';

class Client {
  protected http: Http;

  protected api: { [key: string]: RequestUrl };

  constructor(http: Http) {
    this.http = http;
    this.api = {};
  }

  buildUrl = (requestUrl: RequestUrl, params: { [key: string]: string | number }): RequestUrl => {
    let url = requestUrl.url;
    for (const key in params) {
      const value = params[key];
      url = url.replace('{' + key + '}', value.toString());
    }

    return {
      ...requestUrl,
      url: url,
    };
  };

  protectedUrl = (url: string): RequestUrl => ({
    url: url,
    protected: true,
  });

  defaultUrl = (url: string): RequestUrl => ({
    url: url,
    protected: false,
  });
}

export default Client;
