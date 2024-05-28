import { useTransition } from "react"
import { useDispatch } from "react-redux"
import { setTransitionLoading } from "@/lib/redux/slice/transitionLoading"

const useGlobalTransition = (): [boolean, (callback: () => void) => void] => {
  const dispatch = useDispatch()
  const [isPending, startTransition] = useTransition()

  const startGlobalTransition = (callback: () => void) => {
    dispatch(setTransitionLoading(true))
    startTransition(() => {
      callback()
      dispatch(setTransitionLoading(false))
    })
  }

  return [isPending, startGlobalTransition]
}

export default useGlobalTransition
