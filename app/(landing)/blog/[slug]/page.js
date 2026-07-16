import BlogDetailsWrapper from "@/components/landing/blog/BlogDetailsWrapper";
export default async function Page({ params }) { const { slug } = await params; return <BlogDetailsWrapper slug={slug} />; }
