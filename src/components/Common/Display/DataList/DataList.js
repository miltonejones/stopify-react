import React, { useCallback, useEffect, useState } from "react";
import { navigationComplete } from "../../../../app/State";
import { Analyser } from "../../../../services/AudioAnalyzer";
import { blobDownloadComplete } from "../../../../services/Blob";
import Observer from "../../../../services/Observables";
import {
  dataStateChange,
  endpoint,
  query,
} from "../../../../services/RemoteData";
import { sortObjects } from "../../../../util/Functions";
import { PlayerAction } from "../../../Audio/Player/Player";
import { drawerOpen } from "../../../Audio/ResponsivePlayerDrawer/ResponsivePlayerDrawer"; 
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import { GridFieldType } from "../Thumbnail/ThumbnailTypes";
import TrackGrid from "../TrackGrid/TrackGrid";
import "./DataList.css";
export const dataListChanged = new Observer();
const fix = (rows, type) => {
  rows?.map && rows?.map((row) => (row.id = row.id || row.ID || Math.random()));
  return (!rows?.map ? [] : sortObjects(rows, type)).filter(
    (row) => !row.duplicate
  );
};

// rows?.map((row) => (row.id = row.id || row.ID || Math.random()));

const DataList = ({
  dataType,
  ID,
  flat,
  route,
  small,
  direct,
  screenState,
}) => {
  const [items, setItems] = useState([]);
  const [playerDrawerOpen, setPlayerDrawerOpen] = useState(false);
  const [cache, setCache] = useState("");
  const [args, setArgs] = useState({ open: false });
  const [artistFk, setArtistFk] = useState(null);
  const [info, setInfo] = useState({});
  const [message, setMessage] = useState("No results to display.");
  // const landscape = screenState === SCREEN_STATE.TABLET;
  const init = useCallback(
    () =>
      query(dataType, ID).then((queryDatum) => {
        const c = endpoint(dataType, ID);
        const i = fix(
          queryDatum.data?.related ||
            queryDatum.data?.data ||
            queryDatum.data ||
            queryDatum,
          dataType
        );
        const name =
          queryDatum.data?.Name ||
          queryDatum?.data?.Title ||
          (ID ? `${dataType}: ${ID}` : "Library");
        setInfo({
          caption: `${i.length} tracks from your library`,
          title: name,
        });
        setArtistFk(i?.[0].artistFk);
        setItems(i);
        setCache(c);
        const msgRoute = route || { path: "Library.html" };
        navigationComplete.next({ route: msgRoute, name });
      }),
    [ID, dataType, route]
  );

  useEffect(() => {
    const c = endpoint(dataType, ID);
    const o = !!cache && cache !== c;
    !!dataType && (!items?.length || o) && init();
    const sub = [
      dataStateChange.subscribe((msg) => {
        setMessage(msg);
      }),
      dataListChanged.subscribe(init),
      blobDownloadComplete.subscribe(init),
      Analyser.audioEvent.subscribe((b) => {
        const { t } = args;
        b.begun && !!t?.artistFk && setArtistFk(t.artistFk);
      }),
      drawerOpen.subscribe((d) => setPlayerDrawerOpen(d.open)),
      PlayerAction.subscribe((t) => {
        t?.hasOwnProperty("FileKey") && setArgs({ ...args, t });
      }),
    ];
    return () => sub.map((s) => s.unsubscribe());
  }, [items, ID, args, dataType, route, cache, init]);

  const fields = GridFieldType[dataType] || [
    "Title",
    "albumName",
    "artistName",
    "trackTime",
  ];
  if (!items.length) {
    return <>{message}</>;
  }
  // const playByTrack = (t) => {
  //   const start = items.indexOf(t);
  //   const cancel = () => {
  //     drawerOpen.next({ open: false });
  //   };
  //   const p = { open: !small, cancel, flat, items, start, t };
  //   setArgs(p);
  //   drawerOpen.next(p);
  //   setTimeout(() => Analyser.audioEvent.next({ goto: start }), 499);
  // };
  return (
    <>
      {!!artistFk && (
        <ArtistHeader
          direct={direct}
          disabled={small}
          screenState={screenState}
          {...info}
          artistFk={artistFk}
        />
      )}
      <div className="DataList">
        <TrackGrid
          screenState={screenState}
          selection={[args.t?.ID]}
          open={!playerDrawerOpen}
          rows={items}
          fields={fields}
        />
      </div>
    </>
  );
};

DataList.defaultProps = {};
export default DataList;
