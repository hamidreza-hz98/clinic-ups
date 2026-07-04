"use client";

import { createBrand, updateBrand } from "@/app/actions/brand";
import { getAllCategories } from "@/app/actions/category";
import { defaultBrandValues } from "@/constants/default-form-values";
import { purifyData } from "@/lib/request";
import { brandValidationSchema } from "@/validation/brand.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Loader from "../common/Loader";
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaPageWrapper from "../dashboard-wrappers/MediaPageWrapper";
import MediaPreview from "../common/MediaPreview";

const BrandForm = ({ mode, data, onClose, onSuccess, onError }) => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);
  const [selectedMediaObjects, setSelectedMediaObjects] = React.useState({});

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultBrandValues(data),
    resolver: yupResolver(brandValidationSchema),
    mode: "onBlur",
  });

  const initialized = React.useRef(false);

  React.useEffect(() => {
    const fetchDependencies = async () => {
      try {
        setLoading(true);

        const query = { page_size: 5000 };

        const [categoriesRes] = await Promise.all([getAllCategories(query)]);

        setCategories(categoriesRes.data.categories || []);
      } catch (error) {
        console.error("Failed to load product dependencies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDependencies();
  }, []);

  React.useEffect(() => {
    if (!categories.length || !data?._id || initialized.current) return;

    initialized.current = true;

    if (data.cateories) setValue("categories", data.categories);
  }, [categories, data, setValue]);

  /* ---------------------------------- */
  /* RESET + MEDIA STATE */
  /* ---------------------------------- */
  React.useEffect(() => {
    setSelectedMediaObjects({
      logo: data?.logo,
    });

    reset(defaultBrandValues(data));
  }, [data, reset]);

  /* ---------------------------------- */
  /* SUBMIT */
  /* ---------------------------------- */
  const onSubmit = async (brand) => {
    let message = "";

    try {
      const body = purifyData(brand, ["logo", "categories"]);

      const { message } =
        mode === "edit"
          ? await updateBrand(data._id, body)
          : await createBrand(body);

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

  if ((mode === "edit" && !data) || !categories || loading) {
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
            {mode === "edit" ? "ویرایش برند" : "ساخت برند جدید"}
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField size="small" {...field} fullWidth label="نام برند" />
            )}
          />

          <Controller
            name="key"
            control={control}
            render={({ field }) => (
              <TextField size="small" {...field} fullWidth label="کلید" />
            )}
          />

          <Controller
            name="categories"
            control={control}
            render={({ field }) => {
              const selectedCategories = (field.value || []).map((item) =>
                categories?.find((c) => c._id === (item?._id || item)),
              );

              return (
                <Autocomplete
                  size="small"
                  fullWidth
                  multiple
                  options={categories || []}
                  getOptionLabel={(option) => option?.name || ""}
                  value={selectedCategories}
                  noOptionsText="دسته بندی ای یافت نشد!"
                  onChange={(e, newValue) =>
                    field.onChange(newValue.map((c) => c._id))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="دسته بندی" />
                  )}
                  slotProps={{
                    popper: {
                      sx: {
                        zIndex: 9999,
                      },
                    },
                  }}
                  error={!!errors.categories}
                  helperText={errors.categories?.message}
                />
              );
            }}
          />

          <Controller
            name="logo"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>لوگو برند</Typography>

                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => openMediaDrawer("logo", "image", false)}
                >
                  انتخاب
                </Button>
                {selectedMediaObjects.logo && (
                  <MediaPreview file={selectedMediaObjects.logo} />
                )}
              </Stack>
            )}
          />

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "ویرایش برند" : "ایجاد برند"}
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

export default BrandForm;
