"use client"
import { useState } from 'react';

const RSSImport = () => {
  const [rssUrl, setRssUrl] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [languageId, setLanguageId] = useState('66538085952d044056346bec');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/rss/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rssUrl,
        categoryName,
        languageId,
      }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Import News from RSS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RSS URL:</label>
          <input
            type="text"
            value={rssUrl}
            onChange={(e) => setRssUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Language ID:</label>
          <input
            type="text"
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Import</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RSSImport;
