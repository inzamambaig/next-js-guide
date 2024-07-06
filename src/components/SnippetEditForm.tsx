"use client";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";

interface SnippeteEditProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippeteEditProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditChange = (value: string = "") => {
    setCode(value);
  };
  return (
    <div>
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
    </div>
  );
}
