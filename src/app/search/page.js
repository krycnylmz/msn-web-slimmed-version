"use client"; // Client Component olarak işaretliyoruz

import { useRouter } from "next/navigation"; // next/navigation kullanıyoruz
import { useState, useEffect } from "react";
import CardMd from "@/components/CardMd";
import { getNewsByQuery } from "@/lib/api"; // Bu fonksiyon, haberleri sorguya göre getirecek API çağrısı yapar

const Search = () => {
  const router = useRouter();
  const query = router.query?.query || ""; // query'yi router'dan alıyoruz
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (query) => {
    const { results, categories, total } = await getNewsByQuery(query);
    setSearchResults(results);
    setCategories(categories);
    setTotalResults(total);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {totalResults} results found for {query}
      </h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex flex-row gap-4 flex-wrap">
          {categories.map((category, index) => (
            <span key={index} className="bg-blue-200 p-2 rounded-lg">
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {searchResults.map((result, index) => (
          <CardMd
            key={index}
            imgSrc={result.imgSrc}
            title={result.title}
            source={result.source}
            link={result.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
