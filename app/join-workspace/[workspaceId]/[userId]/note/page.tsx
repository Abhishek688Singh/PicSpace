// export const dynamic = 'force-dynamic';


// import CreateArea from "./CreateArea";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { Suspense } from "react";
import NoteList from "./noteList";

const Appi = async ({ params }: { params: { 'workspace-id': string } }) => {
  const session = await auth();
  if (!session) redirect("/login");

  const { workspaceId} = params;
  const memberFriendId = session.user.id;
  console.log(`workspace-->${workspaceId}`)
  console.log(`memberFriendId-->${memberFriendId}`)

  const result = await pool.query(
    "SELECT * FROM folder_items WHERE workspace_id = $1 AND shared_with = $2 AND type = 'note'",
    [workspaceId, memberFriendId]
  );

  const notes = result.rows;

  return (
    <>
      <div className="flex flex-col items-center h-[100vh] pt-[100px] ">

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
