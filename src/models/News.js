import mongoose from 'mongoose';

const { Schema } = mongoose;

const NewsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl:{ type: String, required: true},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, 
  author: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model('News', NewsSchema);
