// utils/response.ts
import { NextResponse } from "next/server";

export function responseSuccess<T>(data: T, message: string, status: number = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function responseError(message: string, status: number = 500) {
  return NextResponse.json({ success: false, message }, { status });
}
