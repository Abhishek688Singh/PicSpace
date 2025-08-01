import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, role , workspaceId, friend_id } = await (req.json());
  // console.log(req);

  if (!name || !role) {
    return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
  } else {
    const session = await auth();

    if (session) {

      console.log(`friendId-->${friend_id}`)
      console.log(`workspaceid-->${workspaceId}`)
      try {
        const result = await pool.query(
          "INSERT INTO workspace_members \
           (member_name, role ,workspace_id , user_id) VALUES ($1, $2 ,$3 ,$4)",
          [name, role ,workspaceId, friend_id ]
        );
        return NextResponse.json({ message: 'Sucessfully created' }, { status: 201 })
      } catch (error) {
        return NextResponse.json({ message: 'Error !!' }, { status: 500 });
      }
    }

  }
}