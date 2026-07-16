import EntityDetailsPage from "@/components/landing-pages/EntityDetailsPage";
export default async function ProjectPage({ params }) { const { slug } = await params; return <EntityDetailsPage entity="projects" slug={slug} />; }
