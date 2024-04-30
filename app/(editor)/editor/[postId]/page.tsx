import { notFound, redirect } from "next/navigation"

import { Editor } from "@/components/editor"

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  return (
    <Editor
      post={{
        id: "1",
        title: "post.title",
        content: "post.content",
        published: true,
      }}
    />
  )
}
