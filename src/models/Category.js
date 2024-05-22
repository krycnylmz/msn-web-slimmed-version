// models/Category.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
