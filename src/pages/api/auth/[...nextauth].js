import NextAuth from 'next-auth';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn(user, account, profile) {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: null, // Password is not required for Google authentication
          country: user.country, 
          city: user.city,
        });

        await newUser.save();
      }

      return true;
    },
  },
});
