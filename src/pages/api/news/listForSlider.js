// pages/api/news/listForSlider.js
import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    // Son 15 haberi sıralı almak için aggregate kullanılıyor
    const newsList = await News.aggregate([
      { $sort: { createdAt: -1 } }, // Önce en yeni haberleri sıralıyoruz
      { $limit: 15 }, // Son 15 haberi alıyoruz
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'language',
          foreignField: '_id',
          as: 'language'
        }
      },
      { $unwind: '$category' },
      { $unwind: '$language' }
    ]);

    res.status(200).json({ news: newsList });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
