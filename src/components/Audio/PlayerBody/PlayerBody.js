import {
  ExpandMore,
  QueueMusic,
  PlaylistAdd,
  Search,
} from "@material-ui/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Analyser } from "../../../services/AudioAnalyzer";
import { getWindowDimensions, mmss, rxcs } from "../../../util/Functions";
import Photo from "../../Common/Display/Photo/Photo";
import Player, { PlayerAction } from "../Player/Player";
import { SquareButton } from "../PlayerButton/PlayerButton";
import Playhead from "../Playhead/Playhead";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./PlayerBody.css";
import "./PlayerBodyFlat.css";
import "./PlayerBodyCollapsed.css";

import { makeStyles } from "@material-ui/core/styles";
import EqLabel from "../EqLabel/EqLabel";
import TrackList from "../../Common/Display/TrackList/TrackList";
import { Badge, useMediaQuery, useTheme } from "@material-ui/core";
import { SongPersistService } from "../../../services/Persist";
import { compareTrackToLists } from "../../../services/RemoteData";
import { openPlaylistMenuDrawer } from "../../Common/Control/PlaylistMenu/PlaylistMenu";
import PopoverInputDrawer from "../../Common/Control/PopoverInputDrawer/PopoverInputDrawer";

const useStyles = makeStyles({
  root: {
    // outline: "solid 4px red",
    width: (props) => props.width,
    "&:before": (props) =>
      props.flat
        ? {}
        : {
            content: '""',
            display: "block",
            background: "#333",
            width: 100,
            height: 20,
            borderRadius: "0 0 50% 50%",
            position: "absolute",
            top: 0,
            left: "calc((100vw - 100px) / 2)", // (props) => (props.width - 100) / 2,
          },
  },
});

const PlayerBody = (props) => {
  const { tracks, caption, subheader, flat, start, cancel, collapsed } = props;
  const { width } = getWindowDimensions();
  const [popper, setPopper] = useState(null);
  const classes = useStyles(props);
  const [mode, setMode] = useState({ repeat: true, shuffle: false });
  const [index, setIndex] = useState(start);
  const [queue, setQueue] = useState([...tracks]);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);
  const timer = useRef(false);
  const track = queue[index] || queue[start];

  const getSong = useCallback(
    (n) => {
      const it = queue[n];
      PlayerAction.next(it);
      SongPersistService.add(it);
      setIndex(n);
    },
    [queue]
  );

  const goto = useCallback(
    (n) => {
      PlayerAction.next(false);
      timer.current && window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => getSong(n), 299);
    },
    [timer, getSong]
  );

  const advance = useCallback((i) => goto(index + i), [index, goto]);

  useEffect(() => {
    const subs = [
      Analyser.audioEvent.subscribe((event) => {
        if (event.ended) return !!mode.repeat && advance(1);
        if (event.hasOwnProperty("goto")) return goto(event.goto);
        (!progress ||
          Math.abs(progress?.currentTime - event?.currentTime) > 0.2) &&
          setProgress(event);
      }),
      PlayerAction.subscribe((d) => setOn(d)),
    ];
    !!queue.length &&
      !!tracks.length &&
      (queue.length !== tracks.length ||
        queue[0].FileKey !== tracks[0].FileKey) &&
      setQueue([...tracks]);
    return () => subs.map((sub) => sub.unsubscribe());
  }, [progress, advance, goto, mode, tracks, queue]);
  const theme = useTheme();
  const screenIsBiggerThanSmSize = useMediaQuery(theme.breakpoints.up("sm"));
  const unload = () => {
    cancel && cancel();
  };
  const ProgressBarArgs = {
    width: screenIsBiggerThanSmSize ? 140 : width - 48,
    value: (progress?.currentTime / progress?.duration) * 100,
    changed: (p) => Analyser.audioEvent.next({ progress: p }),
  };

  const divClass = rxcs({
    [classes.root]: true,
    PlayerBody: true,
    collapsed,
    flat,
  });
  const className = rxcs({
    art: true,
    on,
  });
  const choose = (t) => {
    const i = queue.indexOf(t);
    goto(i);
    setOpen(false);
  };

  const openTrackList = (e) => {
    const ref = e.currentTarget;
    setPopper(screenIsBiggerThanSmSize ? ref : null);
    setOpen(!open);
  };

  const playlistCount = compareTrackToLists(track);

  const PlayheadArgs = {
    tracks: queue,
    on,
    advance,
    index,
    flat,
    mode,
    setMode,
    small: screenIsBiggerThanSmSize,
    collapsed,
    progress: ProgressBarArgs.value,
  };
  const TrackListArgs = {
    open,
    popper,
    tracks: queue,
    choose,
    close: () => setOpen(false),
    selection: [track?.ID],
  };
  const EqLabelArgs = {
    width: screenIsBiggerThanSmSize
      ? 360
      : collapsed
      ? 240
      : width - (flat ? 0 : 48),
    flat,
  };
  if (!track) {
    return <i />;
  }

  return (
    <div className={divClass}>
      <TrackList {...TrackListArgs} />

      <div className="header">
        <div className="menu1">
          <SquareButton
            className="white"
            flat={flat}
            onClick={() => unload && unload()}
            size="small"
          >
            <ExpandMore />
          </SquareButton>
        </div>
        <div className="caption">
          <h1>{caption}</h1>
          <p>{subheader}</p>
        </div>
        <div className="menu2">
          <PopoverInputDrawer />
        </div>
      </div>

      <Photo src={track.albumImage} alt={track.Title} className={className} />

      <div className="info">
        <h1>{track.artistName}</h1>
        <p>{track.Title}</p>
        <em>{track.albumName}</em>
      </div>

      <div className="header lower">
        <div className="menu1">
          <Badge color="primary" badgeContent={playlistCount}>
            <SquareButton
              onClick={() => {
                openPlaylistMenuDrawer.next(track);
              }}
              flat={flat}
              size="small"
            >
              <PlaylistAdd />
            </SquareButton>
          </Badge>
        </div>
        <div className="caption">&nbsp;</div>
        <div className="menu2">
          <Badge color="primary" badgeContent={queue?.length}>
            <SquareButton flat={flat} onClick={openTrackList} size="small">
              <QueueMusic />
            </SquareButton>
          </Badge>
        </div>
      </div>

      <div className="prog">
        <div className="prog-time">
          <p className="left">{mmss(progress?.currentTime)}</p>
          <p className="right">{mmss(progress?.duration)}</p>
        </div>
        <ProgressBar flat={flat} {...ProgressBarArgs} />
      </div>

      {flat && <Playhead {...PlayheadArgs} />}

      <EqLabel {...EqLabelArgs} />

      {!flat && <Playhead {...PlayheadArgs} />}

      <Player {...EqLabelArgs} />
    </div>
  );
};

PlayerBody.defaultProps = {};
export default PlayerBody;