"use client";

import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useForm } from "react-hook-form";
import {
  defaultProjectValues,
} from "@/constants/default-form-values";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllProducts } from "@/app/actions/product";
import { getAllCategories } from "@/app/actions/category";
import { getAllBrands } from "@/app/actions/brand";
import { getAllTags } from "@/app/actions/tag";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import TagField from "../fields/TagField";
import SpecificationsField from "../fields/SpecificationsField";
import MediaPageWrapper from "../dashboard-wrappers/MediaPageWrapper";
import RichTextEditor from "../fields/RichTextEditor";
import Loader from "../common/Loader";
import MediaPreview from "../common/MediaPreview";
import { projectValidationSchema } from "@/validation/project.validation";
import { getAllProjects } from "@/app/actions/project";
import CustomDatePicker from "../fields/CustomDatePicker";

const ProjectForm = ({ data, mode = "create", onSubmit }) => {
  const [products, setProducts] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
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
    defaultValues: defaultProjectValues(data),
    resolver: yupResolver(projectValidationSchema),
    mode: "onBlur",
  });

  const initialized = React.useRef(false);

  React.useEffect(() => {
    const fetchDependencies = async () => {
      try {
        setLoading(true);

        const query = { page_size: 5000 };

        const [productsRes, categoriesRes, brandsRes, tagsRes, projectsRes] =
          await Promise.all([
            getAllProducts(query),
            getAllCategories(query),
            getAllBrands(query),
            getAllTags(query),
            getAllProjects(query),
          ]);

        setProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
        setBrands(brandsRes.data.brands || []);
        setTags(tagsRes.data.tags || []);
        setProjects(projectsRes.data.projects || []);
      } catch (error) {
        console.error("Failed to load product dependencies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDependencies();
  }, []);

  React.useEffect(() => {
    if (
      !categories.length ||
      !products.length ||
      !brands.length ||
      !tags.length ||
      !projects.length ||
      !data?._id ||
      initialized.current
    )
      return;

    initialized.current = true;

    if (data.relatedProducts)
      setValue(
        "relatedProducts",
        data.relatedProducts.map((t) => (t?._id ? t._id : t)),
      );

    if (data.categories)
      setValue(
        "categories",
        data.categories.map((t) => (t?._id ? t._id : t)),
      );

    if (data.brands)
      setValue(
        "brands",
        data.brands.map((t) => (t?._id ? t._id : t)),
      );

    if (data.relatedProjects)
      setValue(
        "relatedProjects",
        data.relatedProjects.map((t) => (t?._id ? t._id : t)),
      );

    if (data.tags)
      setValue(
        "tags",
        data.tags.map((t) => (t?._id ? t._id : t)),
      );
  }, [categories, products, brands, tags, projects, data, setValue]);

  React.useEffect(() => {
    setSelectedMediaObjects({
      media: data?.media,
      "seo.ogImage": data?.seo?.ogImage,
      "seo.twitterImage": data?.seo?.twitterImage,
    });

    reset(defaultProjectValues(data));
  }, [data, reset]);

  const handleFormSubmit = async (formData) => {
    onSubmit && onSubmit(formData);
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

  if ((mode === "edit" && !data) || loading) {
    return <Loader />;
  }
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="نام پروژه"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="Slug"
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isSelected"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(field.value)}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                  label="نمایش در پروژه‌های منتخب صفحه اصلی"
                />
              )}
            />
          </Grid>

          {/* <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="قیمت"
                  type="text"
                  value={formatPrice(field.value)}
                  onChange={(e) => {
                    const numericValue =
                      parseInt(
                        toEnglish(e.target.value).replace(/[^\d]/g, ""),
                        10,
                      ) || 0;
                    setValue("price", numericValue);
                  }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Grid> */}

          <Grid size={{ xs: 12 }}>
            <Controller
              name="excerpt"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="توضیح خلاصه"
                  error={!!errors.excerpt}
                  helperText={errors.excerpt?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="deliveryDate"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="زمان تحویل"
                  error={!!errors.deliveryDate}
                  helperText={errors.deliveryDate?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="مشتری"
                  error={!!errors.customer}
                  helperText={errors.customer?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="لوکیشن"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm:6 }}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography ml={2} variant="caption">
                    تاریخ انجام:
                  </Typography>

                  <CustomDatePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    label="تاریخ انجام"
                  />
                </Box>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  {...field}
                  text={field.value}
                  label="توضیحات تکمیلی"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => {
                const selectedCategories = (field.value || []).map((item) =>
                  categories?.find((c) => c._id === (item?._id || item)),
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={categories || []}
                    getOptionLabel={(option) => option?.name}
                    value={selectedCategories}
                    noOptionsText="دسته بندی یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="دسته بندی ها" />
                    )}
                    error={!!errors.categories}
                    helperText={errors.categories?.message}
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="brands"
              control={control}
              render={({ field }) => {
                const selectedBrands = (field.value || []).map((item) =>
                  brands?.find((c) => c._id === (item?._id || item)),
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={brands || []}
                    getOptionLabel={(option) => option?.name}
                    value={selectedBrands}
                    noOptionsText="برندی یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="برند ها" />
                    )}
                    error={!!errors.brands}
                    helperText={errors.brands?.message}
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="relatedProjects"
              control={control}
              render={({ field }) => {
                const selectedProjects = (field.value || []).map((item) =>
                  projects?.find((c) => c._id === (item?._id || item)),
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={projects || []}
                    getOptionLabel={(option) => option?.name}
                    value={selectedProjects}
                    noOptionsText="پروژه یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="پروژه های مرتبط" />
                    )}
                    error={!!errors.relatedProjects}
                    helperText={errors.relatedProjects?.message}
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="relatedProducts"
              control={control}
              render={({ field }) => {
                const selectedProducts = (field.value || []).map((item) =>
                  products?.find((c) => c._id === (item?._id || item)),
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={products || []}
                    getOptionLabel={(option) => option?.name}
                    value={selectedProducts}
                    noOptionsText="محصولی یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="محصولات مرتبط" />
                    )}
                    error={!!errors.relatedProducts}
                    helperText={errors.relatedProducts?.message}
                  />
                );
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TagField
                  initialTags={tags}
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="media"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>عکس های پروژه</Typography>

                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("media", "image", true)}
                  >
                    انتخاب
                  </Button>

                  <Box display="flex" gap={2}>
                    {selectedMediaObjects.media &&
                      selectedMediaObjects.media.length !== 0 &&
                      selectedMediaObjects.media.map((item, index) => (
                        <MediaPreview key={index} file={item} />
                      ))}
                  </Box>
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mt={2}>
            <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />

            <Typography mt={2} variant="h4">
              تنظیمات سئو
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.title"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="عنوان سئو"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Controller
              name="seo.description"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="توضیحات سئو"
                  multiline
                  rows={2}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.keywords"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="کلمات کلیدی (با کاما جدا کنید)"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogTitle"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="OG Title" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="OG Description"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>OG Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("seo.ogImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`seo.ogImage`] && (
                    <MediaPreview file={selectedMediaObjects[`seo.ogImage`]} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="تیتر توییتر"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="توضیحات توییتر"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>Twitter Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("seo.twitterImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`seo.twitterImage`] && (
                    <MediaPreview
                      file={selectedMediaObjects[`seo.twitterImage`]}
                    />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.canonical"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="لینک کنونیکال"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.robots"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="Robots" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.additionalMetaTags"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="متا تگ های اضافی"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex" justifyContent="space-between">
            <Box flex="1 1" />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "ویرایش پروژه" : "ایجاد پروژه"}
            </Button>
          </Grid>
        </Grid>
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

export default ProjectForm;
