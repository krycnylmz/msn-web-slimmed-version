import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';
import Category from '../../../models/Category';
import Language from '../../../models/Language';
import Parser from 'rss-parser';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  await dbConnect();
  const parser = new Parser();

  if (req.method === 'POST') {
    const { rssUrl, categoryName, languageId } = req.body;

    try {
      // Kategoriyi kontrol et ve eğer yoksa oluştur
      let category = await Category.findOne({ name: categoryName });
      if (!category) {
        category = new Category({ name: categoryName });
        await category.save();
      }

      // Dili kontrol et
      const language = await Language.findById(languageId);
      if (!language) {
        return res.status(404).json({ message: 'Language not found' });
      }

      const feed = await parser.parseURL(rssUrl);
      const newsItems = feed.items.slice(0, 10); // İlk 10 haberi al

      console.log(`Category: ${category.name}, Language: ${language.name}`);

      const newsData = newsItems.map(item => {
        let imageUrl = '';
        if (item.content) {
          const $ = cheerio.load(item.content);
          imageUrl = $('img').attr('src') || '';
        }
        
        return {
          title: item.title,
          content: item.contentSnippet || item.content || item.summary || '',
          imageUrl: imageUrl,
          category: category._id,
          language: language._id,
          author: item.author || item.creator || 'Unknown',
          publishedDate: new Date(item.pubDate)
        };
      });

      const newNews = await News.insertMany(newsData);
      console.log(`Inserted news: ${JSON.stringify(newNews)}`);

      res.status(201).json({ message: 'News created', news: newNews });
    } catch (error) {
      console.error(`Error: ${error.message}`, error); // Hata detaylarını loglayın
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
