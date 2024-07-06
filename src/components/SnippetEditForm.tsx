"use client";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editSnippet } from "@/actions";
import type { Snippet } from "@prisma/client";

interface SnippeteEditProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippeteEditProps) {
  const [code, setCode] = useState(snippet.code);
  const [title, setTitle] = useState(snippet.title);
  const handleEditChange = (value: string = "") => {
    setCode(value);
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, title, code);
  return (
    <div>
      <input
        type="text"
        defaultValue={snippet.title}
        onChange={handleEditTitle}
        className="p-2 border rounded mb-2"
      />
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={handleEditChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
