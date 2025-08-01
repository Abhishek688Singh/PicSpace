import React from 'react'

import Images from './ImageUpload';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import { pool } from '@/lib/db';

const page = async ({ params }: {
  params: { 'workspace-id': string; details: string };
}) => {
  const session = await auth();
  if (!session) redirect("/login");

  const { 'workspace-id': workspaceId, details: memberFriendId } = params;

  const result = await pool.query(
    "SELECT created_at ,content ,public_id FROM folder_items WHERE workspace_id = $1 AND shared_with = $2 AND type = 'image'",
    [workspaceId, memberFriendId]
  );
  const publicIds = result.rows;

  return (
    <div className='flex flex-col items-center
    pt-[150] bg-black text-white h-[100vh]'>

      {/* image uploading component */}
      <Images workspaceId={workspaceId} memberFriendId={memberFriendId} />
      
<hr className='w-[90%] border-[1px] bg-amber-50' />



      {/* IMAGE VIEWING COMPONENT */}
      <h1 className="text-2xl font-bold text-center mt-6">User Uploaded Images :</h1>
      
      { publicIds.length === 0  ? (
        <div className='flex flex-col items-center pt-[100] 
        text-bold text-teal-100  text-4xl'>
          <h1>NO Image Uploaded</h1>
        </div>
      ) : (
        <div>
          <ImageGallery images={publicIds} />
        </div>
      )}
      
      


    </div>
  )
}

export default page