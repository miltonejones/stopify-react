import React, { useState } from "react";
import "./ListHeader.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpandLess,
  ExpandMore,
  MoreHoriz,
  PlayCircleFilled,
} from "@material-ui/icons";
import { Button, IconButton, LinearProgress } from "@material-ui/core";
import CrumbList from "../CrumbList/CrumbList";
import { rxcs } from "../../../../util/Functions";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 88,
    margin: "4px 0",
  },
  small: {
    marginLeft: 8,
    maxWidth: 40,
    minWidth: 40,
  },
  ListHeader: {
    width: "100%",
    height: "50vh",
    maxHeight: 400,
    backgroundSize: "cover",
    position: "relative",
    color: "white",
    backgroundRepeat: "no-repeat",
    transition: "all 0.4s ease-in",
    overflow: "hidden",
    backgroundPositionY: (p) => (p.loading ? -760 : 0),
    "& .lower": {
      position: "absolute",
      "&.img": {
        bottom: 40,
        left: 20,
        "& img": {
          width: 140,
        },
      },
      "&.desc": {
        mixBlendMode: "exclusion",
        bottom: 160,
        left: 180,
      },
    },
    "&.off": {
      height: 48,
      backgroundPositionY: -760,
      "& .lower": {
        display: "none",
      },
    },
    "@media screen and (max-height: 600px) and (orientation: landscape)": {
      height: 48,
      backgroundPositionY: "-760px !important",
      "& .lower": {
        display: "none",
      },
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  white: {
    color: "white",
    marginLeft: "auto",
    "@media screen and (max-height: 600px) and (orientation: landscape)": {
      display: "none",
    },
  },
  CrumbList: {
    padding: " 0 12px",
    mixBlendMode: "exclusion",
    color: "white",
    display: "flex",
    alignItems: "center",
    // "@media (orientation: landscape)": {
    //   display: "none",
    // },
  },
}));

const ListHeader = (props) => {
  const {
    imageLg,
    image,
    title,
    caption,
    loading,
    route,
    name,
    direct,
  } = props;
  const classes = useStyles(props);
  const [off, setOff] = useState(false);
  if (!title) {
    return <LoadingAnimation />;
  }

  return (
    <div
      className={rxcs({ [classes.ListHeader]: true, off })}
      style={{ backgroundImage: `url(${imageLg})` }}
    >
      {loading && <LoadingAnimation />}
      {!!(route || name || title) && (
        <div className={classes.CrumbList}>
          <CrumbList direct={direct} route={route} name={name || title} />
          <IconButton className={classes.white} onClick={() => setOff(!off)}>
            {!off ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
      )}
      <div className="lower img">
        <div>
          <img src={image} alt={title} />
        </div>
        <Button
          variant="contained"
          classes={{ root: classes.button }}
          color="secondary"
        >
          <PlayCircleFilled />
          Play
        </Button>
        <Button variant="contained" classes={{ root: classes.small }}>
          <MoreHoriz />
        </Button>
      </div>
      <div className="lower desc">
        <h1>{title}</h1>
        {caption}
      </div>
    </div>
  );
};

ListHeader.defaultProps = {};
export default ListHeader;
