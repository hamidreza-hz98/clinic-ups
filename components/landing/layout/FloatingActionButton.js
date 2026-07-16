"use client";

import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import React, { useState } from "react";

import { IoPhonePortraitOutline } from "react-icons/io5";

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded && (
        <div
        className="mb-4 space-y-1"
        style={{ animation: "fadeIn 0.5s ease-out" }}
        >
          <a
            href="tel: +989122201160"
            className="flex items-center bg-purple-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <IoPhonePortraitOutline size={20} className="mx-2" />
            تماس تلفنی
          </a>

          <a
            href="tel: +9892166464745"
            className="flex items-center bg-indigo-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaPhone size={20} className="mx-2" />
            تلفن ثابت
          </a>

          <a
            href="https://www.instagram.com/cowatt.clinic.ups/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaInstagram size={20} className="mx-2" />
            اینستاگرام
          </a>

          <a
            href="mailto: info@clinicups.com"
            className="flex items-center bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaEnvelope size={20} className="mx-2" />
            ارسال ایمیل
          </a>

          <a
            href="https://www.facebook.com/hassan.zaree.56"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaFacebook size={20} className="mx-2" />
            فیسبوک
          </a>

          <a
            href="https://t.me/clinicups"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaTelegram size={20} className="mx-2" />
            کانال تلگرام
          </a>

          <a
            href="https://t.me/+989122201160"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaTelegram size={20} className="mx-2" />
            چت تلگرام
          </a>

          <a
            href="https://wa.me/+989122201160"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            <FaWhatsapp size={20} className="mx-2" />
            چت واتس اپ
          </a>
        </div>
      )}

      <button
        onClick={toggleMenu}
        className={`w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 ${
          !isExpanded && "phone-widget"
        }`}
        aria-label="Toggle menu"
      >
        {isExpanded ? "✕" : <FaPhone size={20} />}
      </button>

      <style jsx>{`
        .phone-widget {
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.5); /* yellow-400 */
          animation: glow 5s infinite alternate;
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(234, 179, 8, 0.5),
              /* light yellow glow */ 0 0 20px rgba(234, 179, 8, 0.5);
          }
          100% {
            box-shadow: 0 0 20px rgba(234, 179, 8, 0.8),
              /* stronger yellow glow */ 0 0 30px rgba(234, 179, 8, 0.8);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingActionButton;
