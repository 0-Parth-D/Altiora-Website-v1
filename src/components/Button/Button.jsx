import React, { Component } from "react";
import "./Button.css";

export class Button extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        className={`primary-btn text text-onest text-body-1 text-regular text-body-1-regular ${
          this.props.className ? this.props.className : " "
        }`}
        type={this.props.type ? this.props.type : "button"}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <span>{this.props.body}</span>
        <img
          className="button-icon"
          src={`/icons/${this.props.icon}.svg`}
          alt=""
          srcSet=""
        />
      </button>
    );
  }
}

export default Button;
