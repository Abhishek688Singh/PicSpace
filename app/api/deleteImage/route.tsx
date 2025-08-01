import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function POST(req: Request) {
    const { public_id } = await req.json();

    const session = await auth();

    if (!session) return NextResponse.json({ message: "Unauthorized", status: 401 });

    if (!public_id) {
        return NextResponse.json({ message: 'Missing public_id' }, { status: 400 });
    }

    try {
        const result = await cloudinary.uploader.destroy(public_id);
        pool.query("DELETE FROM folder_items WHERE public_id = $1",[public_id]);
        return NextResponse.json({ message: "Deleted Sucessfully.", status: 204 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting Image.", status: 500 });
    }
}