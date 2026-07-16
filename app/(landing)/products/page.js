import ProductsOverviewWrapper from "@/components/landing/products/ProductsOverviewWrapper";
export const metadata = { title: "محصولات" };
export default async function Page({ searchParams }) { const query = await searchParams; return <ProductsOverviewWrapper initialCategory={query?.category || ""} />; }
