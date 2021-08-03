import { Favorite } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { blobDownloadComplete, cached } from "../../../../services/Blob";
import { playlistCount } from "../../../../services/RemoteData";
import { rxcs } from "../../../../util/Functions";
import "./DecoratedTrackTitle.css";

const DecoratedTrackTitle = ({ track, click, link }) => {
  const [saved, setSaved] = useState(-1);
  const [heart, setHeart] = useState(undefined);
  const ping = useCallback(() => {
    cached(track).then((rows) => {
      setSaved(rows?.length > 0 ? 1 : 0);
    });
    heart === undefined && playlistCount(track).then((x) => setHeart(x > 0));
  }, [track, heart]);
  useEffect(() => {
    saved < 0 && ping();
    const s = blobDownloadComplete.subscribe(ping);
    return () => s.unsubscribe();
  }, [saved, ping]);

  const primary = rxcs({
    truncate: true,
    saved: saved === 1,
    link,
    "max-200": 1,
    "no-wrap": 1,
  });
  return (
    <div className={primary} onClick={() => click && click()}>
      {!!heart && <Favorite style={{ color: "red", fontSize: ".9rem" }} />}
      {track.Title}
    </div>
  );
};

DecoratedTrackTitle.defaultProps = {};
export default DecoratedTrackTitle;
