import ProjectDetailsWrapper from "@/components/landing/projects/ProjectDetailsWrapper";
export default async function Page({ params }) { const { slug } = await params; return <ProjectDetailsWrapper slug={slug} />; }
