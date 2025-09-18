# PicSpace
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Abhishek688Singh/PicSpace)

PicSpace is a full-stack web application built with Next.js that provides users with private, invite-only digital spaces. It's designed for secure collaboration, allowing you to create workspaces, invite members, and share content like images and notes with granular control.

## ✨ Features

-   **Secure Authentication**: Dual sign-in with credentials (email/password) and Google OAuth, powered by NextAuth.js. Includes email verification on signup.
-   **Private Workspaces**: Create, manage, and delete your own private "Pic-Spaces". Each space is protected by a unique invite code.
-   **Member Management**: As a space admin, you can view all members, revoke their access, or completely remove them and their associated content from the space.
-   **Content Sharing**:
    -   **Images**: Seamlessly upload images to Cloudinary, view them in a responsive gallery with a lightbox, and delete them when no longer needed.
    -   **Notes**: Create, view, and delete text-based notes for sharing ideas, plans, or messages within a space.
-   **Role-Based Access**: Clear distinction between an `admin` (the creator of a space) and a `member`, ensuring proper permissions.
-   **Dynamic UI**: A modern and fluid user interface built with Tailwind CSS, Shadcn UI, and Framer Motion for a rich, responsive experience.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **Image & Media**: [Cloudinary](https://cloudinary.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## ⚙️ Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

-   Node.js (v20 or later)
-   npm, yarn, or pnpm
-   A PostgreSQL database
-   A Cloudinary account
-   A Kickbox account (for email verification)

### 1. Clone the Repository

```bash
git clone https://github.com/abhishek688singh/picspace.git
cd picspace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following variables. Replace the placeholder values with your actual credentials.

```env
# PostgreSQL Database Connection String
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key" # Generate a secret: "openssl rand -base64 32"

# Google OAuth Credentials
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Cloudinary Credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Kickbox API Key (for email verification on signup)
KICKBOX_API="your-kickbox-api-key"
```

### 4. Database Setup

This project uses a PostgreSQL database. You need to create the tables manually before running the application. Connect to your database and execute the following SQL commands to create the necessary schema:

```sql
-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    user_image VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workspaces (Pic-Spaces)
CREATE TABLE workspace (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_id INTEGER REFERENCES users(id),
    invite_code VARCHAR(255) UNIQUE NOT NULL,
    about_space TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Members within a workspace
CREATE TABLE workspace_members (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER REFERENCES workspace(id),
    user_id INTEGER REFERENCES users(id),
    member_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'member', -- e.g., 'admin', 'member'
    status VARCHAR(50) DEFAULT 'active', -- e.g., 'active', 'left', 'removed'
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    left_at TIMESTAMPTZ
);

-- Items shared in a folder/workspace (images, notes)
CREATE TABLE folder_items (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER REFERENCES workspace(id),
    uploaded_by INTEGER REFERENCES users(id),
    shared_with INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- 'image', 'note'
    content TEXT, -- For notes
    public_id VARCHAR(255), -- For Cloudinary images
    file_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

-   `app/`: Contains all the routes, pages, and API endpoints following the Next.js App Router structure.
    -   `app/api/`: Backend API routes for handling all server-side logic.
    -   `app/dashbord/`: Pages related to the user's main dashboard, including owned and joined spaces.
    -   `app/create-workspace/`: Flow for creating a new Pic-Space.
    -   `app/join-workspace/`: Flow for joining an existing Pic-Space.
    -   `app/(login|register)/`: Authentication pages.
-   `components/`: Shared React components used across the application, including UI elements from `shadcn/ui`.
-   `lib/`: Utility functions, database connection (`db.ts`), and Cloudinary configuration.
-   `auth.ts`: Configuration file for NextAuth.js, defining authentication providers and callbacks.
-   `types/`: TypeScript type definitions.
