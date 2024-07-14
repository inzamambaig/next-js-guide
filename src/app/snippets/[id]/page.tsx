import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteSnippet } from "@/actions";

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

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex flex-col m-4 justify-between gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded hover:bg-gray-100"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button
              type="submit"
              className="p-2 border rounded hover:bg-gray-100"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <pre className="p-3 rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// This function is used by Next.js to generate static paths for the application
// It will be called during the build process to determine which pages should be pre-rendered
export async function generateStaticParams() {
  // fetch all snippets from the database
  const snippets = await db.snippet.findMany();

  // This will be used by Next.js to generate static paths for each snippet
  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}
