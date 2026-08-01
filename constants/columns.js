import { formatDateAndTime } from "@/lib/date";
import { setImagePath } from "@/lib/landing/general";
import { formatPrice, toPersian } from "@/lib/number";
import { Box } from "@mui/material";
import Image from "next/image";

export const tagColumns = [
  {
    field: "name",
    headerName: "نام",
    width: 200,
  },
  {
    field: "slug",
    headerName: "نامک",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخت",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "تاریخ آخرین ویرایش",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const brandColumns = [
  {
    field: "image",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.logo || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={setImagePath(image.path)}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "نام",
    width: 200,
  },
  {
    field: "categories",
    headerName: "دسته بندی ها",
    width: 200,

    valueGetter: (value) =>
      value?.map((category) => category.name).join(", ") || "-",
  },
  {
    field: "key",
    headerName: "کلید",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخت",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "تاریخ آخرین ویرایش",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const categoryColumns = [
  {
    field: "image",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.icon || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={setImagePath(image.path)}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "نام دسته بندی",
    width: 180,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const productColumns = [
  {
    field: "media",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.media[0] || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={setImagePath(image.path)}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "نام محصول",
    width: 200,
  },
  {
    field: "category",
    headerName: "دسته بندی",
    width: 200,
    valueGetter: (category) => category.name,
  },
  {
    field: "brand",
    headerName: "برند",
    width: 200,
    valueGetter: (brand) => brand.name,
  },
  {
    field: "visits",
    headerName: "بازدید ها",
    width: 80,
    valueGetter: (visits) => formatPrice(visits),
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const projectColumns = [
  {
    field: "media",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.media[0] || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={setImagePath(image.path)}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "عنوان پروژه",
    width: 200,
  },
  {
    field: "categories",
    headerName: "دسته بندی ها",
    width: 200,
    valueGetter: (value) =>
      value?.map((category) => category.name).join(", ") || "-",
  },
  {
    field: "brands",
    headerName: "برند ها",
    width: 200,
    valueGetter: (value) => value?.map((brand) => brand.name).join(", ") || "-",
  },
  {
    field: "visits",
    headerName: "بازدید ها",
    width: 80,
    valueGetter: (visits) => formatPrice(visits),
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const blogColumns = [
  {
    field: "thumbnail",
    headerName: "عکس",
    width: 120,
    renderCell: (params) => {
      const image = params.row.thumbnail[0] || {};

      return (
        <Box
          display="flex"
          gap={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Image
            src={setImagePath(image.path)}
            alt={image.filename}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "title",
    headerName: "عنوان مقاله",
    width: 200,
  },
  {
    field: "categories",
    headerName: "دسته بندی ها",
    width: 200,
    valueGetter: (value) =>
      value?.map((category) => category.name).join(", ") || "-",
  },
  {
    field: "visits",
    headerName: "بازدید ها",
    width: 80,
    valueGetter: (visits) => formatPrice(visits),
  },
  {
    field: "createdAt",
    headerName: "تاریخ ساخته شدن",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
  {
    field: "updatedAt",
    headerName: "آخرین تغییر",
    width: 180,
    valueGetter: (updatedAt) => formatDateAndTime(updatedAt) || "",
  },
];

export const contactFormColumns = [
  {
    field: "fullName",
    headerName: "نام",
    width: 200,
  },
  {
    field: "mobile",
    headerName: "نام",
    width: 200,

    valueGetter: (mobile) => toPersian(mobile),
  },
  {
    field: "message",
    headerName: "پیام",
    width: 400,
  },
  {
    field: "createdAt",
    headerName: "تاریخ ارسال",
    width: 180,
    valueGetter: (createdAt) => formatDateAndTime(createdAt) || "",
  },
];
