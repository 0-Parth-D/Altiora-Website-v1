import React from "react";
import "./ServiceCard.css"

const ServiceCard = (props) => {
  return (
    <div className={`service-container ${props.active ? "active" : ""}`} onClick={props.onClick}>
      <div className="service-header">
        <img src="/icons/bullet-circle.svg" alt="" />
        <div className="service-link">
          <h2 className="text text-h-3 text-medium text-onest">
            {props.title}
          </h2>
          <img src="/icons/open-link-in-new.svg" alt="" />
        </div>
      </div>
      <div className="service-body">
        <h5 className="text text-h-6 text-light text-onest">
          {props.body}
        </h5>
      </div>
    </div>
  );
};

export default ServiceCard;
