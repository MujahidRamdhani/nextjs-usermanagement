import { NextResponse } from "next/server";
import { responseSuccess, responseError } from "../../../lib/utils/response";
import { userService } from "../services/userService";

async function create(req: Request) {
  try {
    const data = await req.json();
    const user = await userService.create(data);
    return responseSuccess(user, "User created successfully");
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return responseError((error as Error).message || "Failed to create user");
  }
}

async function getAll(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    const users = await userService.getAll(page, limit);
    return responseSuccess(users, "Users fetched successfully");
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return responseError((error as Error).message || "Failed to fetch users");
  }
}

async function getByFirstName(req: Request, context: { params: Promise<{ firstname: string }> }) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    const params = await context.params;
    const firstname = params.firstname;
    if (!firstname) {
      throw new Error("Firstname is required");
    }

    const user = await userService.getByFirstName(firstname, page, limit);
    return responseSuccess(user, "User fetched successfully");
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return responseError((error as Error).message || "Failed to update user");
  }
}

async function update(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const data = await req.json();
    const { id } = await context.params;
    const user_id = Number(id);
    const user = await userService.update(user_id, data);
    return responseSuccess(user, "User updated successfully");
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return responseError((error as Error).message || "Failed to update user");
  }
}

async function remove(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;
    if (!id) {
      throw new Error("id is required");
    }
    const user_id = Number(id);
  
    const result = await userService.remove(user_id);
    return responseSuccess(result, "User deleted successfully");
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return responseError((error as Error).message || "Failed to delete user");
  }
}


async function getUserById(context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;
    if (!id) {
      throw new Error("id is required");
    }

    const user = await userService.getUserById(Number(id));
    return responseSuccess(user, "User fetched successfully");
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    return responseError((error as Error).message || "Failed to update user");
  }
}

export const userController = {
  create,
  getAll,
  getByFirstName,
  update,
  remove,
  getUserById,
};
