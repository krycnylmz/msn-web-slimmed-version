const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false }, // Zorunlu değil
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Zorunlu değil
  country: { type: String, required: false }, // Zorunlu değil
  city: { type: String, required: false }, // Zorunlu değil
  profileImage: { type: String, required: false, default:null }, // Zorunlu değil
  likedNews: { type: [String], default: [] },
  interestedCategories: { type: [String], default: [] },
  notifications: { type: Boolean, default: true },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
