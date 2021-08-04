import { LinearProgress } from "@material-ui/core";
import React from "react";
import "./LoadingAnimation.css";

const LoadingAnimation = ({ message }) => {
  return (
    <>
      {message}
      <div className="LoadingAnimation">
        <LinearProgress variant="indeterminate" />
      </div>
    </>
  );
};

LoadingAnimation.defaultProps = {};
export default LoadingAnimation;
