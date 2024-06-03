import { useEffect, useState } from 'react';
import {Image} from 'next/image';
const NewsRecommendations = ({ user }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('/api/news/list');
      const data = await response.json();

      const filteredNews = data.news.filter(n =>
        user.interestedCategories.some(categoryId => categoryId.toString() === n.category._id.toString())
      );

      setNews(filteredNews);
    };

    fetchNews();
  }, [user]);

  return (
    <div>
      <h2>Recommended News</h2>
      {news.map(n => (
        <div key={n._id}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <Image src={n.imageUrl} alt={n.title} />
          <p><strong>Category:</strong> {n.category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsRecommendations;
