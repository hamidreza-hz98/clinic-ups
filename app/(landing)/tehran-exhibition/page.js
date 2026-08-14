import { getAllCategories } from "@/app/actions/category";
import { getAllProjects } from "@/app/actions/project";
import TehranExhibitionPage from "@/components/landing/tehran-exhibition/TehranExhibitionPage";

export const metadata = {
  title: "کلینیک یو پی اس در نمایشگاه ایران هلث",
  description: "معرفی راهکارهای برق اضطراری کلینیک یو پی اس برای بیمارستان‌ها، کلینیک‌ها و آزمایشگاه‌ها در نمایشگاه ایران هلث تهران.",
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
