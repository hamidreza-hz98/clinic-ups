"use client";

import { FaRegFilePdf } from "react-icons/fa";
import { useState } from "react";

const CatalogueThumbnail = ({ heading = "", downloadLink = "", images= [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="pt-4 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      <p className="text-xl font-semibold text-start">{heading}</p>

        <a
          href={downloadLink}
          target="_blank"
          download
          rel="noopener noreferrer"
          className="flex items-center mt-4 md:mt-0 text-blue-900 text-xs hover:text-blue-600 transition"
        >
          <FaRegFilePdf size={16} className="me-1" />

         دانلود فایل پی‌دی‌اف
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              alt={`Catalogue Image ${index + 1}`}
              className="w-full rounded-lg shadow hover:scale-105 transform transition"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed -top-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
          <div className="relative max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 text-sm p-2 hover:bg-opacity-75 transition"
              onClick={closeImage}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected Catalogue Image"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogueThumbnail;
