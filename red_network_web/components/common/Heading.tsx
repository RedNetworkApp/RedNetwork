import React from "react"

export const Heading = ({ title, desc }: any) => {
  return (
    <>
      <div className='heading'>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </>
  )
}
