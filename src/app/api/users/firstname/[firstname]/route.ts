import { userController } from "@/app/backend/controllers/userController";

export async function GET(req: Request, context: { params: Promise<{ firstname: string }> }) {
  return userController.getByFirstName(req, context);
}
