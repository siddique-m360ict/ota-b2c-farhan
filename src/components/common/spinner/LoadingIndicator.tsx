import { cn } from "@/lib/utils"
import "@/styles/loader.css"
const Loading = () => {
  return (
    <div className="relative h-20 w-20 animate-spin">
      <div className="animate-shape1 absolute h-20 w-20 rounded-md bg-blue-500"></div>
      <div className="animate-shape2 absolute h-20 w-20 rounded-md bg-[#053969]"></div>
      <div className="animate-shape3 absolute h-20 w-20 rounded-md bg-[#053969]"></div>
      <div className="animate-shape4 absolute h-20 w-20 rounded-md bg-[#053969]"></div>
    </div>
  )
}

export const loadingIndicator = (
  <div className="fixed left-1/2 top-1/2 z-50 flex h-screen -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
    <Loading />
  </div>
)

type Props = {
  className?: string
}
export default function LoadingIndicator({ className }: Props) {
  return (
    <div
      className={cn(
        "w-calc(100vw - 8%) fixed left-1/2 top-1/2 z-50 flex h-screen -translate-x-1/2 -translate-y-1/2 transform items-center justify-center",
        className
      )}
      id="loader"
    >
      <div className="loader" id="preloader">
        <div className="preloader-wrap">
          <div className="plane">
            <img
              className="plane-img"
              src={"/images/loader-plane.png"}
              alt=""
            />
          </div>
          <div className="earth-wrapper">
            <div
              className="earth"
              style={{
                backgroundImage: `url(images/earth.gif)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
