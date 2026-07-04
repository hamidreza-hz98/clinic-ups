"use client"

import { deleteCategory, getAllCategories } from '@/app/actions/category';
import { transformGridQuery } from '@/lib/request';
import React from 'react'
import Overview from '../common/Overview';
import { categoryColumns } from '@/constants/columns';
import CategoryForm from '../forms/CategoryForm';

const DashboardCategoriesPageWrapper = () => {
   const getCategories = async (params) => {
        const query = transformGridQuery({ ...params });
    
        const { data } = await getAllCategories(query);
        
        return {
          items: data.categories,
          rowCount: data.total,
        };
      };
    
       const handleDeletecategory = async (_id) => {
        const { message } = await deleteCategory(_id);
    
        return { success: true, message };
      };

  return (
     <div>
         <Overview
           title="مدیریت دسته بندی ها"
           breadcrumbs={[
             { name: "کلینیک یو پی اس" },
             { name: "داشبورد", path: "/dashboard" },
             { name: "دسته بندی ها" },
           ]}
           columns={categoryColumns}
           getMany={getCategories}
           deleteOne={handleDeletecategory}
           formMode="drawer"
           FormComponent={CategoryForm}
         />
       </div>
  )
}

export default DashboardCategoriesPageWrapper