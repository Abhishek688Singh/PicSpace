import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, enterInvite_code, workspaceId, friend_id } = await (req.json());
    // console.log(req);

    if (!name || !enterInvite_code || !workspaceId || !friend_id) {
        return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    } else {

        const realInviteCode = await pool.query("SELECT invite_code \
            FROM workspace WHERE id =$1", [workspaceId]);

        if (realInviteCode.rows[0].invite_code === enterInvite_code) {
            try {
                const result = await pool.query(
                    "INSERT INTO workspace_members \
                    (member_name, role ,workspace_id , user_id) VALUES ($1, $2 ,$3 ,$4)",
                    [name, 'member', workspaceId, friend_id]
                );
                return NextResponse.json({ message: 'Sucessfully Joined' }, { status: 201 })
            } catch (error) {
                return NextResponse.json({ message: 'Error joining pic-space !!' }, { status: 500 });
            }
        }else{
            return NextResponse.json({message:"Invalid credientials" , status:400})
        }

        //   console.log(`friendId-->${friend_id}`)
        //   console.log(`workspaceid-->${workspaceId}`)

    }

}
