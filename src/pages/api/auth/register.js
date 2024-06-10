import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function register(req, res) {
  const { name, surname, email, password, country, city } = req.body;

  console.log('Received data:', req.body);

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      country,
      city
    });

    console.log('User to be saved:', user); // Kaydedilecek kullanıcıyı logla

    await user.save();

    console.log('User saved successfully');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error); // Hata mesajını logla
    res.status(500).json({ message: 'Something went wrong' });
  }
}
