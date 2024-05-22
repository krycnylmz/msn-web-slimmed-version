import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}
