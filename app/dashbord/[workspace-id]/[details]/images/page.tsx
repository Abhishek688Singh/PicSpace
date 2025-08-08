import React from 'react';
import Images from './ImageUpload';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import { pool } from '@/lib/db';

export default async function Page({
  params,
}: {
  params: { 'workspace-id': string; details: string };
}) {
  const workspaceId = params['workspace-id'];
  const memberFriendId = params.details;

  const session = await auth();
  if (!session) redirect('/login');

  const result = await pool.query(
    `SELECT created_at, content, public_id 
     FROM folder_items 
     WHERE workspace_id = $1 
       AND shared_with = $2 
       AND type = 'image'`,
    [workspaceId, memberFriendId]
  );

  const publicIds = result.rows;

  return (
    <div className="flex flex-col items-center pt-[150] text-white h-[100vh]">
      <Images workspaceId={workspaceId} memberFriendId={memberFriendId} />

      <hr className="w-[90%] border-[1px] bg-amber-50" />

      <h1 className="text-2xl font-bold text-center mt-6">Shared by Me :</h1>

      {publicIds.length === 0 ? (
        <div className="flex flex-col items-center pt-[100] text-bold text-teal-100 text-4xl">
          <h1>NO Image Shared</h1>
        </div>
      ) : (
        <div>
          <ImageGallery images={publicIds} />
        </div>
      )}
    </div>
  );
}
