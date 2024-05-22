// src/pages/api/news/recommend.js
import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate('interestedNews');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const categories = user.interestedNews.map(news => news.category);
    const uniqueCategories = [...new Set(categories)];

    const recommendedNews = await News.find({ category: { $in: uniqueCategories }, _id: { $nin: user.interestedNews } });

    res.status(200).json({ recommendedNews });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
