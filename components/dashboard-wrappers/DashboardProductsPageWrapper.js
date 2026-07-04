"use client";

import { deleteProduct, getAllProducts } from "@/app/actions/product";
import { transformGridQuery } from "@/lib/request";
import React from "react";
import Overview from "../common/Overview";
import { productColumns } from "@/constants/columns";

const DashboardProductsPageWrapper = () => {
  const getProducts = async (params) => {
    const query = transformGridQuery({ ...params });

    const { data } = await getAllProducts(query);

    return {
      items: data.products,
      rowCount: data.total,
    };
  };

  const handleDeleteProduct = async (_id) => {
    const { message } = await deleteProduct(_id);

    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="مدیریت محصولات"
        breadcrumbs={[
          { name: "کلینیک یو پی اس" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "محصولات" },
        ]}
        columns={productColumns}
        getMany={getProducts}
        deleteOne={handleDeleteProduct}
      />
    </div>
  );
};

export default DashboardProductsPageWrapper;
