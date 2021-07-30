import { Badge } from "@material-ui/core";
import React from "react";
import Photo from "../Photo/Photo";
import Caption from "./Caption/Caption";
import "./Thumbnail.css";
import { ThumbnailTypes } from "./ThumbnailTypes";
import { makeStyles } from "@material-ui/core/styles";
import { rxcs } from "../../../../util/Functions";

const useStyles = makeStyles((theme) => ({
  Thumbnail: {
    height: 226,
    marginTop: 12,
    lineHeight: 1.125,
    "& img": {
      transition: "all 0.2s linear",
      width: 180,
      height: 180,
    },
    [theme.breakpoints.down("xs")]: {
      height: 196,
      marginTop: 12,
      lineHeight: 1.125,
      "& img": {
        width: 160,
        height: 160,
      },
    },
    "&.open": {
      height: 176,
      [theme.breakpoints.down("xs")]: {
        "& img": {
          width: 132,
          height: 132,
        },
      },
    },
  },
}));

const Thumbnail = (props) => {
  const { track, clicked, open } = props;
  const classes = useStyles(props);
  const what = ThumbnailTypes.filter((t) => t.when(track))[0];
  if (!what) {
    return <em>Could not parse item {JSON.stringify(track)}</em>;
  }
  const parsed = what.is(track);
  const { Title, count = 0, image, footer, secondary } = parsed;
  const foot = footer(track);
  const line = secondary && secondary(track);
  return (
    <>
      <div
        className={rxcs({
          [classes.Thumbnail]: true,
          open,
        })}
        onClick={() => clicked && clicked(parsed)}
      >
        <Badge max={9999} color="secondary" badgeContent={count}>
          <Photo className="standard-button" src={image} alt={Title} />
        </Badge>
        <Caption text={Title} />
        <Caption text={foot} small />
        {!!line?.length && <Caption text={line} small />}
      </div>
      <div className={classes.ThumbnailRight}>&nbsp;</div>
    </>
  );
};

Thumbnail.defaultProps = {};
export default Thumbnail;
