"use client";

import { deleteBlog, getAllBlogs } from "@/app/actions/blog";
import { blogColumns } from "@/constants/columns";
import { transformGridQuery } from "@/lib/request";
import React from "react";
import Overview from "../common/Overview";

const DashboardBlogPageWrapper = () => {
  const getBlogs = async (params) => {
    const query = transformGridQuery({ ...params });

    const { data } = await getAllBlogs(query);

    return {
      items: data.blogs,
      rowCount: data.total,
    };
  };

  const handleDeleteBlog = async (_id) => {
    const { message } = await deleteBlog(_id);

    return { success: true, message };
  };
  return (
    <div>
      <Overview
        title="مدیریت وبلاگ"
        breadcrumbs={[
          { name: "کلینیک یو پی اس" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "وبلاگ" },
        ]}
        columns={blogColumns}
        getMany={getBlogs}
        deleteOne={handleDeleteBlog}
      />
    </div>
  );
};

export default DashboardBlogPageWrapper;
