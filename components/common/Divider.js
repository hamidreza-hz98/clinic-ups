import React from "react"

const Divider = ({ vertical = false, className = "" }) => {
  return (
    <div
      className={`bg-gradient-to-r from-transparent via-primary to-transparent my-4
        ${vertical ? "w-[2px] h-full bg-gradient-to-b" : "w-full h-[2px]"} ${className}`}
    />
  )
}

export default Divider
