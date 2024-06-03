import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  likedNews: [{ type: Schema.Types.ObjectId, ref: 'News' }],
  interestedCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  notifications: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
