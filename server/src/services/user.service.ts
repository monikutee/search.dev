import bcrypt from "bcrypt";
import { User } from "../types/user.type";
import { validateEmail, validateUser } from "../validation/user.validation";
import { DataReset } from "../types/password-reset.type";
import typeormDatabase from "../database/typeorm";
import { AppErrors } from "../helpers/app-errors";
import { ERROR_CODES } from "../types/errors.enum";
import mailerService from "./mailer.service";

export const createUser =
  (
    dependencies = {
      upsertUser: typeormDatabase.userRepository.upsertUser,
    }
  ) =>
  async (email: string, password: string, name: string) => {
    const user: User = {
      email,
      password,
      name,
    };
    await validateUser(user);
    user.password = await bcrypt.hash(password, 10);
    const newUser = await dependencies.upsertUser(user);
    return newUser;
  };

export const editUser =
  (
    dependencies = {
      upsertUser: typeormDatabase.userRepository.upsertUser,
    }
  ) =>
  async (user: User) => {
    if (user.email) {
      await validateEmail(user.email);
    }
    const updatedUser = await dependencies.upsertUser(user);
    return updatedUser;
  };

export const getUserById =
  (
    dependencies = {
      getSingleUserById: typeormDatabase.userRepository.getSingleUserById,
    }
  ) =>
  async (id: string) => {
    const user = await dependencies.getSingleUserById(id);
    if (!user) {
      throw new AppErrors(ERROR_CODES.USER_MISSING);
    }
    return user;
  };

export const getUsersByIds =
  (
    dependencies = {
      getUsersByIds: typeormDatabase.userRepository.getUsersByIds,
    }
  ) =>
  async (ids: string[]) => {
    const user = await dependencies.getUsersByIds(ids);
    if (!user) {
      throw new AppErrors(ERROR_CODES.USER_MISSING);
    }
    return user;
  };

export const getUser =
  (
    dependencies = {
      getSingleUserByEmail: typeormDatabase.userRepository.getSingleUserByEmail,
    }
  ) =>
  async (email: string) => {
    const user = await dependencies.getSingleUserByEmail(email);
    if (!user) {
      throw new AppErrors(ERROR_CODES.USER_MISSING);
    }
    return user;
  };

export const getUserCompact =
  (
    dependencies = {
      getUser: getUser(),
    }
  ) =>
  async (data: string | User) => {
    let user;
    if (typeof data === "string") {
      user = await dependencies.getUser(data);
    } else {
      user = data;
    }
    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      country: user.country,
      city: user.city,
      createdAt: user.createdAt,
    };
  };

export const startPasswordReset =
  (
    dependencies = {
      createPasswordReset: typeormDatabase.dataResetRepository.createDataReset,
      getUser: getUser(),
      resetPassword: mailerService.resetPassword,
    }
  ) =>
  async (email: string | undefined) => {
    if (!email) {
      throw new AppErrors(ERROR_CODES.EMAIL_MISSING);
    }

    const user = await dependencies.getUser(email);

    if (!user) {
      throw new AppErrors(ERROR_CODES.USER_MISSING);
    }
    const passwordReset: DataReset = {
      userId: user.id,
      resetExpires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    };
    await dependencies.createPasswordReset(passwordReset);
    await dependencies.resetPassword(user.email, passwordReset.id as string);
  };

export const finishPasswordReset =
  (
    dependencies = {
      getValidResetById: typeormDatabase.dataResetRepository.getValidResetById,
      finishPasswordreset: typeormDatabase.dataResetRepository.finishDataReset,
      getSingleUserById: typeormDatabase.userRepository.getSingleUserById,
      upsertUser: typeormDatabase.userRepository.upsertUser,
    }
  ) =>
  async (id: string, newPassword: string) => {
    if (!id) {
      throw new AppErrors(ERROR_CODES.RESET_TOKEN_MISSING);
    }
    if (!newPassword) {
      throw new AppErrors(ERROR_CODES.RESET_PASSWORD_MISSING);
    }
    const passwordReset = await dependencies.getValidResetById(id);
    if (!passwordReset) {
      throw new AppErrors(ERROR_CODES.RESET_PASSWORD_NOT_FOUND);
    }
    const user = await dependencies.getSingleUserById(passwordReset.userId);
    if (!user) {
      throw new AppErrors(ERROR_CODES.USER_MISSING);
    }
    const isValid =
      new Date().getTime() < new Date(passwordReset.resetExpires).getTime();
    if (!isValid) {
      throw new AppErrors(ERROR_CODES.RESET_PASSWORD_EXPIRED);
    }
    await dependencies.finishPasswordreset(passwordReset.id);
    user.password = await bcrypt.hash(newPassword, 10);
    await dependencies.upsertUser(user);
  };

export default {
  createUser: createUser(),
  editUser: editUser(),
  getUser: getUser(),
  getUserById: getUserById(),
  getUsersByIds: getUsersByIds(),
  getUserCompact: getUserCompact(),
  startPasswordReset: startPasswordReset(),
  finishPasswordReset: finishPasswordReset(),
};
