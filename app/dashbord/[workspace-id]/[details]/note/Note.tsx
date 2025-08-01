"use client"

import axios from "axios";
import React, { ReactNode } from "react";

function Note(props: {
  workspaceId: ReactNode;
  title: string;
  content: string;
  id: string;
}) {
  const workspaceId = props.workspaceId;

  async function tapHappen(id: string) {
    // console.log("tap happen");
    try {
      const result = await axios.delete("/api/notes", {
        data: {
          workspaceId, id
        }
      });
      console.log(result);
      if (result.data.status === 204) {
        window.location.reload();
      } else {
        console.log(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }


// console.log(workspaceId);
return (
  <div className="note">
    <h1>{props.title}</h1>

    {/* <h1>{props.workspaceId}</h1> */}
    <p>{props.content}</p>
    <button onClick={() => {
      tapHappen(props.id)
    }}>
      DELETE</button>
  </div>
);

}
export default Note;
