import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { workspaceId, userId ,friendId } = await req.json();  //userid---friend id who want to left

    console.log("hi")
    const session = await auth();

    if (!session) return NextResponse.json({ message: "Unauthorized", status: 401 });
    // console.log(workspaceId)
    if (!workspaceId || !userId) {

        console.log("hello")
        return NextResponse.json({ message: 'credientials', status: 400 });
    }

    let cause = ""
    try {
        // const result = await pool.query("SELECT role FROM workspace_members WHERE workspace_id = $1 AND user_id = $2", [workspaceId, userId]);
        // const { role } = result.rows[0];
        // console.log(result.rows[0])
        const adm_id = await pool.query("SELECT admin_id FROM workspace WHERE id = $1", [workspaceId]);
        const { admin_id } = adm_id.rows[0]


        if (admin_id === userId) {
            cause = "removed"
            try {
                await pool.query(
                    `UPDATE workspace_members
                SET status = $1, left_at = $2
                WHERE workspace_id = $3 AND id = $4`,
                    [cause, new Date(), workspaceId, friendId]
                );
                return NextResponse.json({ message: 'You removed this member from your Pic-Space', status: 204 })
            } catch (err) {
                return NextResponse.json({ message: 'Error removing member', status: 500 })
            }
        } else {
            cause = "left"
            try {
                await pool.query(
                    `UPDATE workspace_members
                SET status = $1, left_at = $2
                WHERE workspace_id = $3 AND user_id = $4`,
                    [cause, new Date(), workspaceId, userId]
                );
                return NextResponse.json({ message: 'You left the Pic-Space', status: 204 })
            } catch (err) {
                return NextResponse.json({ message: 'Error left Pic-Space', status: 500 })
            }
        }


    } catch (err) {
        console.log(err);
        // console.log("err")
        return NextResponse.json({ message: 'Error Space', status: 500 })
    }
}