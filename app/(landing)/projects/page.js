import EntityListPage from "@/components/landing-pages/EntityListPage";
export const metadata = { title: "پروژه‌ها" };
export default async function ProjectsPage({ searchParams }) { const query = await searchParams; return <EntityListPage entity="projects" initialSearch={query?.search || ""} initialCategory={query?.category || ""} />; }
