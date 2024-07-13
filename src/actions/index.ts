"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSnippet(
  formState: { message: string },
  data: FormData
) {
  try {
    // check to see if user inputs valid data
    const title = data.get("title");
    const code = data.get("code");

    // validation
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be string and should be longer than 2 characters",
      };
    }
    if (typeof code !== "string" || code.length < 3) {
      return {
        message: "Code must be string and should be longer than 2 characters",
      };
    }
    // create a new record in the DB
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong!",
      };
    }
  }
  redirect("/");
}

export async function editSnippet(id: number, title: string, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: { title, code },
  });

  revalidatePath("/");
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  redirect(`/`);
}
