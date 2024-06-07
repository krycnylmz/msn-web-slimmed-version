import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";
import useUserStore from "../../../app/store/useUserStore"; // Store'un doğru yolunu ayarlayın

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

      const setUser = useUserStore.getState().setUser;
      const setToken = useUserStore.getState().setToken;

      setUser({
        name: user.name,
        email: user.email,
        profileImage: user.image,
      });

      setTimeout(() => {
        const userState = useUserStore.getState().user;
        console.log('User state after setTimeout:', userState);
      }, 500);

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

      setToken(account.accessToken);

      return true;
    },
    async session({ session, token }) {
      await connectToDatabase();
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user = {
          ...session.user,
          id: user._id,
          name: user.name,
          surname: user.surname,
          country: user.country,
          city: user.city,
          likedNews: user.likedNews,
          interestedCategories: user.interestedCategories,
          notifications: user.notifications,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
