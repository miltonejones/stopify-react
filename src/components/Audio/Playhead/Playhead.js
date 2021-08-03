import {
  Favorite,
  MoreHoriz,
  Pause,
  PlayArrow,
  Repeat,
  Shuffle,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons";
import { PlayerAction } from "../Player/Player";
import React, { useEffect, useState } from "react";
import "./Playhead.css";
import PlayerButton, { SquareButton } from "../PlayerButton/PlayerButton";
import { rxcs } from "../../../util/Functions";
import { playlistCount } from "../../../services/RemoteData";
import { openTrackMenuDrawer } from "../../Common/Control/TrackMenu/TrackMenu";

const Playhead = ({
  advance,
  tracks,
  index,
  on,
  flat,
  mode,
  setMode,
  small,
  progress,
  collapsed,
}) => {
  const track = tracks[index];
  const [heart, setHeart] = useState(undefined);
  const buttons = [
    {
      size: "small",
      icon: <Favorite />,
      flat: true,
      color: heart ? "secondary" : "default",
    },
    {
      size: "small",
      icon: <Repeat />,
      color: mode.repeat ? "secondary" : "default",
      onClick: () => setMode({ ...mode, repeat: !mode.repeat }),
      flat,
    },
    {
      size: "small",
      icon: <SkipPrevious />,
      onClick: () => advance(-1),
      disabled: index < 1,
      hidden: collapsed,
    },
    {
      progress,
      collapsed,
      on,
      icon: on ? <Pause /> : <PlayArrow />,
      onClick: () => {
        if (on) return PlayerAction.next(false);
        PlayerAction.next(track);
      },
    },
    {
      size: "small",
      icon: <SkipNext />,
      onClick: () => advance(1),
      disabled: !(index < tracks?.length - 1),
      solo: collapsed,
      // hidden: collapsed,
    },
    {
      size: "small",
      color: mode.shuffle ? "secondary" : "default",
      onClick: () => setMode({ ...mode, shuffle: !mode.shuffle }),
      icon: <Shuffle />,
      flat,
    },
    {
      size: "small",
      icon: <MoreHoriz />,
      flat: true,
      menu: true,
      onClick: () => {
        !!track && openTrackMenuDrawer.next({ track });
      },
    },
  ];
  useEffect(() => {
    !!track &&
      playlistCount(track).then((x) => {
        setHeart(x > 0);
      });
  }, [track, heart]);
  const menuButton = buttons.filter((b) => b.menu)[0];
  return (
    <>
      <div
        className={rxcs({
          Playhead: true,
          flat,
        })}
      >
        {buttons
          .filter((f) => !f.flat)
          .map((b, i) => (
            <PlayerButton small={small} flat={flat} {...b} key={i} />
          ))}
        {flat && small && (
          <SquareButton {...menuButton}>{menuButton.icon}</SquareButton>
        )}
      </div>

      {!!flat && (
        <div
          className={rxcs({
            Playhead: true,
            lower: true,
          })}
        >
          {" "}
          {buttons
            .filter((f) => f.flat)
            .map((b, i) => (
              <SquareButton {...b} key={i}>
                {b.icon}
              </SquareButton>
            ))}
        </div>
      )}
    </>
  );
};

Playhead.defaultProps = {};
export default Playhead;
