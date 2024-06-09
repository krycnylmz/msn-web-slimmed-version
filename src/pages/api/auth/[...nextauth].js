import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/auth?response_type=code&prompt=consent&access_type=offline",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();

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
      await connectToDatabase();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user = {
          ...session.user,
          id: dbUser._id,
          name: dbUser.name,
          surname: dbUser.surname,
          country: dbUser.country,
          city: dbUser.city,
          likedNews: dbUser.likedNews,
          interestedCategories: dbUser.interestedCategories,
          notifications: dbUser.notifications,
        };
      }
      // Session token'ı loglamak
      console.log("Session token:", token);

      // Token bilgilerini session'a eklemek
      session.token = token;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        user = user;
      }
      // JWT token'ı loglamak
      console.log("JWT token-:", token);
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
