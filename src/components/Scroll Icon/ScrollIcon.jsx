import React from 'react'
import "./ScrollIcon.css"

export const ScrollIcon = (props) => {
  return (
    <div className="scroll-icon">
        <img src={`/icons/${props.imgSrc}`} alt="" srcSet="" />
    </div>
  )
}
