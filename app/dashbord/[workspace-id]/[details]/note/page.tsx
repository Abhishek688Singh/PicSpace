// export const dynamic = 'force-dynamic';


import CreateArea from "./CreateArea";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import NoteList from "./noteList";
import { Suspense } from "react";

const Appi = async ({ params }: {
  params: { 'workspace-id': string; details: string };
}) => {
  const session = await auth();
  if (!session) redirect("/login");

  const { 'workspace-id': workspaceId, details: memberFriendId } = params;

  const result = await pool.query(
    "SELECT * FROM folder_items WHERE workspace_id = $1 AND shared_with = $2 AND type = 'note'",
    [workspaceId, memberFriendId]
  );

  const notes = result.rows;

  return (
    <>
      <div className="flex flex-col items-center h-[100vh] pt-[100px] ">
        <CreateArea workspaceId={workspaceId} memberFriendId={memberFriendId} />

        <div className="flex flex-col sm:flex-row flex-wrap items-center">
          <Suspense fallback={"loading..."}>
            <NoteList notes={notes}
              workspaceId={workspaceId}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Appi;
