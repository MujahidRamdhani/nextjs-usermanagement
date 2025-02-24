import { userController } from "@/app/backend/controllers/userController";

export async function GET(context: { params: Promise<{ id: string }> }) {
  return userController.getUserById(context);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  return userController.update(req, context);
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  return userController.remove(req, context);
}
