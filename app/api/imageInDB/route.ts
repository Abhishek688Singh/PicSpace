import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { public_id, workspaceId, memberFriendId } = await req.json();

    if (!public_id || !memberFriendId) {
        return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    } else {
        const session = await auth();

        if (session) {

            const user_id = session?.user.id;
            try {
                const result = await pool.query("INSERT INTO folder_items \
           (type, content ,file_url ,uploaded_by , shared_with ,workspace_id ,public_id) \
            VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7)",
                    ['image', null, 'null-file', user_id, memberFriendId, workspaceId ,public_id]);

                return NextResponse.json({ message: "Image Uploaded", status: 201 });

            } catch (err) {
                console.log(err);
                return NextResponse.json({ message: "DB image upload error ", status: 500 });
            }
        }

    }
}


