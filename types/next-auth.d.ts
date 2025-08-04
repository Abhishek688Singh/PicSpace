// types/next-auth.d.ts or anywhere globally accessible
import { auth } from "@/auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }

  interface JWT {
    id: string;
  }
}

type Workspace = {
  left_at : string;
  status :string;
  workspace_id: any;
  user_name: any;
  role: any;
  user_image: string;
  email: any;
  user_id: any;
  member_name: any;
  membership_id: any;
  id: string;
  name: string;
  admin_id: string;
  invite_code: string;
  about_space: string | null;
  created_at: Date; // or `Date` depending on how you want to handle timestamps
};


type Card = {
  id: string;
  name: string;
  about_space: string;
  src: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  content: string;
};

type CardProps = {
  id: string;
  name: string;
  about_space: string;
  src: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  content: string;
};

