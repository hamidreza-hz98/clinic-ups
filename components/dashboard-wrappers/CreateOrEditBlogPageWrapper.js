"use client";

import React from 'react'
import { createBlog, getBlogDetails, updateBlog } from '@/app/actions/blog';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import { purifyData } from '@/lib/request';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '../common/Loader';
import PageContainer from '../common/PageContainer';
import BlogForm from '../forms/BlogForm';

const CreateOrEditBlogPageWrapper = () => {
   const searchParams = useSearchParams();
      const router = useRouter();
      const notifications = useNotifications();
    
      const _id = searchParams.get("_id");
      const [blogDetails, setBlogDetails] = React.useState(null);
      const [loading, setLoading] = React.useState(false);


       const loadData = React.useCallback(async () => {
        if (!_id) return;
    
        try {
          setLoading(true);
          
          const { data } = await getBlogDetails({ _id });
    
          setBlogDetails(data);
        } catch (error) {
          notifications.show(error.message || "خطا در دریافت اطلاعات بلاگ", {
            severity: "error",
            autoHideDuration: 3000,
          });
        } finally {
          setLoading(false);
        }
      }, [_id, notifications]);
    
      const handleCreateOrUpdateBlog = async (blog) => {
        try {
          const body = purifyData(blog, [
            "categories",
            "thumbnail",
            "tags",
            "relatedBlogs",
            "relatedProducts",
            "seo.ogImage",
            "seo.twitterImage",
          ]);
    
          const { message } = _id
            ? await updateBlog(_id, body)
            : await createBlog(body);
    
          notifications.show(message, {
            severity: "success",
            autoHideDuration: 3000,
          });
    
          router.push("/dashboard/blog");
        } catch (error) {
          notifications.show(error.message || "خطا در ثبت بلاگ", {
            severity: "error",
            autoHideDuration: 3000,
          });
        }
      };
    
      React.useEffect(() => {
        loadData();
      }, [loadData]);
    

      if (_id && (loading || !blogDetails)) {
        return <Loader />;
      }
  return (
    <PageContainer
      title="مشخصات بلاگ:"
      breadcrumbs={[
        { name: "کلینیک یو پی اس" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "بلاگات", path: "/dashboard/blogs" },
        { name: _id ? "ویرایش بلاگ" : "ساخت بلاگ جدید" },
      ]}
    >
      <BlogForm
        onSubmit={handleCreateOrUpdateBlog}
        data={blogDetails}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  )
}

export default CreateOrEditBlogPageWrapper