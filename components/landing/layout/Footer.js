"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white text-sm">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="text-center sm:text-start col-span-full lg:col-span-2">
          <div className="w-full flex items-center justify-between">
            <img
              src="/images/logo-black.png"
              alt="Brand Logo"
              className="w-32 h-auto object-contain"
            />

            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=609892&Code=phEhwYC4lQ1MKfafUix4t5xoyC9bDpe3"
            >
              <img
                referrerPolicy="origin"
                src="/images/enamad.png"
                alt=""
                code="phEhwYC4lQ1MKfafUix4t5xoyC9bDpe3"
                className="cursor-pointer w-16 h-auto"
              />
            </a>
          </div>
          <h2 className="text-xl mt-2 font-semibold">
            کلینیک یو پی اس
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            با بیش از ۲۲ سال تجربه در ارائه راهکارهای برق اضطراری، برای آسودگی و پایداری کسب‌وکار شما تلاش می‌کنیم.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-center sm:text-start mb-4">
            لینک‌های اصلی
          </h3>
          <ul className="space-y-2">
            <li className="text-center sm:text-start">
              <Link href="/" className="hover:text-gray-300">
                صفحه اصلی
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link href="/categories" className="hover:text-gray-300">
                محصولات
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link href="/about" className="hover:text-gray-300">
                درباره ما
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link href="/contact" className="hover:text-gray-300">
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-center sm:text-start mb-4">
            خدمات ما
          </h3>
          <ul className="space-y-2">
            <li className="text-center sm:text-start">
              <Link href="/services" className="hover:text-gray-300">
                همه خدمات
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link href="/services/sales" className="hover:text-gray-300">
                فروش
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link href="/services/repair" className="hover:text-gray-300">
                تعمیر
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link
                href="/services/after-sales"
                className="hover:text-gray-300"
              >
                خدمات پس از فروش
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-center sm:text-start mb-4">
            پروژه‌ها
          </h3>
          <ul className="space-y-2">
            <li className="text-center sm:text-start">
              <Link href="/projects" className="hover:text-gray-300">
                همه ی پروژه ها
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link
                href="/projects/server-room"
                className="hover:text-gray-300"
              >
                دیتاسنتر آموزش و پرورش
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link
                href="/projects/surgery-room"
                className="hover:text-gray-300"
              >
                اتاق عمل
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link
                href="/projects/portable-server-room"
                className="hover:text-gray-300"
              >
                دیتاسنتر پرتابل
              </Link>
            </li>
            <li className="text-center sm:text-start">
              <Link
                href="/projects/power-plant"
                className="hover:text-gray-300"
              >
                نیروگاه برق
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-center sm:text-start mb-4">
            اطلاعات تماس
          </h3>
          <ul className="space-y-2">
            <li className="text-center sm:text-start">
              <p>آدرس: تهران، ایران</p>
            </li>
            <li className="text-center sm:text-start">
              <p>موبایل: ۰۹۱۲۲۲۰۱۱۶۰</p>
            </li>
            <li className="text-center sm:text-start">
              <p>تلفن ثابت: ۰۲۱-۶۶۴۶۴۷۴۵</p>
            </li>
            <li className="text-center sm:text-start">
              <p>ایمیل: info@clinicups.com</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-400 text-center py-4">
        <p className="text-gray-900">
          &copy; {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
