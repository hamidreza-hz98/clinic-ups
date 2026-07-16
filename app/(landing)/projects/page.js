import ProjectsOverviewWrapper from "@/components/landing/projects/ProjectsOverviewWrapper";
export const metadata = { title: "پروژه‌ها" };
export default async function Page({ searchParams }) { const query = await searchParams; return <ProjectsOverviewWrapper initialCategory={query?.category || ""} />; }
