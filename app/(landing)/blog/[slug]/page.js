import EntityDetailsPage from "@/components/landing-pages/EntityDetailsPage";
export default async function BlogDetailsPage({ params }) { const { slug } = await params; return <EntityDetailsPage entity="blogs" slug={slug} />; }
