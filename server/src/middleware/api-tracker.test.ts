import { getMockReq, getMockRes } from "@jest-mock/express";
import { hookApiTracker } from "./api-tracker";
import { ApiDataDB } from "../types/api-data.type";

describe("Api Tracker", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const res200status = getMockRes().res;
  res200status.status = jest.fn().mockImplementation((status: number) => {
    res200status.statusCode = status;
    return res200status;
  });
  const next200status = jest.fn().mockImplementation((req, res) => {
    res200status.status(200).json({ test: true });
    return res200status;
  });

  const req = getMockReq({
    url: "test",
    method: "get",
    body: { test: "test" },
    headers: { testHeader: "header" },
    socket: { remoteAddress: "127.0.0.1" },
  });

  const reqNoMethod = getMockReq({
    url: "test",
    body: { test: "test" },
    headers: { testHeader: "header" },
    socket: { remoteAddress: "127.0.0.1" },
  });

  const reqNoIp = getMockReq({
    url: "test",
    method: "get",
    body: { test: "test" },
    headers: { testHeader: "header" },
  });

  const DB_CALLS = {
    getEndpointDayCallCountByIp: jest
      .fn()
      .mockImplementation(async (ip: string) => {
        return 5;
      }),
    saveApiData: jest.fn().mockImplementation(async (apiData: ApiDataDB) => ({
      id: "test",
      endpoint: apiData.endpoint,
      method: apiData.method,
      status: apiData.status,
    })),
  };

  const hookApiTrackerExc = hookApiTracker(DB_CALLS);

  it("test default data tracking", async () => {
    await hookApiTrackerExc(req, res200status, next200status);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 200,
      })
    );
  });

  it("test tracking with missing default method field", async () => {
    await hookApiTrackerExc(reqNoMethod, res200status, next200status);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "",
        stopRequest: true,
        error: "Something went wrong",
        status: 400,
      })
    );
  });

  it("test ip tracking", async () => {
    const options = {
      preCallback: {
        trackIp: true,
      },
      postCallback: {},
    };
    await hookApiTrackerExc(req, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 200,
        ip: "127.0.0.1",
      })
    );
  });

  it("test request data tracking", async () => {
    const options = {
      preCallback: {
        trackRequestData: true,
      },
      postCallback: {},
    };
    await hookApiTrackerExc(req, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 200,
        requestBody: { test: "test" },
      })
    );
  });

  it("test headers tracking", async () => {
    const options = {
      preCallback: {
        trackHeaders: true,
      },
      postCallback: {},
    };
    await hookApiTrackerExc(req, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 200,
        headers: { testHeader: "header" },
      })
    );
  });

  it("test response data tracking", async () => {
    const options = {
      preCallback: {},
      postCallback: {
        trackResponseData: true,
      },
    };
    await hookApiTrackerExc(req, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 200,
        responseBody: { test: true },
      })
    );
  });

  it("test ip limit, no ip", async () => {
    const options = {
      preCallback: {
        limitRateForIp: { limit: 5 },
      },
      postCallback: {},
    };
    await hookApiTrackerExc(reqNoIp, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 400,
        stopRequest: true,
        error: "Unable to get ip",
      })
    );
  });

  it("test ip limit, ip limit reached", async () => {
    const options = {
      preCallback: {
        limitRateForIp: { limit: 4 },
      },
      postCallback: {},
    };
    await hookApiTrackerExc(req, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        stopRequest: true,
        error: `Call limit of 4 was reached`,
        status: 429,
      })
    );
  });

  it("test ip limit, ip limit fine", async () => {
    const options = {
      preCallback: {
        limitRateForIp: { limit: 6 },
      },
      postCallback: {},
    };
    await hookApiTrackerExc(req, res200status, next200status, options);
    expect(DB_CALLS.saveApiData).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "test",
        method: "get",
        status: 200,
      })
    );
  });
});
