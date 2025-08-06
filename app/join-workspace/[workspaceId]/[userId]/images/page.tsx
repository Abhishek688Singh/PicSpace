import React from 'react'

import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import Image2Gallery from "./image2gallery"
import { pool } from '@/lib/db';

const page = async ({ params }: { params: { workspaceId: string; userId: string } }) => {
  const session = await auth();
  if (!session) redirect("/login");

  const { workspaceId } = params;

  const memberFriendId = session.user.id;
  // console.log(`work-->${workspaceId}`)
  // console.log(`friend-->${memberFriendId}`)

  const accessResult = await pool.query(
    "SELECT status FROM workspace_members WHERE workspace_id = $1 AND user_id = $2",
    [workspaceId, memberFriendId]
  );

  // console.log("Access check:", accessResult.rows);

  if (!accessResult.rows[0] || accessResult.rows[0].status !== "active") {
    notFound(); // ✅ Now works properly
  }

  const result = await pool.query(
    "SELECT created_at ,content ,public_id FROM folder_items WHERE workspace_id = $1 AND shared_with = $2 AND type = 'image'",
    [workspaceId, memberFriendId]
  );
  const publicIds = result.rows;
  // console.log(publicIds)

  return (
    <div className='flex flex-col items-center
    pt-[150]  text-white h-[100vh]'>


      <hr className='w-[90%] border-[1px] bg-amber-50' />



      {/* IMAGE VIEWING COMPONENT */}
      <h1 className="text-2xl font-bold text-center mt-6">Images shared by the admin:</h1>

      {publicIds.length === 0 ? (
        <div className='flex flex-col items-center pt-[100] 
        text-bold text-teal-100  text-4xl'>
          <h1>No images have been shared by your admin yet.</h1>
        </div>
      ) : (
        <div>
          <Image2Gallery images={publicIds} />
        </div>
      )}




    </div>
  )
}

export default page