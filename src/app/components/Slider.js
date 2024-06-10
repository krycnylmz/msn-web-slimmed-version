"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Burada doğru içe aktarıldı

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Slaytların 3 saniyede bir otomatik geçiş yapması

    return () => {
      clearInterval(interval); // Zamanlayıcıyı bileşen demonte edilirken temizlemek
    };
  }, [currentIndex, nextSlide]);

  if (!slides || slides.length === 0) {
    return <div className="text-center">No images available</div>;
  }

  return (
    <div className="relative mx-auto h-96 rounded-md overflow-hidden">
      <Link
        href={`/news/${slides[currentIndex]?._id}`}
        className="text-lg font-bold group-hover:underline"
      >
        <div className="overflow-hidden group cursor-pointer">
          <Image
            src={slides[currentIndex]?.imageUrl}
            alt={`slide-${currentIndex}`}
            width={1920}
            height={1080}
            className="w-full h-96 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent bg-opacity-50 text-white p-4 w-full">
            {slides[currentIndex]?.title}
            <p className="text-sm">{slides[currentIndex]?.author}</p>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {slides.map((slide, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`block h-2 rounded-full cursor-pointer ${
              index === currentIndex ? "w-8 bg-gray-100" : "w-2 bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-300 text-gray-800 px-1 py-4 opacity-60 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-300 text-gray-800 px-1 py-4 opacity-60 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
