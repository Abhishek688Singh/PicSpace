import { auth } from '@/auth';
import ExpandableCardDemo from '@/components/expandMember';
import { pool } from '@/lib/db';
import { Workspace } from '@/types/next-auth';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { QueryResult } from 'pg';
import React from 'react'

export default async function userPage({ params }: {
  params: { 'workspace-id': string }
}) {
  const workspaceId = params['workspace-id'];
  // console.log(workspaceId);

  const session = await auth();
  let spaceMembers: Workspace[] = [];

  if (session) {

    // const user_id = session?.user.id;
    try {
      const result: QueryResult<Workspace> = await pool.query(
        `SELECT 
      workspace_members.id AS membership_id,
      users.id AS user_id,
      users.name AS user_name,
      users.email,
      users.user_image,
      workspace_members.role,
      workspace_members.workspace_id,
      workspace_members.member_name,
      workspace_members.status,
      workspace_members.left_at
      FROM workspace_members
      JOIN users ON workspace_members.user_id = users.id
      WHERE workspace_members.workspace_id = $1;`,
        [workspaceId]
      );
      // console.log(result.rows);
      spaceMembers = result.rows;
      console.log(spaceMembers)

    } catch (error) {
      console.error(error);
    }
  } else {
    redirect("/login");
  }


  return ( ///Adjust sending the values in card
    <>
      <div className='h-[100vh]'>
        {spaceMembers.length === 0 ? (
          <div className='flex flex-col items-center text-5xl pt-[150] text-amber-100'>
            <h1 className='pb-8'> There are no members in your Pic-Space!!</h1>
          </div>
        ) : (
         
          <div className='pt-9'>
            <p className='text-2xl text-amber-50 text-center p-6'>Members in your Pic-Space :</p>
             <SessionProvider>
            <ExpandableCardDemo
              cards={spaceMembers.map(space => ({
                id: `${space.membership_id}`,  // or space.workspace_id if you're showing workspace cards
                name: `${space.user_name} (${space.status}) ${space.left_at ? `Left at-->${new Date(space.left_at).toLocaleString()}`: ""}`,
                about_space: `Role: ${space.role}`,
                src: space.user_image || "https://picsum.photos/536/354", // fallback image
                description: `Email: ${space.email}`,
                ctaText: "Open Profile",
                ctaLink: `/dashbord/${workspaceId}/${space.user_id}`, // or `/workspace/${space.workspace_id}`
                content: `Member Name: ${space.member_name}`,
                status:space.status,
                workspaceId:workspaceId
              }))}
            />
            </SessionProvider>

          </div>
        )}

        {/* <CreateNewUser wSpaceId={workspaceId} /> */}
      </div>

    </>
  )
}

// export default userPage