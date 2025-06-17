import React from "react";
import "./Footer.css";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <div className="footer-container">
      <Link to="/">
        <img className="footer-logo" src="/logo.svg" alt="" />
      </Link>
      <div className="footer-links">
        <div className="follow-links-container">
          <h4 className="text text-h-5 text-medium text-onest">Follow us on</h4>
          <div className="follow-links">
            <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="" />
            </Link>
            <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.svg" alt="" />
            </Link>
            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="" />
            </Link>
            <Link to="https://x.com/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitter-x.svg" alt="" />
            </Link>
            <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/youtube.svg" alt="" />
            </Link>
          </div>
        </div>
        <div className="main-links-container">
          <div className="navigate-links-container">
            <h4 className="text text-h-5 text-medium text-onest">Navigate</h4>
            <ul className="navigate-links">
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Home</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Services</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Our Process</Link>
              </li>
            </ul>
          </div>
          <div className="company-links-container">
            <h4 className="text text-h-5 text-medium text-onest">Company</h4>
            <ul className="company-links">
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">About Us</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Careers</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="resources-links-container">
            <h4 className="text text-h-5 text-medium text-onest">Resources</h4>
            <ul className="resources-links">
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Blog</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Events</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Support</Link>
              </li>
            </ul>
          </div>
          <div className="services-links-container">
            <h4 className="text text-h-5 text-medium text-onest">Services</h4>
            <ul className="services-links">
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Design</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Sourcing</Link>
              </li>
              <li className="text text-body-1 text-regular text-onest">
                <Link className="hover-highlight" to="/">Manufacturing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text text-body-2 text-regular text-onest">
        Copyright © 2025 Altiora Corp - All Rights Reserved.
      </p>
    </div>
  );
};
