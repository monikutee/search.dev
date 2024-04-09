import { MoreThan } from "typeorm";
import { AppDB } from "../../../connection";
import { DataReset as DataResetType } from "../../../types/password-reset.type";
import { DataReset as DataResetEntity } from "./data-reset.entity";

export async function getValidResetById(id: string) {
  const DataResetRepository = AppDB.getRepository(DataResetEntity);
  return (
    (await DataResetRepository.findOne({
      where: {
        id,
        reseted: false,
        resetExpires: MoreThan(new Date()),
      },
    })) || undefined
  );
}

export async function createDataReset(DataReset: DataResetType) {
  const DataResetRepository = AppDB.getRepository(DataResetEntity);
  DataResetRepository.create({ ...DataReset, reseted: false });
  return await DataResetRepository.save(DataReset);
}

export async function finishDataReset(id: string) {
  const DataResetRepository = AppDB.getRepository(DataResetEntity);
  return await DataResetRepository.save({
    id,
    reseted: true,
  });
}

export default { getValidResetById, createDataReset, finishDataReset };
