// pages/api/news/add.js
import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { title, content, imageUrl, categoryId, author } = req.body;

    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const newNews = new News({
        title,
        content,
        imageUrl,
        category: category._id,
        author,
      });

      await newNews.save();
      res.status(201).json({ message: 'News created', news: newNews });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
