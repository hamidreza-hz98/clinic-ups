"use server";

import connectDB from "@/server/db";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import adminService from "@/server/modules/admin/admin.service";
import { adminLoginValidationSchema, adminValidationSchema } from "@/validation/admin.validation";
import { cookies } from "next/headers";

export async function loginAdmin(body) {
  await connectDB();

  const data = await validate(adminLoginValidationSchema, body);

  const { admin, token } = await adminService.login(data);

  const cookieStore = await cookies();

  cookieStore.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("_id", admin._id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function createAdmin(body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(adminValidationSchema, body);

    const admin = await adminService.create(data);

    return {
      message: `ادمین ${admin.username} ساخته شد.`,
      data: admin,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
