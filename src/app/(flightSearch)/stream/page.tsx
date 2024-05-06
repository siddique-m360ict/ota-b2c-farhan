import { Suspense } from "react"
import { Child } from "./Child"

function LoadingLocal() {
  return (
    <div className="h-48 w-48 bg-pink-400 text-black">Suspense fallback</div>
  )
}

export default async function Home() {
  return (
    <main>
      Stream below
      <Suspense fallback={<LoadingLocal />}>
        <Child />
      </Suspense>
    </main>
  )
}

// export const dynamic = "force-dynamic"
