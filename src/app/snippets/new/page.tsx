import { db } from "@/db";
import { redirect } from "next/navigation";

export default function CreateSnippetPage() {
  async function createSnippet(data: FormData) {
    // This is a server action
    "use server";
    // check to see if user inputs valid data
    const title = data.get("title") as string;
    const code = data.get("code") as string;
    // create a new record in the DB
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // redirect user to home page
    redirect("/");
  }
  return (
    <form action={createSnippet}>
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
          />
        </div>

        <button className="rounded p-2 bg-blue-200 ">Add</button>
      </div>
    </form>
  );
}
