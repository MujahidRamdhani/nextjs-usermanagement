import { db } from "@/lib/db";
import { users, addresses as address } from "@/lib/schema";
import { eq, ilike, sql } from "drizzle-orm";
import { CreateUserDTO, getAllUsersResponse, UpdateUserDTO, User } from "../../types/userType";

async function create(data: CreateUserDTO): Promise<User> {
  const [user] = await db
    .insert(users)
    .values({ ...data, birthdate: new Date(data.birthdate) })
    .returning();
  return user;
}

async function getAll(page: number = 1, limit: number = 5): Promise<getAllUsersResponse> {
  const offset = (page - 1) * limit;
  const [totalUsers, user] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .innerJoin(address, eq(users.id, address.user_id)),

    db
      .select({
        id: users.id,
        firstname: users.firstname,
        lastname: users.lastname,
        birthdate: users.birthdate,
        street: address.street,
        city: address.city,
        province: address.province,
        postal_code: address.postal_code,
      })
      .from(users)
      .innerJoin(address, eq(users.id, address.user_id))
      .limit(limit)
      .offset(offset),
  ]);

  let result = {
    page,
    limit,
    totalUsers: Number(totalUsers[0]?.count) || 0,
    totalPages: Math.ceil((totalUsers[0]?.count || 0) / limit),
    users: user,
  };

  return result;
}

async function getByFirstName(firstname: string, page: number = 1, limit: number = 5) {
  const offset = (page - 1) * limit;

  const [totalUsers, user] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .leftJoin(address, eq(users.id, address.user_id))
      .where(ilike(users.firstname, `%${firstname}%`)),

    db
      .select({
        id: users.id,
        firstname: users.firstname,
        lastname: users.lastname,
        birthdate: users.birthdate,
        street: address.street,
        city: address.city,
        province: address.province,
        postal_code: address.postal_code,
      })
      .from(users)
      .leftJoin(address, eq(users.id, address.user_id))
      .where(ilike(users.firstname, `%${firstname}%`))
      .limit(limit)
      .offset(offset),
  ]);
  let result = {
    page,
    limit,
    totalUsers: Number(totalUsers[0]?.count) || 0,
    totalPages: Math.ceil((totalUsers[0]?.count || 0) / limit),
    users: user,
  };
  return result;
}

async function getById(id: number) {
  const user = await db
    .select({
      id: users.id,
      firstname: users.firstname,
      lastname: users.lastname,
      birthdate: users.birthdate,
      street: address.street,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
    })
    .from(users)
    .leftJoin(address, eq(users.id, address.user_id))
    .where(eq(users.id, id));

  return user;
}

async function update(id: number, data: UpdateUserDTO): Promise<User | undefined> {
  const [user] = await db
    .update(users)
    .set({
      ...data,
      birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
    })
    .where(eq(users.id, id))
    .returning();
  return user;
}

async function remove(id: number): Promise<boolean> {
  const result = await db.delete(users).where(eq(users.id, id));
  // @ts-ignore
  return result;
}

export async function getUserByUserId(id: number): Promise<User[]> {
  return await db.select().from(users).where(eq(users.id, id));
}

export const userRepository = {
  create,
  getAll,
  getByFirstName,
  update,
  remove,
  getById,
  getUserByUserId,
};
