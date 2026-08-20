import { CiCircleCheck, CiMoneyBill, CiSquareQuestion, CiStethoscope } from "react-icons/ci";
import { FaCommentAlt, FaMapMarkerAlt, FaPhoneAlt, FaRegEye, FaShieldAlt, FaShoppingCart, FaTruck, FaWhatsapp } from "react-icons/fa";
import { GrServices, GrUserExpert } from "react-icons/gr";
import { LiaCarBatterySolid, LiaTelegram } from "react-icons/lia";
import { MdOutlineBrightnessHigh, MdOutlineDesignServices, MdOutlinePhone } from "react-icons/md";
import { RiCustomerService2Line, RiTeamLine } from "react-icons/ri";

import { CiMail } from "react-icons/ci";
import { GiAutoRepair } from "react-icons/gi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { LuWrench } from "react-icons/lu";
import { PiHeadset } from "react-icons/pi";
import { TbClock24 } from "react-icons/tb";

export const engineeringServices = [
  {
    description: {
      fa: "طراحی و ساخت انواع تابلو های برق یو پی اس، با رعایت کلیه اصول و استاندارد های ISO 2009 و استاندارد های ملی ایران.",
      ar: "تصميم وتصنيع جميع أنواع لوحات الكهرباء UPS، مع الالتزام بجميع القواعد والمعايير ISO 2009 والمعايير الوطنية الإيرانية.",
      en: "Design and construction of all types of UPS electrical panels, adhering to all ISO 2009 principles and Iranian national standards.",
    }
  },
  {
    description: {
      fa: "مشاور و مجری تاسیسات برق اظطراری کارخانجات و موسسات و همچنین پروژه های اتوماسیون.",
      ar: "مستشار ومنفذ لمرافق الكهرباء الطارئة للمصانع والمؤسسات وكذلك مشاريع الأتمتة.",
      en: "Consultant and implementer of emergency electrical systems for factories and institutions, as well as automation projects.",
    }
  },
  {
    description: {
      fa: "طراحی، نظارت و اجرای سیستم های روشنایی معابر( با استفاده از سیستم های خورشیدی )",
      ar: "تصميم، إشراف وتنفيذ أنظمة الإضاءة للطرق (باستخدام الأنظمة الشمسية).",
      en: "Design, supervision, and implementation of street lighting systems (using solar systems).",
    }
  },
  {
    description: {
      fa: "طراحی و اجرای نور پردازی با استفاده از لامپ های LED و سیستم های خورشیدی.",
      ar: "تصميم وتنفيذ إضاءة باستخدام مصابيح LED وأنظمة شمسية.",
      en: "Design and implementation of lighting using LED lamps and solar systems.",
    }
  },
  {
    description: {
      fa: "کارشناسان این شرکت در صورت تمایل به صورت رایگان در محل حاضر و اعلام هزینه و سایر برآورد های لازم را انجام خواهند داد که در نهایت با رضایت و هماهنگی، خدمات این بخش ارائه خواهد گردید.",
      ar: "خبراء هذه الشركة سوف يكونون متاحين في الموقع مجاناً عند الرغبة، وسيتم تقديم تقديرات التكاليف الأخرى واللازمة، وفي النهاية، سيتم تقديم هذه الخدمة برضا وتنسيق العميل.",
      en: "The experts of this company are available on-site free of charge if desired, and will provide cost estimates and other necessary assessments. The services will be provided with the client's satisfaction and coordination.",
    }
  },
  {
    description: {
      fa: "شرکت در بخش تعمیرات نیز دارای مهندسین مجرب در زمینه تعمیرات UPS با برند های داخلی یا خارجی میباشد.",
      ar: "الشركة في قسم الصيانة أيضاً تحتوي على مهندسين ذوي خبرة في إصلاح أجهزة UPS مع العلامات التجارية المحلية أو الأجنبية.",
      en: "The company’s repair department also has experienced engineers for UPS repairs with both local and international brands.",
    }
  }
]

export const afterSaleBenefits = [
  {
    icon: FaShieldAlt,
    name: {
      fa: "خدمات گارانتی طلایی",
      ar: "خدمات الضمان الذهبي",
      en: "Golden Warranty Services",
    },
    description: {
      fa: "می توانید با تهیه ی گارانتی طلایی، از مزایای آن بهره مند شوید.",
      ar: "يمكنك الاستفادة من مزايا الضمان الذهبي من خلال الحصول عليه.",
      en: "You can benefit from the advantages of the golden warranty by purchasing it.",
    }
  },
  {
    icon: GrServices,
    name: {
      fa: "قرارداد سرویس و نگهداری",
      ar: "عقد الخدمة والصيانة",
      en: "Service and Maintenance Contract",
    },
    description: {
      fa: "شرکت هنگام خرید و یا تعمیر هر دستگاه، با شما قرار داد سرویس و نگهداری انعقاد مینماید.",
      ar: "تقوم الشركة بإبرام عقد خدمة وصيانة عند شراء أو إصلاح أي جهاز.",
      en: "The company will enter into a service and maintenance contract when purchasing or repairing any device.",
    }
  },
  {
    icon: RiCustomerService2Line,
    name: {
      fa: "مشاوره فنی رایگان",
      ar: "استشارات فنية مجانية",
      en: "Free Technical Consultation",
    },
    description: {
      fa: "کلینیک یو پی اس همواره برای مشاوره بصورت رایگان در کنار شماست.",
      ar: "عيادة UPS كووات دائماً موجودة لتقديم استشارات مجانية إلى جانبك.",
      en: "Kuvat UPS Clinic is always available for free consultations by your side.",
    }
  },
  {
    icon: GrUserExpert,
    name: {
      fa: "تعمیرات تخصصی",
      ar: "إصلاحات متخصصة",
      en: "Specialized Repairs",
    },
    description: {
      fa: "تعمیرات تخصصی انواع یو پی اس، با کارشناسان مجرب",
      ar: "إصلاحات متخصصة لأنواع مختلفة من UPS بواسطة خبراء متخصصين.",
      en: "Specialized repairs for various types of UPS by experienced experts.",
    }
  },
  {
    icon: FaMapMarkerAlt,
    name: {
      fa: "ارائه خدمات به کل کشور",
      ar: "تقديم الخدمات في جميع أنحاء البلاد",
      en: "Nationwide Service",
    },
    description: {
      fa: "ما در پیاده سازی پروژه ها، هیچ محدودیت مکانی نداریم.",
      ar: "لا توجد أي قيود مكانية في تنفيذ المشاريع.",
      en: "We have no geographical limitations in implementing projects.",
    }
  },
  {
    icon: MdOutlineDesignServices,
    name: {
      fa: "طراحی و اجرای پروژه",
      ar: "تصميم وتنفيذ المشاريع",
      en: "Project Design and Implementation",
    },
    description: {
      fa: "کلینیک یو پی اس آماده طراحی و اجرای پروژه‌های گوناگون است.",
      ar: "عيادة كووات مستعدة لتصميم وتنفيذ مشاريع متنوعة.",
      en: "Kuvat Clinic is ready to design and implement various projects.",
    }
  },
]
export const afterSaleContracts = [
  {
    description: {
      fa: "شرکت گاز استان تهران و کلیه مناطق تابعه",
      ar: "شركة غاز محافظة طهران وجميع المناطق التابعة لها.",
      en: "Tehran Gas Company and all its affiliated areas.",
    }
  },
  {
    description: {
      fa: "آموزش و پرورش شهر تهران و مناطق",
      ar: "وزارة التعليم في مدينة طهران والمناطق.",
      en: "Education Department of Tehran city and its regions.",
    }
  },
  {
    description: {
      fa: "دیتا سنتر مرکزی بانک سپه",
      ar: "مركز البيانات الرئيسي لبنك سپه.",
      en: "Main data center of Sepah Bank.",
    }
  },
  {
    description: {
      fa: "شرکت نفت و گاز خاورمیانه",
      ar: "شركة النفط والغاز في الشرق الأوسط.",
      en: "Middle East Oil and Gas Company.",
    }
  },
  {
    description: {
      fa: "شرکت ملی نفت ایران",
      ar: "الشركة الوطنية للنفط الإيرانية.",
      en: "National Iranian Oil Company.",
    }
  },
  {
    description: {
      fa: "سازمان انتقال خون",
      ar: "منظمة نقل الدم.",
      en: "Blood Transfusion Organization.",
    }
  },
  {
    description: {
      fa: "قوه قضائیه و دادگاه انقلاب اسلامی کل استان تهران",
      ar: "السلطة القضائية ومحكمة الثورة الإسلامية في محافظة طهران.",
      en: "Judiciary and Islamic Revolution Court of Tehran province.",
    }
  },
]

export const repairBenefits = [
  {
    icon: MdOutlineBrightnessHigh,
    description: {
      fa: "استفاده از قطعات اورجینال و با کیفیت",
      ar: "استخدام قطع غيار أصلية وعالية الجودة.",
      en: "Use of original and high-quality parts.",
    }
  },
  {
    icon: RiTeamLine,
    description: {
      fa: "تیم فنی مجرب و متخصص",
      ar: "فريق فني ذو خبرة ومتخصص.",
      en: "Experienced and specialized technical team.",
    }
  },
  {
    icon: CiStethoscope,
    description: {
      fa: "خدمات سریع و به موقع",
      ar: "خدمات سريعة وفي الوقت المحدد.",
      en: "Fast and timely services.",
    }
  },
  {
    icon: TbClock24,
    description: {
      fa: "پشتیبانی 24/7 و مشاوره رایگان",
      ar: "دعم فني 24/7 واستشارات مجانية.",
      en: "24/7 support and free consultation.",
    }
  },
]

export const repairSteps = [
  {
    icon: CiSquareQuestion,
    name: {
      fa: "ثبت درخواست تعمیر",
      ar: "تسجيل طلب الإصلاح",
      en: "Submit Repair Request",
    },
    description: {
      fa: "درخواست خود را از طریق تماس تلفنی ثبت کنید.",
      ar: "قم بتسجيل طلبك عبر الاتصال الهاتفي.",
      en: "Submit your request via phone call.",
    }
  },
  {
    icon: LuWrench,
    name: {
      fa: "بررسی دستگاه",
      ar: "فحص الجهاز",
      en: "Device Inspection",
    },
    description: {
      fa: "دستگاه شما توسط کارشناسان ما بررسی و عیب‌یابی می‌شود.",
      ar: "سيتم فحص جهازك من قبل خبرائنا وتشخيص المشكلة.",
      en: "Your device will be inspected and diagnosed by our experts.",
    }
  },
  {
    icon: CiMoneyBill,
    name: {
      fa: "اعلام هزینه و زمان تعمیر",
      ar: "إعلام التكلفة ووقت الإصلاح",
      en: "Cost and Repair Time Announcement",
    },
    description: {
      fa: "پس از بررسی، هزینه و زمان تخمینی تعمیر به شما اعلام می‌شود.",
      ar: "بعد الفحص، سيتم إعلامك بتكلفة ووقت الإصلاح التقديري.",
      en: "After inspection, the estimated cost and repair time will be announced.",
    }
  },
  {
    icon: GiAutoRepair,
    name: {
      fa: "انجام تعمیرات",
      ar: "إجراء الإصلاحات",
      en: "Perform Repairs",
    },
    description: {
      fa: "تعمیرات لازم با استفاده از قطعات اصل و تکنیک‌های روز انجام می‌شود.",
      ar: "سيتم إجراء الإصلاحات باستخدام قطع غيار أصلية وأحدث التقنيات.",
      en: "Necessary repairs will be carried out using original parts and modern techniques.",
    }
  },
  {
    icon: LiaCarBatterySolid,
    name: {
      fa: "تست عملکرد",
      ar: "اختبار الأداء",
      en: "Performance Test",
    },
    description: {
      fa: "دستگاه تعمیر شده مورد تست فنی قرار میگیرد.",
      ar: "سيتم اختبار الجهاز المُصلح تقنيًا.",
      en: "The repaired device will undergo a technical test.",
    }
  },
]

export const salesProcess = [
  {
    icon: FaRegEye,
    name: {
      fa: "مشاهده محصولات",
      ar: "عرض المنتجات",
      en: "View Products",
    },
    description: {
      fa: "ابتدا محصولات موجود در سایت را مشاهده کرده و مناسب‌ترین محصول را انتخاب کنید.",
      ar: "قم أولاً بعرض المنتجات المتاحة على الموقع واختر المنتج الأنسب.",
      en: "First, view the available products on the website and choose the most suitable one.",
    }
  },
  {
    icon: FaShoppingCart,
    name: {
      fa: "انتخاب محصول",
      ar: "اختيار المنتج",
      en: "Select Product",
    },
    description: {
      fa: "پس از انتخاب محصول، آن را به سبد خرید خود اضافه کنید.",
      ar: "بعد اختيار المنتج، أضفه إلى سلة التسوق.",
      en: "After selecting the product, add it to your shopping cart.",
    }
  },
  {
    icon: FaCommentAlt,
    name: {
      fa: "دریافت مشاوره رایگان",
      ar: "الحصول على استشارة مجانية",
      en: "Get Free Consultation",
    },
    description: {
      fa: "در صورت نیاز به مشاوره، از کارشناسان ما مشاوره رایگان دریافت کنید.",
      ar: "إذا كنت بحاجة إلى استشارة، يمكنك الحصول على استشارة مجانية من خبرائنا.",
      en: "If you need consultation, get a free consultation from our experts.",
    }
  },
  {
    icon: FaPhoneAlt,
    name: {
      fa: "تماس تلفنی و ثبت سفارش",
      ar: "الاتصال الهاتفي وتقديم الطلب",
      en: "Phone Call and Order Placement",
    },
    description: {
      fa: "پس از مشاوره، برای ثبت سفارش با ما تماس بگیرید.",
      ar: "بعد الاستشارة، اتصل بنا لتقديم طلبك.",
      en: "After consultation, contact us to place your order.",
    }
  },
  {
    icon: FaTruck,
    name: {
      fa: "دریافت محصول در محل",
      ar: "استلام المنتج في الموقع",
      en: "Receive Product on Location",
    },
    description: {
      fa: "پس از ثبت سفارش، محصول را در محل مورد نظر خود دریافت کنید.",
      ar: "بعد من تقديم الطلب، استلم المنتج في المكان الذي تختاره.",
      en: "After placing the order, receive the product at your chosen location.",
    }
  },
]

export const salesBenefits = [
  {
    name: {
      fa: "تخصص و تجربه",
      ar: "الخبرة والتخصص",
      en: "Expertise and Experience",
    },

    description: {
      fa: "تیم ما متشکل از کارشناسانی با سال‌ها تجربه در صنعت یو‌پی‌اس و موتورهای الکتریکی است.",
      ar: "فريقنا يتكون من خبراء ذوي سنوات من الخبرة في صناعة UPS والمحركات الكهربائية.",
      en: "Our team consists of experts with years of experience in the UPS and electric motor industry.",
    }
  },
  {
    name: {
      fa: "پشتیبانی کامل",
      ar: "دعم كامل",
      en: "Full Support",
    },

    description: {
      fa: "از زمان خرید تا مراحل تعمیر و نگهداری، در کنار شما خواهیم بود.",
      ar: "منذ الشراء وحتى مراحل الصيانة والإصلاح، نحن معك.",
      en: "From purchase to maintenance and repair stages, we will be with you.",
    }
  },
  {
    name: {
      fa: "محصولات باکیفیت",
      ar: "منتجات ذات جودة عالية",
      en: "High-Quality Products",
    },

    description: {
      fa: "تضمین اصالت و کیفیت تمامی محصولات.",
      ar: "ضمان الأصالة والجودة لجميع المنتجات.",
      en: "Guaranteed authenticity and quality for all products.",
    }
  },
]

export const providedProducts = [
  {
    name: {
      fa: "یو‌پی‌اس‌های خانگی و صنعتی",
      ar: "UPS المنزلية والصناعية",
      en: "Home and Industrial UPS",
    },

    description: {
      fa: "طیف گسترده‌ای از یو‌پی‌اس‌ها برای مصارف خانگی و صنعتی با توان‌ها و ویژگی‌های متنوع.",
      ar: "مجموعة واسعة من UPS للاستخدام المنزلي والصناعي مع قدرات وميزات متنوعة.",
      en: "A wide range of UPS for home and industrial use with diverse capacities and features.",
    },
  },
  {
    name: {
      fa: "باتری‌های یو‌پی‌اس و تجهیزات مرتبط",
      ar: "بطاريات UPS والمعدات ذات الصلة",
      en: "UPS Batteries and Related Equipment",
    },

    description: {
      fa: "انواع باتری‌های باکیفیت که تضمین‌کننده عملکرد بهینه یو‌پی‌اس شما هستند.",
      ar: "أنواع البطاريات عالية الجودة التي تضمن أداء UPS الأمثل.",
      en: "High-quality batteries that guarantee optimal performance of your UPS.",
    },
  },
  {
    name: {
      fa: "موتورهای الکتریکی",
      ar: "محركات كهربائية",
      en: "Electric Motors",
    },

    description: {
      fa: "موتورهای باکیفیت برای کاربردهای مختلف صنعتی و تجاری.",
      ar: "محركات عالية الجودة للاستخدامات الصناعية والتجارية المختلفة.",
      en: "High-quality motors for various industrial and commercial applications.",
    },
  },
];

export const chooseReasons = [
  {
    icon: IoBriefcaseOutline,
    title: {
      fa: "تخصص و تجربه",
      ar: "الخبرة والتخصص",
      en: "Expertise and Experience",
    },
    description: {
      fa: "تیم ما متشکل از کارشناسانی با سال‌ها تجربه در صنعت یو‌پی‌اس و موتورهای الکتریکی است.",
      ar: "فريقنا يتكون من خبراء ذوي سنوات من الخبرة في صناعة UPS والمحركات الكهربائية.",
      en: "Our team consists of experts with years of experience in the UPS and electric motor industry.",
    },
  },
  {
    icon: PiHeadset,
    title: {
      fa: "پشتیبانی کامل",
      ar: "دعم كامل",
      en: "Full Support",
    },
    description: {
      fa: "از زمان خرید تا مراحل تعمیر و نگهداری، در کنار شما خواهیم بود.",
      ar: "منذ الشراء وحتى مراحل الصيانة والإصلاح، نحن معك.",
      en: "From purchase to maintenance and repair stages, we will be with you.",
    },
  },
  {
    icon: CiCircleCheck,
    title: {
      fa: "محصولات باکیفیت",
      ar: "منتجات ذات جودة عالية",
      en: "High-Quality Products",
    },
    description: {
      fa: "تضمین اصالت و کیفیت تمامی محصولات.",
      ar: "ضمان الأصالة والجودة لجميع المنتجات.",
      en: "Guaranteed authenticity and quality for all products.",
    },
  },
];

export const services = [
  {
    image: "/images/static/work_with_atm.webp",
    title: {
      fa: "خدمات فروش",
      ar: "خدمات البيع",
      en: "Sales Services",
    },
    description: {
      fa: "ما طیف گسترده‌ای از محصولات یو‌پی‌اس، باتری‌های یو‌پی‌اس و موتورهای الکتریکی از برندهای معتبر جهانی را عرضه می‌کنیم. خدمات فروش ما شامل مشاوره تخصصی برای انتخاب بهترین محصول متناسب با نیازهای شماست.",
      ar: "نحن نقدم مجموعة واسعة من منتجات UPS وبطاريات UPS والمحركات الكهربائية من العلامات التجارية العالمية الموثوقة. تشمل خدماتنا الاستشارية لاختيار المنتج الأنسب لاحتياجاتك.",
      en: "We offer a wide range of UPS products, UPS batteries, and electric motors from reputable global brands. Our sales services include expert consultation to help choose the best product for your needs.",
    },
    link: "/services/sales",
  },
  {
    image: "/images/static/electric_maintanence.webp",
    title: {
      fa: "خدمات تعمیرات",
      ar: "خدمات الإصلاح",
      en: "Repair Services",
    },
    description: {
      fa: "تیم ما از تکنسین‌های متخصص و مجرب تشکیل شده است که خدمات تعمیر یو‌پی‌اس و موتورهای الکتریکی را با استفاده از بهترین تجهیزات و قطعات ارائه می‌دهند. کیفیت و سرعت عمل در تعمیرات اولویت ماست.",
      ar: "فريقنا مكون من فنيين متخصصين ذوي خبرة يقدمون خدمات إصلاح UPS والمحركات الكهربائية باستخدام أفضل المعدات والقطع. الجودة والسرعة في الإصلاح هي أولويتنا.",
      en: "Our team consists of skilled and experienced technicians providing UPS and electric motor repair services using the best equipment and parts. Quality and speed in repairs are our priority.",
    },
    link: "/services/repair",
    reverse: true,
  },
  {
    image: "/images/static/datacenter.webp",
    title: {
      fa: "خدمات پس از فروش",
      ar: "خدمات ما بعد البيع",
      en: "After-Sales Services",
    },
    description: {
      fa: "ما به اهمیت خدمات پس از فروش واقفیم و با ارائه خدماتی چون نصب، پشتیبانی فنی و نگهداری، همراه شما خواهیم بود تا تجهیزات شما همواره در بهترین شرایط عملیاتی باقی بمانند.",
      ar: "نحن ندرك أهمية خدمات ما بعد البيع ونقدم خدمات مثل التثبيت والدعم الفني والصيانة لضمان بقاء معداتك في أفضل حالة تشغيلية.",
      en: "We recognize the importance of after-sales services and provide services like installation, technical support, and maintenance to ensure your equipment remains in the best operational condition.",
    },
    link: "/services/after-sales",
  },
];

export const socialMediaItems = [
  {
    id: "instagram",
    name: {
      fa: "صفحه اینستاگرام",
      ar: "صفحة انستغرام",
      en: "Instagram Page",
    },

    address: "https://www.instagram.com/cowatt.clinic.ups/",
  },

  {
    id: "telegram",
    name: {
      fa: "کانال تلگرام",
      ar: "قناة تلغرام",
      en: "Telegram Channel",
    },

    address: "https://t.me/clinicups",
  },

  {
    id: "facebook",
    name: {
      fa: "حساب فیسبوک",
      ar: "حساب فيسبوك",
      en: "Facebook Account",
    },

    address: "https://www.facebook.com/hassan.zaree.56",
  },
];

export const contactItems = [
  {
    id: "mobile",

    icon: IoPhonePortraitOutline,

    name: {
      fa: "۰۹۱۲۲۲۰۱۱۶۰",
      ar: "٠٩١٢٢٢٠١١٦٠",
      en: "09122201160",
    },

    target: "_blank",

    address: "tel: +989122201160",
  },
  {
    id: "phone",

    icon: MdOutlinePhone,

    name: {
      fa: "۰۲۱-۶۶۴۶۴۷۴۵",
      ar: "٠٢١-٦٦٤٦٤٧٤٥",
      en: "021-66464745",
    },

    target: "_blank",

    address: "tel:+9892166464745",
  },
  {
    id: "email",

    icon: CiMail,

    name: {
      fa: "info@clinicups.com",
      ar: "info@clinicups.com",
      en: "info@clinicups.com",
    },

    target: "_blank",

    address: "mailto: info@clinicups.com",
  },
  {
    id: "telegram_chat",

    icon: LiaTelegram,

    name: {
      fa: "چت تلگرام",
      ar: "دردشة تلغرام",
      en: "Telegram Chat",
    },

    target: "_blank",

    address: "https://t.me/+989122201160",
  },
  {
    id: "whatsapp_chat",

    icon: FaWhatsapp,

    name: {
      fa: "چت واتس اپ",
      ar: "دردشة واتساب",
      en: "WhatsApp Chat",
    },

    target: "_blank",

    address: "https://wa.me/+989122201160",
  },
];
