"use server";

import connectDB from "@/server/db";
import projectService from "@/server/modules/project/project.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/validation/project.validation";
import QueryString from "qs";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE PRODUCT       */
/* -------------------- */
export async function createProject(body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(createProjectSchema, body);
    const project = await projectService.create(data);

    return {
      message: `پروژه ${project.title} با موفقیت ایجاد شد.`,
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
export async function getAllProjects(query = {}) {
  try {
    await connectDB();

    const parsedQuery = QueryString.parse(query);
    const { projects, total } = await projectService.getAll(parsedQuery);

    return {
      data: serialize({
        projects,
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
export async function getProjectDetails(filter = {}) {
  try {
    await connectDB();

    const project = await projectService.getDetails(filter);

    return {
      data: serialize(project),
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
export async function updateProject(projectId, body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(updateProjectSchema, body);
    const project = await projectService.update(data, projectId);

    return {
      message: `پروژه ${project.title} با موفقیت به‌روزرسانی شد.`,
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
export async function deleteProject(projectId) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const project = await projectService.delete(projectId);

    return {
      message: `پروژه ${project.title} با موفقیت حذف شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}