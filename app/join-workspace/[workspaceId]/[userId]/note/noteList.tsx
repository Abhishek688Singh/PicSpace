// app/your-page-folder/NoteList.tsx
// ✅ This is a Server Component by default


import Note from "./Note";
import "./styles.css"

type NoteType = {
  id: string;
  content: string; // JSON string like {title, content}
};

export default function NoteList({ notes, workspaceId }: { notes: NoteType[], workspaceId: string }
) {
  if (notes.length === 0) {
    return <h1 className="text-white text4xl">No Notes available</h1>;
  }

  return (
    <>
      {notes.map((noteItem) => {
        const parsedContent = JSON.parse(noteItem.content);

        return (
          <div >
            <Note
              key={noteItem.id}
              id={noteItem.id}
              workspaceId={workspaceId}
              title={parsedContent.title}
              content={parsedContent.content}
            />

          </div>

        );
      })}
    </>
  );
}
