import React from "react"

const AppPromo = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundImage:
          "url(https://pages.trip.com/images/online-adu/bg_3.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 0,
        padding: 0,
        lineHeight: "normal",
      }}
    >
      <div
        style={{
          height: "366px",
          width: "183px",
          borderRadius: "0 183px 183px 0",
          backgroundColor: "rgba(35, 70, 255, .48)",
          marginLeft: "-73px",
        }}
      ></div>
      <div className="container">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-[40px] text-secondaryBg">
              Your all-in-one travel app
            </h1>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppPromo
