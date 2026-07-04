"use client";

import { getDashboardData } from "@/app/actions/dashboard";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import SummaryCards from "../dashboard/DashboardSummaryCard";
import { Grid } from "@mui/material";
import TopProducts from "../dashboard/TopProducts";

const DashboardWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      setError(null);
      try {
        const { data } = await getDashboardData();

        setDashboard(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "مشکلی پیش آمد.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <PageContainer title="داشبورد مدیریت">
        <p>{error}</p>
      </PageContainer>
    );

  return (
    <PageContainer title="داشبورد مدیریت کلینیک یو پی اس">
      <Grid container mt={4} spacing={2}>
        <Grid size={{ xs: 12 }}>
          <SummaryCards dashboard={dashboard} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProducts
            title="پربازدیدترین محصولات"
            data={dashboard?.mostVisitedProducts}
            suffix="visits"
            suffixLabel="بازدید"
            entity="products"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProducts
            title="پربازدیدترین پروژه ها"
            data={dashboard?.mostVisitedProjects}
            suffix="visits"
            suffixLabel="بازدید"
            entity="projects"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProducts
            title="پربازدیدترین بلاگ ها"
            data={dashboard?.mostVisitedBlogs}
            suffix="visits"
            suffixLabel="بازدید"
            entity="blog"
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashboardWrapper;
