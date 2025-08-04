import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, enterInvite_code, workspaceId, friend_id } = await (req.json());
    // console.log(req.json());
    //let yourself as a member -- then friend_id is your "user id" which is
    //sended by frontend
    //now you have to fetch all data from 'workspace' table and check that
    //is "admin_id" from "workspace" and "friend_id" are not equal .
    //if equal send 403

    try {
        const workspaceData = await pool.query("SELECT * FROM workspace WHERE id = $1", [workspaceId]);
        // console.log(workspaceData);
        const data = workspaceData.rows[0];
        if (data.admin_id === friend_id) {
            return NextResponse.json({ message: 'You are the admin, you cant join your space', status: 403 });
        }
    } catch (err) {
        console.log(err)
    }


    if (!name || !enterInvite_code || !workspaceId || !friend_id) {

        return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    } else {

        const realInviteCode = await pool.query("SELECT invite_code \
            FROM workspace WHERE id =$1", [workspaceId]);

        if (realInviteCode.rows[0].invite_code === enterInvite_code) {
            ///CHECK IS MEMBER EXIST PREVIOUSLY OR NOT 
            try {
                const memberHistory = await pool.query("SELECT * FROM workspace_members WHERE user_id = $1 AND workspace_id =$2", [friend_id, workspaceId]);
                // console.log(workspaceData);
                const data = memberHistory.rows;
                // console.log(data)
                if (data.length === 0) {  //member does'nt joined previously
                    // console.log(2)
                    try {
                        await pool.query(
                            "INSERT INTO workspace_members \
                            (member_name, role ,workspace_id , user_id) VALUES ($1, $2 ,$3 ,$4)",
                            [name, 'member', workspaceId, friend_id]
                        );
                        return NextResponse.json({ message: 'Sucessfully Joined' }, { status: 201 })
                    } catch (error) {
                        return NextResponse.json({ message: 'Error joining pic-space !!' }, { status: 500 });
                    }


                } else {//member alrady exist in past
                    // console.log(3)
                    await pool.query(
                        `UPDATE workspace_members
                        SET status = 'active', left_at = $1
                        WHERE workspace_id = $2 AND user_id = $3`,
                        [null, workspaceId, friend_id]
                    );
                    // console.log(4)
                    return NextResponse.json({ message: "Rejoined", status: 201 })

                }
            } catch (err) {
                console.log(err)
            }
        } else {
            return NextResponse.json({ message: "Invalid credientials", status: 400 })
        }

        //   console.log(`friendId-->${friend_id}`)
        //   console.log(`workspaceid-->${workspaceId}`)

    }

}
