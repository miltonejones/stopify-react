import React from "react";
import { withStyles } from "@material-ui/core/styles";
import "./PlayerButton.css";
import { IconButton } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import ProgressButton from "../ProgressButton/ProgressButton";
const margin = [
  {
    when: (props) => props.small || props.collapsed,
    what: "0 8px",
    size: 48,
  },
  {
    when: (props) => props.flat && !props.solo,
    what: "8px 16px",
    size: 32,
  },
  {
    when: (props) => props.solo,
    what: "0",
    size: 28,
  },
  {
    when: () => !0,
    what: "0 4px",
    size: 56,
  },
];
const styles = {
  root: {
    // color: "white",
    // mixBlendMode: "exclusion",
    width: 56,
    height: 56,
    color: "firebrick",
    fontSize: (props) => (props.flat ? "2rem" : "1rem"),
    margin: (props) => margin.filter((m) => m.when(props))[0].what,
    boxShadow: (p) =>
      p.flat
        ? "0 3px 6px rgb(33 33 33 / 10%), 0 3px 12px rgb(33 33 33 / 15%)"
        : ` 5px 5px 10px #d4d4d4, 
    -5px -5px 10px #ffffff`,
    "& :active": {
      borderRadius: "50%",
      boxShadow: `inset 6px 6px 12px #c8c8c8, 
      inset -6px -6px 12px #ffffff`,
    },
  },
  sizeSmall: {
    color: "black",
    fontSize: "1rem",
    width: (props) => margin.filter((m) => m.when(props))[0].size,
    height: (props) => margin.filter((m) => m.when(props))[0].size,
  },
  disabled: {
    boxShadow: `inset 6px 6px 12px #c8c8c8, 
    inset -6px -6px 12px #ffffff`,
  },
};

const square = {
  root: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",

    //\\ color: (props) => (props.flat ? "white" : "black"),
    // mixBlendMode: (props) => (props.flat ? "exclusion" : ""),
    // background: "linear-gradient(145deg, #fbfbfb, #d4d4d4)",
    boxShadow: (props) =>
      props.flat
        ? ""
        : `4px 4px 7px #cccccc, 
                 -4px -4px 7px #ffffff`,
    borderRadius: "6px",
    "& :active": {
      borderRadius: "6px",
      boxShadow: `inset 6px 6px 12px #c8c8c8, 
      inset -6px -6px 12px #ffffff`,
    },
    "&.white": {
      color: (props) => (props.flat ? "white" : "black"),
      mixBlendMode: (props) => (props.flat ? "exclusion" : ""),
    },
  },
};

export const RoundedButton = withStyles(styles)(IconButton);
export const SquareButton = withStyles(square)(IconButton);

const PlayerButton = (props) => {
  if (props.hidden) return <i />;
  if (props.progress) {
    return <ProgressButton {...props} value={props.progress} />;
  }
  return (
    <>
      <RoundedButton {...props}>{props.icon}</RoundedButton>
    </>
  );
};

PlayerButton.defaultProps = {
  icon: <PlayArrow />,
};
export default PlayerButton;
