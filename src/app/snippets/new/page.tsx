"use client";

import { useFormState } from "react-dom";
import { createSnippet } from "@/actions";
export default function CreateSnippetPage() {
  const [formState, action] = useFormState(createSnippet, { message: "" });
  return (
    <form action={action}>
      <h3 className="font-bold mb-3 text-center">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
            required
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
            required
          />
        </div>

        {formState.message && (
          <div className="my-2 p-2 bg-red-100 border border-red-400">
            {formState.message}
          </div>
        )}
        <button className="rounded p-2 bg-blue-200 ">Add</button>
      </div>
    </form>
  );
}
