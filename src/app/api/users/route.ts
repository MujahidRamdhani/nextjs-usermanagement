import { userController } from "@/app/backend/controllers/userController";

export async function GET(req: Request) {
  return userController.getAll(req);
}

export async function POST(req: Request) {
  return userController.create(req);
}
