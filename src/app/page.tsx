import Link from "next/link";
import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  console.log(snippets);
  const renderSnippets = snippets.map((snippet) => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
        className="flex justify-between items-center p-2 border rounded mb-2"
      >
        <div>{snippet.title}</div>
        <div>View </div>
      </Link>
    );
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-2 ">
        <h1 className="text-xl font-semibold">Snippets</h1>
        <Link
          href={`/snippets/new`}
          className="border p-2 rounded hover:bg-gray-100"
        >
          New
        </Link>
      </div>
      {renderSnippets}
    </div>
  );
}
