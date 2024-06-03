"use client";

import { useRouter, useParams } from "next/navigation"; // 'useRouter' ve 'useParams' kullanın
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NewsDetail() {
  const params = useParams();
  const { id } = params;

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await fetch(`/api/news/${id}`);
          const data = await response.json();
          setNews(data);
        } catch (error) {
          console.error("Error fetching news:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!news) {
    return <p>Haber bulunamadı</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
      <Image
        src={news.imageUrl}
        alt={news.title}
        width={1920}
        height={1080}
        className="w-full h-auto mb-4"
      />
      <p className="text-sm text-gray-600 mb-4">Kaynak: {news.author}</p>
      <div className="prose">
        <p>{news.content}</p>
      </div>
      <Link href="/" className="text-blue-500 hover:underline mt-4 block">
        Anasayfaya dön
      </Link>
    </div>
  );
}
