"use client";
//Working
//THIS CODE IS UPLOADING THE NOTES TO BD NOT RENDER THEM

import React, { useState } from "react";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
// import Fab from '@mui/material/Fab';

function CreateArea({
  workspaceId,
  memberFriendId
}: {
  workspaceId: string;
  memberFriendId: string;
}) {
  const [note, setNote] = useState({
    title: "", content: ""
  });

  function handleChange(e: { target: { name: any; value: any; }; }) {
    const { name, value } = e.target;
    setNote(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function submitNote(e: { preventDefault: () => void; }) {
    e.preventDefault();
    try {
      await axios.post("/api/notes", {
        note: note,
        workspaceId,
        memberFriendId
      });
      window.location.reload(); // refresh to get new notes from server
    } catch (err) {
      console.error(err);
    }
  }

  const [clicked, setClicked] = useState(false);
  return (
    <form className="create-note">
      {clicked && (
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
      )}
      <textarea
        name="content"
        onClick={() => setClicked(true)}
        onChange={handleChange}
        value={note.content}
        placeholder="Take a note..."
        rows={clicked ? "3" : "1"}
      />
      <Zoom in={clicked}>
        <Fab onClick={submitNote}>
          <AddIcon />
        </Fab>
      </Zoom>
    </form>
  );
}

export default CreateArea;