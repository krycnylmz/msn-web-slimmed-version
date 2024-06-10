import dbConnect from "@/lib/mongodb";
import News from "@/models/News"; // Haber modelinizi buraya ekleyin

export default async function handler(req, res) {
  const { query } = req.query;

  await dbConnect();

  const results = await News.find({ title: new RegExp(query, "i") });
  const categories = [...new Set(results.map((news) => news.category))];
  const total = results.length;

  res.status(200).json({ results, categories, total });
}
