import React, { Component } from "react";
import "./Home.css";
import useMeasure from "react-use-measure";
import { animate, useMotionValue } from "motion/react";
import { motion } from "motion/react";
import TextField from "@mui/material/TextField";
import ServiceCard from "../../components/Service Card/ServiceCard";
import { ScrollIcon } from "../../components/Scroll Icon/ScrollIcon";
import { ProcessCard } from "../../components/Process Card/ProcessCard";

import FadeContent from "../../animations/Animations/FadeContent/FadeContent";
import AnimatedContent from "../../animations/Animations/AnimatedContent/AnimatedContent";
import SplitText from "../../animations/TextAnimations/SplitText/SplitText";
import { useEffect, useState, useRef } from "react";
import { ContactForm } from "../../components/Contact Form/ContactForm";

import { Link, useLocation } from "react-router";

const Home = ({ loading }) => {
  const location = useLocation();

  // Scroll to the target element when the URL hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // Scroll smoothly to the target
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const sliderImages = [
    "divider.svg",
    "autocad.svg",
    "package.svg",
    "fusion360.svg",
    "conveyor-belt.svg",
    "solidworks.svg",
    "robo-arm.svg",
    "nx.svg",
    "factory.svg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "Manufacturing",
      body: "Custom engineering solutions designed to enhance efficiency in the industry.",
    },
    {
      title: "Sourcing",
      body: "Sourcing strategies that drive efficiency and innovation in manufacturing.",
    },
    {
      title: "Design",
      body: "Innovative design solutions tailored for the manufacturing sector.",
    },
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index);
    const sliderBody = document.getElementById("services-body");
    sliderBody.style.transform = `translateY(-${100 * index}%)`;
  };

  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const finalPosition = -width / 2 - 32;

    const controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controls.stop();
  }, [xTranslation, width]);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".app-wrapper");

    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setRotation(scrollTop / 16);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  function heroSendMsg(e) {
    const inpBox = document.getElementById("hero-message");
    const contactBox = document.getElementById("contact-message");

    contactBox.value = inpBox.value;

    document
      .getElementById("contact-section")
      .scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      contactBox.parentNode.click?.();

      inpBox.value = "";
      setMessage("");
    }, 700);
  }

  const videoRef = useRef(null);
  const videoSources = [
    "/stock video/hero-1.mp4",
    "/stock video/hero-2.mp4",
    "/stock video/hero-3.mp4",
  ];

  const getRandomIndex = (excludeIndex = -1) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * videoSources.length);
    } while (newIndex === excludeIndex && videoSources.length > 1);
    return newIndex;
  };

  const [currentIndex, setCurrentIndex] = useState(getRandomIndex());

  const handleVideoEnded = () => {
    const nextIndex = getRandomIndex(currentIndex);
    setCurrentIndex(nextIndex);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => {
        console.warn("Play failed:", err);
      });
    }
  };

  return (
    <>
      {/* <div className="main-container">
        <Navbar loading={loading} /> */}
      <div className="main-wrapper">
        <section id="hero-section" className="hero-container">
          <div className="hero-bg-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop={false}
              playsInline
              onEnded={handleVideoEnded}
              key={currentIndex}
            >
              <source src={videoSources[currentIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="black-tint"></div>
          </div>
          <div className="hero-title-container">
            <div className="hero-title-text-container">
              {!loading && (
                <FadeContent
                  blur={false}
                  duration={2000}
                  easing="ease-out"
                  initialOpacity={0}
                  delay={100}
                >
                  <h1 className="text text-h-1 text-bold text-secondary">
                    Crafting Tomorrow with Fine Precision
                  </h1>
                </FadeContent>
              )}
              {!loading && (
                <FadeContent
                  blur={false}
                  duration={2000}
                  easing="ease-out"
                  initialOpacity={0}
                  delay={300}
                >
                  <h3 className="text text-h-4 text-light text-onest">
                    Innovative solutions tailored for real-world impact
                  </h3>
                </FadeContent>
              )}
            </div>
            {!loading && (
              <FadeContent
                blur={false}
                duration={2000}
                easing="ease-out"
                initialOpacity={0}
                delay={500}
              >
                <div className="hero-message-container">
                  <TextField
                    id="hero-message"
                    label="Send us a message"
                    variant="standard"
                    fullWidth
                    required
                    color="none"
                    inputProps={{ maxLength: 1000 }}
                    helperText={`${message.length}/1000`}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "1.25rem",
                        fontFamily: "Onest",
                        fontWeight: 400,
                        lineHeight: "1.167",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1.25rem",
                        fontFamily: "Onest",
                        fontWeight: 400,
                        lineHeight: "1.167",
                      },
                    }}
                  />
                  <button
                    className="hero-send-icon-btn"
                    type="button"
                    onClick={heroSendMsg}
                  >
                    <img
                      className="navbar-menu-icon"
                      src="/icons/arrow-outward.svg"
                      alt=""
                    />
                  </button>
                </div>
              </FadeContent>
            )}
          </div>
          {!loading && (
            <FadeContent
              blur={false}
              duration={2000}
              easing="ease-out"
              initialOpacity={0}
              delay={500}
              className="hero-card"
            >
              {/* <div className="hero-card"> */}
              <div className="slider-container">
                {/* <video autoPlay muted loop playsInline loading="lazy">
                  <source src="/stock video/hero-1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop={false}
                  playsInline
                  onEnded={handleVideoEnded}
                  key={currentIndex}
                >
                  <source src={videoSources[currentIndex]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="black-tint"></div>
              </div>
              {/* </div> */}
            </FadeContent>
          )}
        </section>
        <section id="services-section" className="services-container">
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
              className="anim-content-opacity"
            >
              <div className="services-title-container">
                <h1 className="text text-h-1 text-bold text-secondary">
                  Discover Our Services
                </h1>
                <h5 className="text text-h-6 text-light text-onest">
                  Tailored engineering services that optimize production
                  processes and foster advancements in manufacturing.
                </h5>
              </div>
            </AnimatedContent>
          )}

          <div className="services-card">
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
                    src="/stock video/services-1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    loading="lazy"
                  />
                  <video
                    src="/stock video/services-2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    loading="lazy"
                  />
                  <video
                    src="/stock video/services-3.mp4"
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
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    active={activeIndex === index}
                    title={service.title}
                    body={service.body}
                    onClick={() => handleCardClick(index)}
                  />
                ))}
              </AnimatedContent>
            )}
          </div>
        </section>
        <section id="why-us-section" className="why-us-container">
          <div className="why-us-content">
            {!loading && (
              <SplitText
                className="text text-h-1 text-bold text-secondary"
                delay={100}
                duration={1.5}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              >
                Why Choose Our Solutions
              </SplitText>
            )}

            {/* <h1 className="text text-h-1 text-bold text-secondary">
                  Why Choose Our Solutions<span>?</span>
                </h1> */}
            {!loading && (
              <SplitText
                className="text text-h-6 text-regular text-onest why-us-body"
                delay={100}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              >
                At Altiora, we lead the charge in manufacturing innovation. Our
                tailored solutions enhance production capabilities, delivering
                remarkable returns. <br />
                <br />
                With our flexible options and on-demand services, we're
                reshaping the manufacturing industry. Experience the future of
                production with us.
              </SplitText>
            )}
            {/* {!loading && (
                <SplitText
                  className="text text-h-6 text-regular text-onest why-us-body"
                  delay={100}
                  duration={1}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                >
                  With our flexible options and on-demand services, we're
                  reshaping the manufacturing industry. Experience the future of
                  production with us.
                </SplitText>
              )} */}
          </div>
          <div className="why-us-slider">
            <motion.div
              className="why-us-slider-track"
              ref={ref}
              style={{ x: xTranslation }}
            >
              {[...sliderImages, ...sliderImages].map((item, idx) => (
                <ScrollIcon key={idx} imgSrc={item} />
              ))}
            </motion.div>
          </div>
          <img className="texture-img" src="/home/why-us-texture.svg" alt="" />
        </section>
        <section id="our-process-section" className="our-process">
          {!loading && (
            <AnimatedContent
              distance={0}
              direction="vertical"
              reverse={true}
              duration={2}
              ease="elastic.out(1, 0.8)"
              initialOpacity={0}
              animateOpacity
              scale={1.25}
              threshold={0.2}
              delay={0.4}
              className="anim-content-opacity"
            >
              <div className="our-process-header">
                <h1 className="text text-h-1 text-bold text-secondary">
                  Built Around Your Vision
                </h1>
                <h5 className="text text-h-6 text-light text-onest">
                  Our step-by-step process — from design to delivery — crafted
                  to bring your ideas to life with precision and care.
                </h5>
              </div>
            </AnimatedContent>
          )}
          <div className="card-table">
            <div className="row row-1">
              {!loading && (
                <AnimatedContent
                  distance={0}
                  direction="vertical"
                  reverse={true}
                  duration={2}
                  ease="elastic.out(1, 0.8)"
                  initialOpacity={0}
                  animateOpacity
                  scale={1.25}
                  threshold={0.2}
                  delay={0.4}
                  className="anim-content-opacity"
                >
                  <ProcessCard
                    state="primary"
                    imgSrc="home/process-card-1"
                    title="Discover & Define"
                    desc="We understand your vision, requirements, and goals to define a clear product roadmap."
                  />
                </AnimatedContent>
              )}
              {!loading && (
                <AnimatedContent
                  distance={0}
                  direction="vertical"
                  reverse={true}
                  duration={2}
                  ease="elastic.out(1, 0.8)"
                  initialOpacity={0}
                  animateOpacity
                  scale={1.25}
                  threshold={0.2}
                  delay={0.6}
                  className="anim-content-opacity"
                >
                  <ProcessCard
                    state="primary"
                    imgSrc="home/process-card-2"
                    title="Design & Prototype"
                    desc="Our engineering team develops detailed CAD models and prototypes for testing and validation."
                  />
                </AnimatedContent>
              )}
            </div>
            <div className="row row-2">
              {!loading && (
                <AnimatedContent
                  distance={0}
                  direction="vertical"
                  reverse={true}
                  duration={2}
                  ease="elastic.out(1, 0.8)"
                  initialOpacity={0}
                  animateOpacity
                  scale={1.25}
                  threshold={0.2}
                  delay={0.6}
                  className="anim-content-opacity"
                >
                  <ProcessCard
                    state="primary"
                    imgSrc="home/process-card-3"
                    title="Source & Manufacture"
                    desc="We identify the right materials, suppliers, and production methods to ensure cost-effective, high-quality results."
                  />
                </AnimatedContent>
              )}
              {!loading && (
                <AnimatedContent
                  distance={0}
                  direction="vertical"
                  reverse={true}
                  duration={2}
                  ease="elastic.out(1, 0.8)"
                  initialOpacity={0}
                  animateOpacity
                  scale={1.25}
                  threshold={0.2}
                  delay={0.8}
                  className="anim-content-opacity"
                >
                  <ProcessCard
                    state="primary"
                    imgSrc="home/process-card-4"
                    title="Deliver & Support"
                    desc="Final products are inspected, packed, and shipped"
                  />
                </AnimatedContent>
              )}
            </div>
          </div>
          <h6 className="our-process-link text text-h-6 text-onest text-regular">
            {/* <a className="text-medium" href="#contact-section">
                Get in touch
              </a> */}
            <Link to="#contact-section" className="text-medium">
              Get in touch
            </Link>
            &nbsp;for more details
          </h6>
        </section>
        <section id="contact-section" className="contact-form-container">
          <img
            className="contact-star-icon"
            src="/home/contact-star.svg"
            alt=""
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
          <div className="contact-form">
            <div className="contact-header">
              <h1 className="text text-h-1 text-bold text-secondary">
                We'd love to hear from you
              </h1>
              <h5 className="text text-h-6 text-light text-onest">
                Whether you have a project in mind or, want to collaborate, or
                just have a question, feel free to reach out. Our team is ready
                to help.
              </h5>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
      {/* <Footer />
      </div> */}
    </>
  );
};

export default Home;
