import { FC } from "react"

export const Child: FC<{}> = async () => {
  await new Promise((res) => setTimeout(res, 3000))

  return <div>Child content</div>
}
