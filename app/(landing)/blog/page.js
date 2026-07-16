import BlogOverviewWrapper from "@/components/landing/blog/BlogOverviewWrapper";
export const metadata = { title: "یو‌پی‌اس بلاگ" };
export default async function Page({ searchParams }) { const query = await searchParams; return <BlogOverviewWrapper initialCategory={query?.category || ""} />; }
