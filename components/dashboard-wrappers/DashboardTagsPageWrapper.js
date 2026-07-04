"use client"

import { deleteTag, getAllTags } from '@/app/actions/tag';
import { transformGridQuery } from '@/lib/request';
import React from 'react'
import Overview from '../common/Overview';
import TagForm from '../forms/TagForm';
import { tagColumns } from '@/constants/columns';

const DashboardTagsPageWrapper = () => {
   const getTags = async (params) => {
    const query = transformGridQuery({ ...params });

    const { data } = await getAllTags(query);
    
    return {
      items: data.tags,
      rowCount: data.total,
    };
  };

   const handleDeleteTag = async (_id) => {
    const { message } = await deleteTag(_id);

    return { success: true, message };
  };


  return (
     <div>
      <Overview
        title="مدیریت برچسب ها"
        breadcrumbs={[
          { name: "کلینیک یو پی اس" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "برچسب ها" },
        ]}
        columns={tagColumns}
        getMany={getTags}
        deleteOne={handleDeleteTag}
        formMode="drawer"
        FormComponent={TagForm}
      />
    </div>
  )
}

export default DashboardTagsPageWrapper