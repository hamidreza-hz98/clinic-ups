import Link from "next/link";
import React from "react";
import { setImagePath } from "@/lib/landing/general";

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img
        src={setImagePath(project?.media?.[0]?.path)}
        alt={project?.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">
          {project?.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4">{project?.excerpt}</p>

        <div className="w-full flex items-center justify-end">
          <Link
            href={`/projects/${project.slug}`}
            className="px-4 py-1 bg-black text-xs text-white rounded-lg hover:bg-gray-800 transition"
          >
            جزئیات
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
