"use client";

import Link from "next/link";
import clsx from "clsx";

export default function HeroBanner({
  type = "image",
  src,
  heading,
  subtext,
  textPlacement = "start",
  showConsult = true
}) {
  return (
    <section>
      {/* Fullwidth Hero Banner */}
      <div className="relative w-full h-[83vh] bg-gray-900">
        {/* Video or Image */}
        {type === "video" ? (
          <video
            className="w-full h-full object-cover"
            src={src}
            autoPlay
            muted
            loop
          ></video>
        ) : (
          <img
            className="w-full h-full object-cover"
            src={src}
            alt="Hero Banner"
          />
        )}
        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-15"></div>
        {/* Text Box */}
        <div
          className={clsx(
            "absolute inset-0 flex flex-col gap-4 px-6 py-4 text-white text-center",
            {
              "items-start justify-center": textPlacement === "start",
              "items-center justify-center": textPlacement === "center",
            }
          )}
        >
          <div className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur rounded-lg">
          <h1 className="text-4xl font-bold text-yellow-400">{heading}</h1>
          <p className="text-lg mt-2">{subtext}</p>
          </div>
        </div>
      </div>

      {/* Yellow Box Section */}
      <div className={`bg-yellow-400 text-center py-8 px-4 ${showConsult ? 'block' : 'hidden' }`}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
         نیاز به مشاوره دارید؟
        </h2>
        <Link
        href="/contact"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
          مشاوره رایگان
        </Link>
      </div>
    </section>
  );
}
