import { getAllCategories } from "@/app/actions/category";
import { getAllProjects } from "@/app/actions/project";
import TehranExhibitionPage from "@/components/landing/tehran-exhibition/TehranExhibitionPage";

export const metadata = {
  title: "ارتقای کیفیت خدمات آزمایشگاهی تشخیص پزشکی ایران",
  description: "معرفی راهکارهای برق اضطراری کلینیک یو پی اس برای آزمایشگاه‌ها و مراکز تشخیص پزشکی در کنگره ارتقای کیفیت خدمات آزمایشگاهی تشخیص پزشکی ایران.",
};

export default async function Page() {
  const [categoriesResponse, projectsResponse] = await Promise.all([
    getAllCategories({ page: 1, page_size: 6, sort: [{ field: "createdAt", order: "asc" }] }),
    getAllProjects({ page: 1, page_size: 3, sort: [{ field: "createdAt", order: "desc" }] }),
  ]);

  return (
    <TehranExhibitionPage
      categories={categoriesResponse?.data?.categories || []}
      projects={projectsResponse?.data?.projects || []}
    />
  );
}
