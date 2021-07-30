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
import Photo from "../Photo/Photo";
import CrumbList from "../CrumbList/CrumbList";
import { rxcs } from "../../../../util/Functions";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 88,
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

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  white: {
    color: "white",
    marginLeft: "auto",
  },
  CrumbList: {
    padding: " 0 12px",
    mixBlendMode: "exclusion",
    color: "white",
    display: "flex",
    alignItems: "center",
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
  if (!title)
    return (
      <>
        <LinearProgress variant="indeterminate" />
      </>
    );

  return (
    <div
      className={rxcs({ [classes.ListHeader]: true, off })}
      style={{ backgroundImage: `url(${imageLg})` }}
    >
      {loading && <LinearProgress variant="indeterminate" />}
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
          <Photo src={image} alt={title} />
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
