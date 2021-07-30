import React from "react";
import { rxcs } from "../../../util/Functions";
import { makeStyles } from "@material-ui/core/styles";
import "./ProgressBar.css";

const useStyles = makeStyles({
  root: {
    // outline: "solid 4px red",
    "&:before": {
      width: (props) => `${props.value}%`,
    },
    "&:after": {
      left: (props) => `${props.value}%`,
    },
  },
});
const ProgressBar = (props) => {
  const { width, value, changed, flat } = props;
  const classes = useStyles(props);
  const handleMouseDown = (e) => {
    const { offsetX } = e.nativeEvent;
    const percent = offsetX / width;
    changed && changed(percent);
  };
  const className = rxcs({
    ProgressBar: true,
    [classes.root]: flat,
    flat,
  });
  return (
    <div className={className} onMouseDown={handleMouseDown} style={{ width }}>
      <div className="prog-bar-inner" style={{ width: `${value}%` }}></div>
    </div>
  );
};

ProgressBar.defaultProps = {};
export default ProgressBar;
