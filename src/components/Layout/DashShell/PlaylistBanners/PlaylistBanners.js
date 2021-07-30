import React, { useEffect, useState } from "react";
import { query } from "../../../../services/RemoteData";
import { generateKey, randomize } from "../../../../util/Functions";
import { queueCollection } from "../../../../util/PlayerConnect";
import "./PlaylistBanners.css";

const PlaylistBanners = ({ small }) => {
  const [objects, setObjects] = useState([]);
  useEffect(() => {
    !objects?.length &&
      query("playlist").then((res) => {
        const o = randomize((res.data || res)?.filter((f) => !!f.image)).slice(
          0,
          small ? 3 : 6
        );
        o.map((f) => (f.listKey = generateKey(f.Title)));
        setObjects(o);
      });
  }, [objects, small]);
  return (
    <div className="banner-container">
      {objects?.map((object) => (
        <PlaylistBanner i={object} small={small} />
      ))}
    </div>
  );
};

const PlaylistBanner = ({ i, small }) => {
  const getPlaylist = (x) => queueCollection("playlist", x, small);
  return (
    <div
      onClick={() => getPlaylist(i.listKey)}
      key={i.Title}
      className="banner standard-button"
      style={{ backgroundImage: "url(" + i.image + ")" }}
    >
      {i.Title}
      <div className="material-icons">volume_up</div>
    </div>
  );
};

PlaylistBanners.defaultProps = {};
export default PlaylistBanners;
