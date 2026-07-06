"use client";

import { createCategory, updateCategory } from "@/app/actions/category";
import { defaultCategoryValues } from "@/constants/default-form-values";
import { purifyData } from "@/lib/request";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Loader from "../common/Loader";
import {
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaPreview from "../common/MediaPreview";
import MediaPageWrapper from "../dashboard-wrappers/MediaPageWrapper";

const CategoryForm = ({ mode, data, onClose, onSuccess, onError }) => {
  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);
  const [selectedMediaObjects, setSelectedMediaObjects] = React.useState({});

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultCategoryValues(data),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedMediaObjects({
      icon: data?.icon,
    });

    reset(defaultCategoryValues(data));
  }, [data, reset]);

  const onSubmit = async (category) => {
    let message = "";

    try {
      const body = purifyData(category, ["icon"]);

      const { message } =
        mode === "edit"
          ? await updateCategory(data._id, body)
          : await createCategory(body);

      reset();
      onSuccess && onSuccess(message);
    } catch (error) {
      onError && onError(message);
    }
  };

  const openMediaDrawer = (fieldName, type, multiple) => {
    setActiveField(fieldName);
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(true);
  };

  const handleSelect = (media) => {
    const ids = drawerMultiple ? media.map((m) => m?._id) : media[0]?._id;
    setValue(activeField, ids);

    setSelectedMediaObjects((prev) => ({
      ...prev,
      [activeField]: drawerMultiple ? media : media[0] || null,
    }));

    setDrawerOpen(false);
  };

  if (mode === "edit" && !data) {
    return <Loader />;
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">
            {mode === "edit" ? "ویرایش دسته بندی" : "ساخت دسته بندی جدید"}
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                fullWidth
                label="نام دسته بندی"
              />
            )}
          />

          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <TextField size="small" {...field} fullWidth label="Slug" />
            )}
          />

          <Controller
            name="excerpt"
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                rows={3}
                size="small"
                {...field}
                fullWidth
                label="توضیح مختصر"
              />
            )}
          />

          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <TextField size="small" {...field} fullWidth label="مقدار" />
            )}
          />

          <Controller
            name="icon"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>عکس دسته بندی</Typography>

                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => openMediaDrawer("icon", "image", false)}
                >
                  انتخاب
                </Button>
                {selectedMediaObjects.icon && (
                  <MediaPreview file={selectedMediaObjects.icon} />
                )}
              </Stack>
            )}
          />

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "ویرایش دسته بندی" : "ایجاد دسته بندی"}
            </Button>

            <Button variant="outlined" color="error" onClick={onClose}>
              لغو
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          sx: {
            zIndex: (theme) => theme.zIndex.modal + 1000,
          },
        }}
      >
        <Box>
          <MediaPageWrapper
            onSelect={handleSelect}
            isOnForm
            type={drawerType}
            multiple={drawerMultiple}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default CategoryForm;
