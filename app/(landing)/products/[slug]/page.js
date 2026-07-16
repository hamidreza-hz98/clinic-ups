import EntityDetailsPage from "@/components/landing-pages/EntityDetailsPage";
export default async function ProductPage({ params }) { const { slug } = await params; return <EntityDetailsPage entity="products" slug={slug} />; }
