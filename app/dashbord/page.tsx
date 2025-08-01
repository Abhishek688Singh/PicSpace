
import { auth } from '@/auth';
import ExpandableCardDemo from '@/components/expandable-card-demo-grid';
import { pool } from '@/lib/db';
import { Workspace } from '@/types/next-auth';
import axios from 'axios'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { QueryResult, Result } from 'pg';
import React from 'react'

const dashboard = async () => {
  const session = await auth();
  let spaceData: Workspace[] = [];

  if (session) {

    const user_id = session?.user.id;
    // console.log(`userid${user_id}`)
    try {
      const result: QueryResult<Workspace> = await pool.query(
        "SELECT * FROM workspace WHERE admin_id = $1 ", [user_id]
      );
      // console.log(result.rows);
      spaceData = result.rows;
    } catch (error) {
      console.log(error);
      alert("Error! Loading Pic-Space");
    }
  } else {
    redirect("/login");
  }
  return (
    <div className='bg-zinc-950 h-[100vh] '>
      <div className='flex flex-col items-center'>
        <h3 className='text-amber-50 pt-[150] text-4xl pb-[10]'>Your Active Pic-Spaces:</h3>
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
      </div>
    </div>

  )
}

export default dashboard