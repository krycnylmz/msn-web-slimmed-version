import dbConnect from '../../../lib/mongodb';
import News from '../../../models/News';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  try {
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: 'Haber bulunamadı' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
