


import React, { ReactNode } from "react";

function Note(props: {
  workspaceId: ReactNode;
  title: string;
  content: string;
  id: string;
}) {

// console.log(workspaceId);
return (
  <div className="note">
    <h1>{props.title}</h1>
    <p>{props.content}</p>
    
  </div>
);

}
export default Note;
