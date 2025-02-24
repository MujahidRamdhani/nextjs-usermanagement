import { AddressRepository } from "../reposirories/addressRepository";
import { getUserByUserId, userRepository } from "../reposirories/userRepository";
import { UpdateDTO, CreateDTO } from "../../types/userType";
import { responseError } from "@/lib/utils/response";

async function create(data: CreateDTO) {
  const userPayload = {
    firstname: data.firstname,
    lastname: data.lastname,
    birthdate: data.birthdate,
  };

  let user = await userRepository.create(userPayload);

  if (!user) {
    throw responseError("Failed to create user", 409);
  }

  const addressPayload = {
    user_id: user.id,
    street: data.street,
    city: data.city,
    province: data.province,
    postal_code: data.postal_code,
  };

  let address = await AddressRepository.createAddress(addressPayload);
  let result = { ...user, ...address };
  return result;
}

async function getAll(page: number = 1, limit: number = 5) {
  return userRepository.getAll(page, limit);
}

async function getByFirstName(firstname: string, page: number, limit: number) {
  return userRepository.getByFirstName(firstname, page, limit);
}

async function update(id: number, data: UpdateDTO) {
  let cekUser = await getUserByUserId(id);

  if (!Array.isArray(cekUser) || cekUser.length === 0) {
    throw responseError("User not found", 404);
  }

  const userPayload = {
    firstname: data.firstname,
    lastname: data.lastname,
    birthdate: data.birthdate,
  };
  let user = await userRepository.update(id, userPayload);
  if (!user) {
    throw responseError("Update user failed", 404);
  }

  let cekAddress = await AddressRepository.getAddressByUserId(user.id);

  if (!cekAddress) {
    throw responseError("Update address failed", 404);
  }

  const addressPayload = {
    user_id: user.id,
    street: data.street,
    city: data.city,
    province: data.province,
    postal_code: data.postal_code,
  };
  let address = await AddressRepository.updateAddress(addressPayload);
  let result = { ...user, ...address };
  return result;
}

async function remove(id: number) {

  let cekUser = await getUserByUserId(id);
  if (!Array.isArray(cekUser) || cekUser.length === 0) {
    throw responseError("User tidak ditemukan", 404);
  }

  let userDeleted = await userRepository.remove(id);
  if (userDeleted) {
    await AddressRepository.deleteAddress(cekUser[0].id);
  } else {
    throw responseError("User tidak ditemukan", 404);
  }
  return;
}

async function getUserById(id: number) {
  return userRepository.getById(id);
}

export const userService = {
  create,
  getAll,
  getByFirstName,
  update,
  remove,
  getUserById,
};
