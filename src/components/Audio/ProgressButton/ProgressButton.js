import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, blue } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import { rxcs } from "../../../util/Functions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: (p) => (p.collapsed ? -2 : -6),
    left: (p) => (p.collapsed ? -2 : -6),
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ProgressButton({
  value,
  icon,
  onClick,
  on,
  collapsed,
}) {
  const classes = useStyles({ collapsed });

  const buttonClassname = rxcs({
    [classes.buttonSuccess]: !!on,
  });

  const handleButtonClick = () => {
    onClick && onClick();
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper} onClick={handleButtonClick}>
        <Fab
          aria-label="save"
          size={collapsed ? "small" : "large"}
          color="secondary"
          className={buttonClassname}
        >
          {icon}
        </Fab>
        {value && (
          <CircularProgress
            value={value}
            size={collapsed ? 44 : 68}
            variant="determinate"
            className={classes.fabProgress}
          />
        )}
      </div>
    </div>
  );
}
