// auth.ts
import NextAuth from "next-auth";
import { authOptions as baseAuthOptions } from "./app/api/auth/[...nextauth]/authOptions";

import type { NextAuthConfig } from "next-auth";
// import { authOptions } from ;

export const authOptions: NextAuthConfig = {
  ...baseAuthOptions,
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
