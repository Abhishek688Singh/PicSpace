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
    const { workspaceId, userId } = await req.json();
    // console.log("hi")
    const session = await auth();
    const client = await pool.connect();

    if (!session) return NextResponse.json({ message: "Unauthorized", status: 401 });

    if (!workspaceId || !userId) {
        // console.log("hello")
        return NextResponse.json({ message: 'Missing public_id' , status: 400 });
    }
    try {
        const result = await pool.query("SELECT admin_id FROM workspace WHERE id = $1", [workspaceId]);
        const { admin_id } = result.rows[0];

        if (admin_id !== userId) return NextResponse.json({ message: "Forbidden", status: 403 });

        try {
            // console.log(1)
            await client.query("BEGIN");
            const res = await client.query(
                `SELECT public_id, type FROM folder_items WHERE workspace_id = $1`,
                [workspaceId]
            );

            const publicIds: string[] = res.rows
                .filter(row => (row.type === "image" || row.type === "video") && row.public_id)
                .map(row => row.public_id);
// console.log(2)
            // 2. Delete media from Cloudinary
            if (publicIds.length > 0) {
                // console.log("cloud")

                await cloudinary.api.delete_resources(publicIds);
                // console.log(3)
            }

            await client.query(
                `DELETE FROM folder_items WHERE workspace_id = $1`,
                [workspaceId]
            );
// console.log(4)
            await client.query(
                `DELETE FROM workspace_members WHERE workspace_id = $1`,
                [workspaceId]
            );

// console.log(5)
            await client.query(
                `DELETE FROM workspace WHERE id = $1`,
                [workspaceId]
            );

            await client.query("COMMIT");
// console.log(6)
            return NextResponse.json({ message: 'Deleted Sucessfully.' , status: 204 });



        } catch (error) {
            await client.query("ROLLBACK");
            // console.log(7)
            console.error("Workspace deletion failed:", error);
            return NextResponse.json({ message: 'Error deleting Pic-Space' , status: 500 });
        } finally {
            // console.log(8)
            client.release();
        }

    }catch(err){
        console.log(err);
        // console.log("err")
        return NextResponse.json({ message: 'Error deleting Space' , status: 500 })
    }
}