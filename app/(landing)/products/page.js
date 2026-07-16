import EntityListPage from "@/components/landing-pages/EntityListPage";
export const metadata = { title: "محصولات" };
export default async function ProductsPage({ searchParams }) { const query = await searchParams; return <EntityListPage entity="products" initialSearch={query?.search || ""} initialCategory={query?.category || ""} />; }
