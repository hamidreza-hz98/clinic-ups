"use client";

import { deleteProject, getAllProjects } from "@/app/actions/project";
import { transformGridQuery } from "@/lib/request";
import React from "react";
import Overview from "../common/Overview";
import { projectColumns } from "@/constants/columns";

const DashboardProjectsPageWrapper = () => {
  const getProjects = async (params) => {
    const query = transformGridQuery({ ...params });

    const { data } = await getAllProjects(query);

    return {
      items: data.projects,
      rowCount: data.total,
    };
  };

  const handleDeleteProject = async (_id) => {
    const { message } = await deleteProject(_id);

    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="مدیریت پروژه ها"
        breadcrumbs={[
          { name: "کلینیک یو پی اس" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "پروژه ها" },
        ]}
        columns={projectColumns}
        getMany={getProjects}
        deleteOne={handleDeleteProject}
      />
    </div>
  );
};

export default DashboardProjectsPageWrapper;
