import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { Suspense } from "react";
import NoteList from "./noteList";

const Appi = async ({ params }: { params: { 'workspace-id': string } }) => {
  const session = await auth();
  if (!session) redirect("/login");

  const workspaceId = params["workspace-id"];
  const memberFriendId = session.user.id;

  // 🔒 ACCESS CHECK (safe, outside try/catch)
  const accessResult = await pool.query(
    "SELECT status FROM workspace_members WHERE workspace_id = $1 AND user_id = $2",
    [workspaceId, memberFriendId]
  );

  // console.log("Access check:", accessResult.rows);

  if (!accessResult.rows[0] || accessResult.rows[0].status !== "active") {
    notFound(); // ✅ Now works properly
  }

  // 📒 FETCH NOTES
  let notes = [];
  try {
    const result = await pool.query(
      "SELECT * FROM folder_items WHERE workspace_id = $1 AND shared_with = $2 AND type = 'note'",
      [workspaceId, memberFriendId]
    );
    notes = result.rows;
  } catch (err) {
    console.error("Error fetching notes:", err);
  }

  return (
    <div className="flex flex-col items-center h-[100vh] pt-[100px]">
      <p className="text-amber-50 text-2xl text-center">
        Here are all the ideas and plans shared by your space admin.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-center">
        <Suspense fallback={"loading..."}>
          <NoteList notes={notes} workspaceId={workspaceId} />
        </Suspense>
      </div>
    </div>
  );
};

export default Appi;
