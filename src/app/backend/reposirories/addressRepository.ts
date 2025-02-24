import { db } from "@/lib/db";
import { addresses, addresses as Addresss } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { CreateAddressDTO, UpdateAddressDTO, Address } from "../../types/addressType";

async function createAddress(data: CreateAddressDTO): Promise<Address> {
  const [Address] = await db
    .insert(Addresss)
    .values({ ...data })
    .returning();
  return Address;
}

async function updateAddress(data: UpdateAddressDTO): Promise<Address | undefined> {
  const [Address] = await db
    .update(Addresss)
    .set({ ...data })
    .where(eq(Addresss.user_id, data.user_id!))
    .returning();
  return Address;
}

async function deleteAddress(id: number): Promise<boolean> {
  const result = await db.delete(Addresss).where(eq(Addresss.id, id));
  // @ts-ignore
  return result.rowCount > 0;
}

async function getAddressByUserId(user_id: number): Promise<Address[]> {
  return await db.select().from(addresses).where(eq(addresses.user_id, user_id));
}

export const AddressRepository = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressByUserId,
};
