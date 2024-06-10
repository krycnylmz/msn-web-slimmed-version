import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code&prompt=consent&access_type=offline",
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        await dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
          { userId: user._id, name: user.name, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = new User({
          name: user.name || "N/A",
          surname: "",
          email: user.email,
          password: null,
          profileImage: user.image,
          country: "",
          city: "",
          likedNews: [],
          interestedCategories: [],
          notifications: true,
        });

        await newUser.save();
      }

      return true;
    },
    async session({ session, user, token }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user = {
          ...session.user,
          id: dbUser._id,
          name: dbUser.name,
          surname: dbUser.surname,
          country: dbUser.country,
          picture:dbUser.profileImage,
          city: dbUser.city,
          likedNews: dbUser.likedNews,
          interestedCategories: dbUser.interestedCategories,
          notifications: dbUser.notifications,
        };
      }
      session.token = token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.notifications = user.notifications;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
