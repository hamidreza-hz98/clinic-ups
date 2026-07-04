"use client"

import React from 'react'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useForm } from 'react-hook-form';
import { defaultBlogValues } from '@/constants/default-form-values';
import { blogValidationSchema } from '@/validation/blog.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllProducts } from '@/app/actions/product';
import { getAllCategories } from '@/app/actions/category';
import { getAllTags } from '@/app/actions/tag';
import { getAllBlogs } from '@/app/actions/blog';
import Loader from '../common/Loader';
import { Autocomplete, Box, Button, Checkbox, Divider, Drawer, Grid, Stack, TextField, Typography } from '@mui/material';
import TagField from '../fields/TagField';
import MediaPageWrapper from '../dashboard-wrappers/MediaPageWrapper';
import MediaPreview from '../common/MediaPreview';
import RichTextEditor from '../fields/RichTextEditor';

const BlogForm = ({ data, mode = "create", onSubmit }) => {
 const [products, setProducts] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [blogs, setBlogs] = React.useState([]);
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
    defaultValues: defaultBlogValues(data),
    resolver: yupResolver(blogValidationSchema),
    mode: "onBlur",
  });

  const initialized = React.useRef(false);

  React.useEffect(() => {
    const fetchDependencies = async () => {
      try {
        setLoading(true);

        const query = { page_size: 5000 };

        const [productsRes, categoriesRes, blogsRes, tagsRes] =
          await Promise.all([
            getAllProducts(query),
            getAllCategories(query),
            getAllBlogs(query),
            getAllTags(query),
          ]);

        setProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
        setBlogs(blogsRes.data.blogs || []);
        setTags(tagsRes.data.tags || []);
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
      !tags.length ||
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

      setValue(
        "relatedBlogs",
        data.relatedBlogs.map((t) => (t?._id ? t._id : t)),
      );

    if (data.categories)
      setValue(
        "categories",
        data.categories.map((t) => (t?._id ? t._id : t)),
      );

    if (data.tags)
      setValue(
        "tags",
        data.tags.map((t) => (t?._id ? t._id : t)),
      );
  }, [categories, products, tags, data, setValue]);

  React.useEffect(() => {
    setSelectedMediaObjects({
      thumbnail: data?.thumbnail,
      "seo.ogImage": data?.seo?.ogImage,
      "seo.twitterImage": data?.seo?.twitterImage,
    });

    reset(defaultBlogValues(data));
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
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="عنوان بلاگ"
                  error={!!errors.title}
                  helperText={errors.title?.message}
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
              name="readTime"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="زمان مطالعه"
                  error={!!errors.readTime}
                  helperText={errors.readTime?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isSelected"
              control={control}
              render={({ field }) => (
                <Checkbox
                  size="small"
                  {...field}
                  fullWidth
                  error={!!errors.isSelected}
                  helperText={errors.isSelected?.message}
                />
              )}
            />

            <Typography variant='caption' > افزودن به عنوان منتخب </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  {...field}
                  text={field.value}
                  label="محتوا"
                  error={!!errors.content}
                  helperText={errors.content?.message}
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
              name="relatedBlogs"
              control={control}
              render={({ field }) => {
                const selectedBlogs = (field.value || []).map((item) =>
                  blogs?.find((c) => c._id === (item?._id || item)),
                );
                return (
                  <Autocomplete
                    multiple
                    size="small"
                    fullWidth
                    options={blogs || []}
                    getOptionLabel={(option) => option?.title}
                    value={selectedBlogs}
                    noOptionsText="بلاگ یافت نشد!"
                    onChange={(e, newValue) =>
                      field.onChange(newValue.map((c) => c._id))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="بلاگ های مرتبط" />
                    )}
                    error={!!errors.relatedBlogs}
                    helperText={errors.relatedBlogs?.message}
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
                  <Typography>عکس های بلاگ</Typography>

                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("thumbnail", "image", true)}
                  >
                    انتخاب
                  </Button>

                  <Box display="flex" gap={2}>
                    {selectedMediaObjects.thumbnail &&
                      selectedMediaObjects.thumbnail.length !== 0 &&
                      selectedMediaObjects.thumbnail.map((item, index) => (
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
              {mode === "edit" ? "ویرایش بلاگ" : "ایجاد بلاگ"}
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
  )
}

export default BlogForm