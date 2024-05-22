import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const newsList = await News.find().populate('category', 'name').exec();
    res.status(200).json({ news: newsList });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
