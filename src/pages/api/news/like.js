// src/pages/api/news/like.js
import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { userId, newsId } = req.body;

  try {
    const user = await User.findById(userId);
    const news = await News.findById(newsId);

    if (!user || !news) {
      return res.status(404).json({ message: 'User or News not found' });
    }

    if (!user.likedNews.includes(newsId)) {
      user.likedNews.push(newsId);
      news.likes += 1;
      await user.save();
      await news.save();
    }

    res.status(200).json({ message: 'News liked' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
