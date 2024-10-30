import { cn } from "@/lib/utils"
import "@/styles/loader.css"

type Props = {
  className?: string
}
export default function LoadingIndicator({ className }: Props) {
  return (
    <>
      <div
        className={cn(
          "w-calc(100vw - 8%) fixed	 left-1/2 top-1/2 z-50 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/30 backdrop-blur-[5px]",
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
    </>
  )
}
