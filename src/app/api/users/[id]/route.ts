import { userController } from "@/app/backend/controllers/userController";
import { responseError } from "@/lib/utils/response";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Context) {
  const { id } = params;

  if (!id) {
    return responseError("User ID is required", 400);
  }

  const result = await userController.getUserById(id);
  return result;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  if (!id) {
    return responseError("User ID is required", 400);
  }
  const updatedUser = await userController.update(req, id);
  return updatedUser;
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = params;
  if (!id) {
    return responseError("User ID is required", 400);
  }

  const result = await userController.remove(req, id);
  return result;
}
