import React from "react";
import "./ServiceCard.css";
import AnimatedContent from "../../animations/Animations/AnimatedContent/AnimatedContent";

const ServiceCard = (props) => {

  const loading = props.loading

  return (
    <div className={`services-card ${props.left ? "left" : ""}`}>
      {!loading && (
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.1}
          className="services-slider anim-content-opacity"
        >
          <div id="services-body" className="services-body">
            <video
              src={`/stock video/${props.video}.mp4`}
              autoPlay
              loop
              muted
              playsInline
              loading="lazy"
            />
          </div>
        </AnimatedContent>
      )}
      {!loading && (
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.1}
          className="services-list anim-content-opacity"
        >
            <div
              className={`service-container active`}
              onClick={props.onClick}
            >
              <div className="service-header">
                {/* <img src="/icons/bullet-circle.svg" alt="" /> */}
                <div className="service-link">
                  <h2 className="text text-h-3 text-medium text-onest">
                    {props.title}
                  </h2>
                  <img src="/icons/open-link-in-new.svg" alt="" />
                </div>
              </div>
              <div className="service-subtitle">
                <h5 className="text text-h-4 text-light text-onest">
                  {props.subtitle}
                </h5>
              </div>
              <div className="service-body">
                <h5 className="text text-h-6 text-light text-onest">
                  {props.body}
                </h5>
              </div>
            </div>
        </AnimatedContent>
      )}
    </div>
  );
};

export default ServiceCard;
