import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {

        const email = credentials?.email?.toString() || "";
        const password = credentials?.password?.toString() || "";

        console.log(email)
        console.log(password)

        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];
        
        if (!user) {
          throw new Error("No user found with that email");
        }

         if (user.password_hash === "Google") {
          throw new Error("This account uses Google Sign-In. Please use Google to log in.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      ,
    })
  ],

  pages: {
    signIn: "/login", // ⬅️ optional, tells NextAuth where your custom login page is
  },

  session: {
    strategy: 'jwt',   // or 'database'
    maxAge: 60 * 60,
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