// models/Language.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const LanguageSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.Language || mongoose.model('Language', LanguageSchema);
