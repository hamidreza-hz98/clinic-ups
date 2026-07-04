"use client";

import {
  createProduct,
  getProductDetails,
  updateProduct,
} from "@/app/actions/product";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import ProductForm from "../forms/ProductForm";

const CreateOrEditProductPageWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const notifications = useNotifications();

  const _id = searchParams.get("_id");
  const [productDetails, setProductDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const loadData = React.useCallback(async () => {
    if (!_id) return;

    try {
      setLoading(true);

      const { data } = await getProductDetails({ _id });

      setProductDetails(data);
    } catch (error) {
      notifications.show(error.message || "خطا در دریافت اطلاعات محصول", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [_id, notifications]);

  const handleCreateOrUpdateProduct = async (product) => {
    try {
      const body = purifyData(product, [
        "brand",
        "category",
        "media",
        "tags",
        "relatedProducts",
        "seo.ogImage",
        "seo.twitterImage",
      ]);

      const { message } = _id
        ? await updateProduct(_id, body)
        : await createProduct(body);

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/products");
    } catch (error) {
      notifications.show(error.message || "خطا در ثبت محصول", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (_id && (loading || !productDetails)) {
    return <Loader />;
  }

  return (
    <PageContainer
      title="مشخصات محصول:"
      breadcrumbs={[
        { name: "کلینیک یو پی اس" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "محصولات", path: "/dashboard/products" },
        { name: _id ? "ویرایش محصول" : "ساخت محصول جدید" },
      ]}
    >
      <ProductForm
        onSubmit={handleCreateOrUpdateProduct}
        data={productDetails}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  );
};

export default CreateOrEditProductPageWrapper;
