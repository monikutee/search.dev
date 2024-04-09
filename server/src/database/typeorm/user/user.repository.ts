import { In } from "typeorm";
import { AppDB } from "../../../connection";
import { User as UserType } from "../../../types/user.type";
import { User as UserEntity } from "./user.entity";

export async function getSingleUserByEmail(email: string) {
  const userRepository = AppDB.getRepository(UserEntity);
  return (
    (await userRepository.findOne({
      where: { email },
    })) || undefined
  );
}

export async function getSingleUserById(id: string) {
  const userRepository = AppDB.getRepository(UserEntity);
  return (
    (await userRepository.findOne({
      where: { id },
    })) || undefined
  );
}

export async function getUsersByIds(ids: string[]) {
  const userRepository = AppDB.getRepository(UserEntity);
  return (
    (await userRepository.find({
      where: { id: In(ids) },
    })) || undefined
  );
}

export async function upsertUser(user: UserType) {
  const userRepository = AppDB.getRepository(UserEntity);
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
}
export default {
  getSingleUserByEmail,
  getSingleUserById,
  upsertUser,
  getUsersByIds,
};
