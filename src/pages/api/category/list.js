// pages/api/news/list.js
import dbConnect from '../../../lib/mongodb';
import Category from '../../../models/Category';
import News from '../../../models/News';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const categoriesWithNews = await Category.aggregate([
      {
        $lookup: {
          from: 'news',
          localField: '_id',
          foreignField: 'category',
          as: 'newsList'
        }
      },
      {
        $match: {
          'newsList.0': { $exists: true }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          newsList: 1
        }
      }
    ]);

    res.status(200).json({ categories: categoriesWithNews });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
