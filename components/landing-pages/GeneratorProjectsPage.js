import { Breadcrumbs, LandingSection, PageHero } from "./LandingPageElements";

const projects = [
  { title: "آزمایشگاه دکتر همتی", image: "/images/emergency-electricity/project-dr-hemmati-lab/project-dr-hemmati-lab-01.webp" },
  { title: "آزمایشگاه دکتر خسروشاهی", image: "/images/emergency-electricity/project-dr-khosrowshahi-lab/project-dr-khosrowshahi-lab-01.webp" },
  { title: "آزمایشگاه ارم ایلام", image: "/images/emergency-electricity/project-eram-lab-ilam/project-eram-lab-02.webp" },
  { title: "تعویض ژنراتور ۷۰ کاوا", image: "/images/emergency-electricity/project-generator-swap-70kva/project-generator-swap-70kva-01.webp" },
  { title: "آزمایشگاه پارسیان ایوان", image: "/images/emergency-electricity/project-parsian-lab-eyvan/project-parsian-lab-01.webp" },
  { title: "آزمایشگاه پویش الیگودرز", image: "/images/emergency-electricity/project-pooyesh-lab-aligoudarz/project-pooyesh-lab-aligoudarz-01.webp" },
];

export default function GeneratorProjectsPage() { return <><PageHero title="پروژه‌های برق اضطراری" description="نمونه پروژه‌های اجرایی موتور برق و ژنراتور" image="/images/static/power_plant.webp" /><LandingSection><Breadcrumbs items={[{ label: "پروژه‌های برق اضطراری" }]} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <article key={project.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"><img src={project.image} alt={project.title} className="aspect-[4/3] w-full object-cover" /><h2 className="p-5 text-lg font-black text-white">{project.title}</h2></article>)}</div></LandingSection></>; }
