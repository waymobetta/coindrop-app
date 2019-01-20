import React from "react";
import "./Info.css";

export default ({
  description,
  className = "",
  ...props
}) =>
  <p
    className={`Info ${className}`}
    {...props}
  >
    {description}
  </p>;
