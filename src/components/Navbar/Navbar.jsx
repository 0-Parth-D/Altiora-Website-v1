import React, { useState } from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import AnimatedContent from "../../animations/Animations/AnimatedContent/AnimatedContent";
import { Link } from "react-router";

const Navbar = (props) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const links = [
    { text: "Capabilities", href: "#services-section" },
    { text: "Workflow", href: "#our-process-section" },
    { text: "About", href: "#why-us-section" },
  ];

  const { loading } = props;

  function openMenu() {
    setMenuClicked(!menuClicked);
  }

  return (
    <>
      <div className="navbar-container">
        {/* Logo */}
        {!loading && (
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={true}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0}
          >
            <Link to="/">
              <img className="navbar-logo" src="/logo.svg" alt="" />
            </Link>
          </AnimatedContent>
        )}

        {/* Links big screen */}
        <div className="nav-list text text-h-6 text-light text-onest">
          {links.map((link, index) =>
            !loading ? (
              <AnimatedContent
                key={index}
                distance={150}
                direction="vertical"
                reverse={true}
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.2}
                delay={0 + index / 10}
              >
                <Link to={link.href} className="nav-link hover-highlight">
                  {link.text}
                </Link>
              </AnimatedContent>
            ) : null
          )}
        </div>

        {/* CTA button big screen */}
        <div className="navbar-btn">
          {!loading && (
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={true}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.2}
              delay={0.4}
            >
              <Link to="#contact-section">
              <Button body="Contact" icon="call" />
              </Link>
            </AnimatedContent>
          )}
        </div>

        {/* Menu button medium screen */}
        {!loading && (
        <button className="icon-btn" type="button" onClick={openMenu}>
          <img
            className="navbar-menu-icon"
            src="/icons/hamburger-white.svg"
            alt=""
          />
        </button>
        )}

        {/* Menu modal/sidebar medium screen */}
        <div
          className={`menu-modal ${
            menuClicked ? "visible" : "hidden"
          }`}
        >
          <div className="modal-main main-container">

          {/* Menu modal header */}
          <div className="modal-header navbar-container">
            <Link to="/">
              <img className="navbar-logo" src="/logo.svg" alt="" />
            </Link>

            {/* Menu modal close button */}
            <button className="icon-btn" type="button" onClick={openMenu}>
              <img
                className="navbar-menu-icon"
                src="/icons/close.svg"
                alt=""
              />
            </button>
          </div>

          {/* Modal links */}
          <div className="nav-list-modal text-onest">
            <h1 className="text text-h-1 text-bold">Menu</h1>
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                style={{
                  transition: `all ${
                    0.8 + index * 0.1
                  }s cubic-bezier(1, 0, 0, 1)`,
                }}
                className="nav-link text text-h-4 text-light"
                onClick={openMenu}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Modal CTA button */}
          <div className="modal-btn" style={{
                  transition: `all 0.8s cubic-bezier(1, 0, 0, 1)`,
                }} onClick={openMenu}>
            <Link to="#contact-section">
              <Button body="Contact" icon="call" />
            </Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
