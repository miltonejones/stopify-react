import { LinearProgress } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { navigationComplete } from "../../../../app/State";
import { endpoint, search } from "../../../../services/RemoteData";
import { PlayerAction } from "../../../Audio/Player/Player";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import ThumbGrid from "../ThumbGrid/ThumbGrid";
import { DefaultGridColumns } from "../Thumbnail/ThumbnailTypes";
import TrackGrid from "../TrackGrid/TrackGrid";
import "./SearchGrid.css";

const SearchGrid = ({ param, type, direct, route, small }) => {
  const [gridItems, setGridItems] = useState(null);
  const [cache, setCache] = useState("");
  const [info, setInfo] = useState({});
  const [artistFk, setArtistFk] = useState(null);
  const init = useCallback(
    () =>
      search(param, type).then((queryDatum) => {
        const c = endpoint(param, type);
        const { items, map, label } = queryDatum.data;
        const reformed = items.map((item) => {
          const r = {};
          for (const n in map) {
            r[map[n]] = item[n];
          }
          return item.data || r;
        });
        console.log({ queryDatum: queryDatum.data, reformed });
        setGridItems(reformed);
        setCache(c);
        setInfo({
          caption: `${reformed.length} tracks from your library`,
          title: label,
        });
        navigationComplete.next({ name: label });
        !!reformed.length &&
          !!reformed[0].artistFk &&
          setArtistFk(reformed[0].artistFk);
      }),
    [param, type]
  );

  useEffect(() => {
    const c = endpoint(param, type);
    const o = !!cache && cache !== c;
    (!gridItems || o) && init();

    const subs = [
      PlayerAction.subscribe((t) => {
        !!t?.artistFk && setArtistFk(t.artistFk);
      }),
    ];

    return () => subs.map((s) => s.unsubscribe());
  }, [gridItems, init, cache, param, type]);

  if (!gridItems?.length) {
    return <LinearProgress variant="indeterminate" />;
  }

  if (type === "songs") {
    return (
      <>
        {!!artistFk && (
          <ArtistHeader
            direct={direct}
            disabled={small}
            {...info}
            artistFk={artistFk}
          />
        )}
        <div className="SearchGrid">
          <TrackGrid
            open
            rows={gridItems}
            route={route}
            clicked={direct}
            fields={DefaultGridColumns}
          />
        </div>
      </>
    );
  }

  return (
    <div className="SearchGrid">
      <ThumbGrid clicked={direct} open items={gridItems} />
    </div>
  );
};

SearchGrid.defaultProps = {};
export default SearchGrid;
