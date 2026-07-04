"use server";

import connectDB from "@/server/db";
import blogService from "@/server/modules/blog/blog.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  createBlogSchema,
  updateBlogSchema,
} from "@/validation/blog.validation";
import QueryString from "qs";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE PRODUCT       */
/* -------------------- */
export async function createBlog(body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(createBlogSchema, body);
    const blog = await blogService.create(data);

    return {
      message: `بلاگ ${blog.title} با موفقیت ایجاد شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET ALL PRODUCTS     */
/* -------------------- */
export async function getAllBlogs(query = {}) {
  try {
    await connectDB();

    const parsedQuery = QueryString.parse(query);
    const { blogs, total } = await blogService.getAll(parsedQuery);

    return {
      data: serialize({
        blogs,
        total,
        ...parsedQuery,
      }),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET PRODUCT DETAILS  */
/* -------------------- */
export async function getBlogDetails(filter = {}) {
  try {
    await connectDB();

    const blog = await blogService.getDetails(filter);

    return {
      data: serialize(blog),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* UPDATE PRODUCT       */
/* -------------------- */
export async function updateBlog(blogId, body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(updateBlogSchema, body);
    const blog = await blogService.update(data, blogId);

    return {
      message: `بلاگ ${blog.title} با موفقیت به‌روزرسانی شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* DELETE PRODUCT       */
/* -------------------- */
export async function deleteBlog(blogId) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const blog = await blogService.delete(blogId);

    return {
      message: `بلاگ ${blog.title} با موفقیت حذف شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}