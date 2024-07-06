import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";
import { db } from "@/db";

interface SnippetEditProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditFunction(props: SnippetEditProps) {
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: {
      id: id,
    },
  });

  if (!snippet) {
    return notFound();
  }

  return <SnippetEditForm snippet={snippet} />;
}
