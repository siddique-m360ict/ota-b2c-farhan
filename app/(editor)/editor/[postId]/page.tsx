import { notFound, redirect } from "next/navigation"

import { Editor } from "@/components/editor"

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  return <Editor />
}
