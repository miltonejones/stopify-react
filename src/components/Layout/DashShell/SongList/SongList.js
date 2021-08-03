import { IconButton, LinearProgress } from "@material-ui/core";
import { MoreVert, VolumeUp } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { DEFAULT_IMAGE } from "../../../../app/Constants";
import { PlayerAction } from "../../../Audio/Player/Player";
import DecoratedTrackTitle from "../../../Common/Control/DecoratedTrackTitle/DecoratedTrackTitle";
import { openTrackMenuDrawer } from "../../../Common/Control/TrackMenu/TrackMenu";
import "./SongList.css";

const SongList = (props) => {
  const { data, play } = props;
  const items = !data?.length ? [] : data.slice(0, 6);
  if (!data) return <LinearProgress />;

  return (
    <div className="genre-song-list">
      {items.map((item, i) => (
        <SongItem key={i} play={play} item={item} />
      ))}
    </div>
  );
};

SongList.defaultProps = {};
export default SongList;

const SongItem = ({ item, play }) => {
  const [active, setActive] = useState(false);
  const check = useCallback(
    (track) => {
      setActive(item.FileKey === track.FileKey);
    },
    [item]
  );

  useEffect(() => {
    const sub = PlayerAction.subscribe((t) => {
      !!t?.FileKey && check(t);
    });
    return () => sub.unsubscribe();
  });
  return (
    <div key={item.ID} className="standard-button genre-song-item">
      <div className="genre-song-item-photo">
        <img
          onClick={() => play && play(item)}
          alt={item.Title}
          src={item.albumImage || DEFAULT_IMAGE}
        />
      </div>
      <div className="genre-song-item-title standard-link flex">
        {active && <VolumeUp />}
        <DecoratedTrackTitle
          link
          click={() => play && play(item)}
          track={item}
        />
        <div className="righted">
          <IconButton
            size="small"
            onClick={() => {
              openTrackMenuDrawer.next({ track: item });
            }}
          >
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="genre-song-item-artist">
        <TextOrLink
          path="/show/Artist.html/"
          id={item.artistFk}
          text={item.artistName}
        />
      </div>
      <div className="genre-song-item-album">
        <TextOrLink
          path="/show/Album.html/"
          id={item.albumFk}
          text={item.albumName}
        />
      </div>
    </div>
  );
};

const TextOrLink = ({ text }) => <>{text}</>;
