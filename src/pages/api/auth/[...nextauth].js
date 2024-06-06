import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code&prompt=consent&access_type=offline',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
    
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = new User({
          name: user.name || 'N/A', // Zorunlu alan, boş olmamalı
          surname: user.surname || '', // Opsiyonel alan
          email: user.email,
          password: null, // Password is not required for Google authentication
          country: '', // Varsayılan değer
          city: '', // Varsayılan değer
          likedNews: [],
          interestedCategories: [],
          notifications: true,
        });
    
        await newUser.save();
      }
    
      return true;
    },    
    async session({ session, token }) {
      // Add user id to session
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      // Persist the user id to the token right after signin
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});
