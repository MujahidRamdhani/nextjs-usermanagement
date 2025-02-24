import { userController } from "@/app/backend/controllers/userController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { firstname: string } }) {
  const result = await userController.getByFirstName(req, params.firstname);
  return result;
}
