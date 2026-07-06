"use client"

import { createTag, updateTag } from '@/app/actions/tag';
import { tagDefaultValues } from '@/constants/default-form-values';
import React, { useEffect } from 'react'
import Loader from '../common/Loader';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const TagForm = ({ mode, data, onClose, onSuccess, onError }) => {
    const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: tagDefaultValues(data),
  });

    useEffect(() => {
    reset(tagDefaultValues(data));
  }, [data, reset]);

  const onSubmit = async (tag) => {
    let message = "";

    try {
      const { message } =
        mode === "edit"
          ? await updateTag(tag._id, tag)
          : await createTag(tag);

      reset();
      onSuccess && onSuccess(message);
    } catch (error) {
      onError && onError(message);
    }
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
          {mode === "edit" ? "ویرایش برچسب" : "ساخت برچسب جدید"}
        </Typography>

         <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                fullWidth
                label="نام برچسب"
              />
            )}
          />

           <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "ویرایش برچسب" : "ایجاد برچسب"}
            </Button>

            <Button variant="outlined" color="error" onClick={onClose}>
              لغو
            </Button>
          </Stack>
        </Stack>

      </Box>
      </>
  )
}

export default TagForm