"use client";

import {
  Card,
  Typography,
  CardContent,
  Box,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import WatchIcon from "@mui/icons-material/Watch";
import { formatPrice } from "@/lib/number";
import Loader from "../common/Loader";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import BatteryCharging30Icon from '@mui/icons-material/BatteryCharging30';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WebIcon from '@mui/icons-material/Web';

const summaryData = [
  {
    title: "محصول",
    key: "totalProducts",
    icon: <WatchIcon />,
    color: "secondary.main",
  },
  {
    title: "پروژه",
    key: "totalProjects",
    icon: <AccountTreeIcon />,
    color: "primary.main",
  },
  {
    title: "دسته بندی",
    key: "totalCategories",
    icon: <CategoryIcon />,
    color: "warning.main",
  },
  {
    title: "برند",
    key: "totalBrands",
    icon: <BatteryCharging30Icon />,
    color: "success.main",
  },
  {
    title: "مدیا",
    key: "totalMedia",
    icon: <BrokenImageIcon />,
    color: "primary.main",
  },
  {
    title: "درخواست تماس",
    key: "totalContacts",
    icon: <PhoneAndroidIcon />,
    color: "secondary.main",
  },
  {
    title: "برچسب",
    key: "totalTags",
    icon: <LocalOfferIcon />,
    color: "warning.main",
  },
  {
    title: "مقاله",
    key: "totalBlogs",
    icon: <WebIcon />,
    color: "success.main",
  },
];

export default function SummaryCards({ dashboard = {} }) {

  if (!dashboard) {
    return <Loader />;
  }

  return (
  <Grid container spacing={2}>
  {summaryData.map((item, index) => (
    <Grid size={{ xs: 12, md: 6 }} key={index}>
      <Card sx={{ height: "100%", px: 2 }}>
        <CardContent
          sx={{
            color: item.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 1,
          }}
        >
          <Box mt={1}>{item.icon}</Box>

          <Divider
            sx={{ width: 3, bgcolor: item.color }}
            variant="middle"
            orientation="vertical"
            flexItem
          />

          <Box>
            <Typography variant="h3" fontWeight="bold">
              {formatPrice(dashboard[item.key])}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5">
              {item.title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
  );
}
