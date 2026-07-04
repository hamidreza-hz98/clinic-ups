"use client"

import { deleteBrand, getAllBrands } from '@/app/actions/brand';
import { transformGridQuery } from '@/lib/request';
import React from 'react'
import Overview from '../common/Overview';
import { brandColumns } from '@/constants/columns';
import BrandForm from '../forms/BrandForm';

const DashboardBrandsPageWrapper = () => {
  const getBrands = async (params) => {
      const query = transformGridQuery({ ...params });
  
      const { data } = await getAllBrands(query);
      
      return {
        items: data.brands,
        rowCount: data.total,
      };
    };
  
     const handleDeleteBrand = async (_id) => {
      const { message } = await deleteBrand(_id);
  
      return { success: true, message };
    };
  
  return (
     <div>
      <Overview
        title="مدیریت برند ها"
        breadcrumbs={[
          { name: "کلینیک یو پی اس" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "برند ها" },
        ]}
        columns={brandColumns}
        getMany={getBrands}
        deleteOne={handleDeleteBrand}
        formMode="drawer"
        FormComponent={BrandForm}
      />
    </div>
  )
}

export default DashboardBrandsPageWrapper