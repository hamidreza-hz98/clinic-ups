"use client";

import { createProject, getProjectDetails, updateProject } from '@/app/actions/project';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import { purifyData } from '@/lib/request';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import Loader from '../common/Loader';
import PageContainer from '../common/PageContainer';
import ProjectForm from '../forms/ProjectForm';

const CreateOrEditProjectPageWrapper = () => {
   const searchParams = useSearchParams();
    const router = useRouter();
    const notifications = useNotifications();
  
    const _id = searchParams.get("_id");
    const [projectDetails, setProjectDetails] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const loadData = React.useCallback(async () => {
        if (!_id) return;
    
        try {
          setLoading(true);
          
          
          const { data } = await getProjectDetails({ _id });
    
          setProjectDetails(data);
        } catch (error) {
          notifications.show(error.message || "خطا در دریافت اطلاعات پروژه", {
            severity: "error",
            autoHideDuration: 3000,
          });
        } finally {
          setLoading(false);
        }
      }, [_id, notifications]);
    
      const handleCreateOrUpdateProject = async (project) => {
        try {
          const body = purifyData(project, [
            "brands",
            "categories",
            "media",
            "tags",
            "relatedProjects",
            "relatedProducts",
            "seo.ogImage",
            "seo.twitterImage",
          ]);
    
          const { message } = _id
            ? await updateProject(_id, body)
            : await createProject(body);
    
          notifications.show(message, {
            severity: "success",
            autoHideDuration: 3000,
          });
    
          router.push("/dashboard/projects");
        } catch (error) {
          notifications.show(error.message || "خطا در ثبت پروژه", {
            severity: "error",
            autoHideDuration: 3000,
          });
        }
      };
    
      React.useEffect(() => {
        loadData();
      }, [loadData]);
    

      if (_id && (loading || !projectDetails)) {
        return <Loader />;
      }

  return (
     <PageContainer
      title="مشخصات پروژه:"
      breadcrumbs={[
        { name: "کلینیک یو پی اس" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "پروژهات", path: "/dashboard/projects" },
        { name: _id ? "ویرایش پروژه" : "ساخت پروژه جدید" },
      ]}
    >
      <ProjectForm
        onSubmit={handleCreateOrUpdateProject}
        data={projectDetails}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  )
}

export default CreateOrEditProjectPageWrapper