
import { auth } from '@/auth';
import ExpandableCardDemo from '@/components/expandable-card-demo-grid';
import JoinedSpace from "@/components/joinedSpace";
import ShareInstructions from '@/components/ShareInstructions';
import { pool } from '@/lib/db';
import { Workspace } from '@/types/next-auth';
import { SessionProvider } from "next-auth/react"
import { redirect } from 'next/navigation';
import { QueryResult } from 'pg';
import React from 'react'

const dashboard = async () => {
  const session = await auth();
  let spaceData: Workspace[] = [];

  let joinData: Workspace[] = [];

  if (!session) { redirect("/login"); }

  const user_id = session?.user.id;

  try {
    const result: QueryResult<Workspace> = await pool.query(
      "SELECT * FROM workspace WHERE admin_id = $1 ", [user_id]
    );
// console.log(session.user.id);
    const result2 = await pool.query("SELECT * FROM workspace_members \
      WHERE user_id = $1 AND status ='active'",[session.user.id]);
    // console.log(result.rows);
    spaceData = result.rows;
    joinData = result2.rows;
    // console.log(joinData);
  } catch (error) {
    console.log(error);
    alert("Error! Loading Pic-Space");
  }

  return (
    <div >
      <div className='flex flex-col items-center'>
        <h3 className='text-amber-50 pt-[150] text-4xl text-center pb-[10]'>Your Active Pic-Spaces:</h3>

        {/* ACTIVE WORK-SPACE */}
<ShareInstructions />



        {spaceData.length === 0 ? (
          <>
            <h1 className='text-white text3xl'>NO Pic-Space available!!<br />You have to create first.</h1>
          </>) : (
          <>
          <SessionProvider>
            <ExpandableCardDemo
              cards={spaceData.map(space => ({
                id: space.id,
                name: space.name,
                about_space: space.about_space,
                src: "https://picsum.photos/536/354", // placeholder or dynamic image if available
                description: `Invite Code: ${space.invite_code}`,
                workspaceId: `Pic-Space ID: ${space.id}`,
                ctaText: "Open Space",
                ctaLink: `/dashbord/${space.id}`,
                content: `Created at: ${new Date(space.created_at).toLocaleString()}`
              }))}
            />
            </SessionProvider>
          </>)}
      </div>


      {/* JOINED WORKSPACE */}
      <div className='flex flex-col items-center pb-10'>
        <h3 className='text-amber-50 pt-[150] text-4xl pb-[10]'>Joined Pic-Spaces:</h3>

        {joinData.length === 0 ? (
          <>
            <h1 className='text-white text3xl'>You Haven't joined any Pic-Space !!</h1>
            
          </>) : (
          <>
          <SessionProvider>
            <JoinedSpace 
              cards={joinData.map((space ,idx:number) => ({
                id: space.workspace_id,
                name: space.name,
                about_space: space.about_space,
                src: "https://picsum.photos/536/354", // placeholder or dynamic image if available
                description: `Invite Code:--`,
                workspaceId: `Pic-Space ID: ${space.workspace_id}`,
                ctaText: "Open Space",
                ctaLink: `/join-workspace/${space.workspace_id}`,
                content: `Pic-Space : ${idx+1}`
              }))}
            /></SessionProvider>
          </>)}

      </div>
    </div>

  )
}

export default dashboard