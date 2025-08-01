import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { pool } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: 'jwt',   // or 'database'
    maxAge: 60*60*60,
    // updateAge: 0, // how often the session is refreshed
  },
   callbacks: {
    async signIn({ user }) {
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [user.email]
      );

      if (existingUser.rows.length === 0) {
        await pool.query(
          "INSERT INTO users (name, email, password_hash, user_image) VALUES ($1, $2, $3, $4)",
          [user.name, user.email, 'Google', user.image]
        );
      }

      return true;
    },

    async jwt({ token }) {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        token.email,
      ]);
      if (result.rows.length > 0) {
        token.id = result.rows[0].id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },



})