import React from "react"

const HomeBanner2 = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/images/bg/home2.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="container flex h-full items-center justify-center">
        <div>
          <p>Discover Your Next Great</p>
          <h1>Adventure</h1>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner2
