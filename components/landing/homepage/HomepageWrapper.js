import { getAllCategories } from "@/app/actions/category";
import { getAllProjects } from "@/app/actions/project";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import BrandsOrbitSection from "./BrandsOrbitSection";
import ServicesTimelineSection from "./ServicesTimelineSection";
import SlogansCoreSection from "./SlogansCoreSection";
import CertificationsSection from "./CertificationsSection";
import SelectedProjectsSection from "./SelectedProjectsSection";
import IndustriesNetworkSection from "./IndustriesNetworkSection";

export default async function HomepageWrapper() {
  const [categoriesResponse, projectsResponse] = await Promise.all([
    getAllCategories({
      page: 1,
      page_size: 20,
      sort: [{ field: "createdAt", order: "asc" }],
    }),
    getAllProjects({
      page: 1,
      page_size: 5,
      sort: [{ field: "createdAt", order: "desc" }],
      filters: { isSelected: { type: "eq", value: true } },
    }),
  ]);

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categoriesResponse?.data?.categories || []} />
      <BrandsOrbitSection />
      <ServicesTimelineSection />
      <SlogansCoreSection />
      <CertificationsSection />
      <SelectedProjectsSection projects={projectsResponse?.data?.projects || []} />
      <IndustriesNetworkSection />
    </>
  );
}
