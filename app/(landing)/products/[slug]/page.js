import ProductDetailsWrapper from "@/components/landing/products/ProductDetailsWrapper";
export default async function Page({ params }) { const { slug } = await params; return <ProductDetailsWrapper slug={slug} />; }
