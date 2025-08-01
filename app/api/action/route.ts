import { auth } from '@/auth';
import { pool } from '@/lib/db';
import { Workspace } from '@/types/next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { QueryResult } from 'pg';

export async function POST(req: NextRequest) {
  const { name, invite_code, description } = await (req.json());
  // console.log(req);

  if (!name || !invite_code || !description) {
    return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
  } else {
    const session = await auth();

    if (session) {

      const user_id = session?.user.id;
      // console.log(user_id)
      try {
        const result = await pool.query(
          "INSERT INTO workspace (name, admin_id, invite_code, about_space) VALUES ($1, $2, $3, $4)",
          [name, user_id, invite_code, description]
        );
        return NextResponse.json({ message: 'Sucessfully created' }, { status: 201 })
      } catch (error) {
        return NextResponse.json({ message: 'Error !!' }, { status: 500 });
      }
    }

  }
}


export async function POST(req: NextRequest) {
  const { name, invite_code, description } = await (req.json());
  // console.log(req);

  if (!name || !invite_code || !description) {
    return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
  } else {
    const session = await auth();

    if (session) {

      const user_id = session?.user.id;
      // console.log(user_id)
      try {
        const result = await pool.query(
          "INSERT INTO workspace (name, admin_id, invite_code, about_space) VALUES ($1, $2, $3, $4)",
          [name, user_id, invite_code, description]
        );
        return NextResponse.json({ message: 'Sucessfully created' }, { status: 201 })
      } catch (error) {
        return NextResponse.json({ message: 'Error !!' }, { status: 500 });
      }
    }

  }
}

