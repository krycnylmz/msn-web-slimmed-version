"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "@/components/Slider";
import CardMd from "@/components/CardMd";
import { useTranslation } from 'next-i18next';


export default function Home() {
  const [sliderNews, setSliderNews] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsResponse, categoryResponse, weatherResponse] =
          await Promise.all([
            fetch("api/news/listForSlider"),
            fetch("api/category/list"),
            fetch("/api/weather/getCurrent?lat=38.4237&lon=27.1428"), // İzmir, Buca koordinatları
          ]);

        const newsData = await newsResponse.json();
        const categoryData = await categoryResponse.json();
        const weatherData = await weatherResponse.json();

        setSliderNews(newsData.news);
        setNewsCategories(categoryData.categories);
        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className=" ">
      {/* slider-top-nav */}
      <div className="flex flex-row overflow-x-auto items-center gap-2 py-2">
        <div className="flex flex-row items-center gap-2">
          {weather ? (
            <span>
              {weather.name} / {parseFloat((weather.main.temp - 273.15).toFixed(2))}°C
            </span>
          ) : (
            "Weather data not available"
          )}
          <span>|</span>
        </div>
        <ul className="flex flex-row gap-3">
          {newsCategories.map((category, index) => (
            <li
              key={index}
              className="text-sm font-semibold hover:underline transition-all cursor-pointer"
            >
              <Link href="/" className="uppercase">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full grid grid-cols-4 mt-4 gap-4">
        {/* slider */}
        <div className="col-span-4 sm:col-span-2">
          <Slider slides={sliderNews} />
        </div>
        <div className="col-span-2 sm:col-span-1 gap-2 grid grid-rows-2 h-full">
          <CardMd
            imgSrc={sliderNews[0]?.imageUrl}
            title={sliderNews[0]?.title}
            source={sliderNews[0]?.source}
            link={`/news/${sliderNews[0]?._id}`}
          />
          <CardMd
            imgSrc={sliderNews[1]?.imageUrl}
            title={sliderNews[1]?.title}
            source={sliderNews[1]?.source}
            link={`/news/${sliderNews[1]?._id}`}
          />
        </div>
        <CardMd
          imgSrc={sliderNews[2]?.imageUrl}
          title={sliderNews[2]?.title}
          source={sliderNews[2]?.source}
          link={`/news/${sliderNews[2]?._id}`}
        />
      </div>
    </div>
  );
}
