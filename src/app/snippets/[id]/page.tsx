import { notFound } from "next/navigation";
import { db } from "@/db";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // artificial delay
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const snippet = await db.snippet.findFirst({
    where: {
      id: {
        equals: parseInt(props.params.id),
      },
    },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="flex flex-col m-4 justify-between gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{snippet.title}</h1>
        <div className="flex gap-2">
          <button className="p-2 border rounded hover:bg-gray-100">Edit</button>
          <button className="p-2 border rounded hover:bg-gray-100">
            Delete
          </button>
        </div>
      </div>

      <pre className="p-3 rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
