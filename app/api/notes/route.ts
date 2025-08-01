import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { note, workspaceId, memberFriendId } = await (req.json());
    const session = await auth();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const user_id = session?.user.id;
    try {
        const result = await pool.query("INSERT INTO folder_items \
           (type, content ,file_url ,uploaded_by , shared_with ,workspace_id ,public_id) \
            VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7)",
            ['note', note, "null-file", user_id, memberFriendId, workspaceId ,null]);

        return NextResponse.json({ message: "Note created", status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "DB create note error ", status: 500 });
    }

}


export async function DELETE(req: NextRequest) {
    const { workspaceId, id } = await (req.json());
    // console.log(`work---${workspaceId}`)
    // console.log(`id---${id}`)
    const session = await auth();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized", status: 401 })
    }

    try {
        await pool.query("DELETE FROM folder_items \
            WHERE id = $1 AND workspace_id = $2", [id, workspaceId]);
        return NextResponse.json({massage:"Deleted Sucessfully" , status:204});
    } catch (err) {
        return NextResponse.json({message:"DB delete note Error !!" ,status:500});
    }
}