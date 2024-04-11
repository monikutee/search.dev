import { AppDB } from "../../../connection";
import { ApiDataDB as ApiDataType } from "../../../types/api-data.type";
import { ApiData as ApiDataEntity } from "./api-data.entity";
import { MoreThan } from "typeorm";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export async function getEndpointDayCallCountByIp(ip: string) {
  const apiRepository = AppDB.getRepository(ApiDataEntity);
  return await apiRepository.count({
    where: {
      ip,
      createdAt: MoreThan(new Date(Date.now() - DAY_IN_MS)),
    },
  });
}

export async function saveApiData(apiData: ApiDataType) {
  const apiRepository = AppDB.getRepository(ApiDataEntity);
  const newApiData = apiRepository.create(apiData);
  return await apiRepository.save(newApiData);
}
