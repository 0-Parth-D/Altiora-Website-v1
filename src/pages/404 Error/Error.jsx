import React from "react";
import "./Error.css";
import { Link } from "react-router";
import Button from "../../components/Button/Button";

const Error = (props) => {
  return (
    <div className="error-page">
      <div className="error-header">
        <h1 className="text text-h-1 text-bold text-onest">
          404 Error<span style={{ color: "crimson" }}>!</span>
        </h1>
        <h5 className="text text-h-6 text-regular text-onest">
          We're sorry, but the page you are looking for could not be found. It
          might have been moved, deleted, or the URL could be incorrect.
        </h5>
        <Link to="/">
          <Button body="Home" icon="arrow-right" />
        </Link>
      </div>
      {/* <img src="/error/404-not-found.jpg" alt="" /> */}
    </div>
  );
};

export default Error;
