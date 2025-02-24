import { userController } from "@/app/backend/controllers/userController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const result = await userController.getAll(req);
  return result;
}

export async function POST(req: NextRequest) {
  const result = await userController.create(req);
  return result;
}
