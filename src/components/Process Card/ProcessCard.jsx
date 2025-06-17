import React from 'react'
import "./ProcessCard.css"

export const ProcessCard = (props) => {
  return (
    <div className={`process-card-container ${props.state}`}>
        <img className='process-card-img' src={`/${props.imgSrc}.png`} alt="" />
        <div className="process-title">
            <h4 className='process-name text text-h-5 text-medium text-onest'>{props.title}</h4>
            <h6 className='process-desc text text-body-1 text-regular text-onest'>{props.desc}</h6>
        </div>
    </div>
  )
}
