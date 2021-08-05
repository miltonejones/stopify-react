import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./TrackGrid.css";
import { mmss, pristine } from "../../../../util/Functions";
import TrackList from "../TrackList/TrackList";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { openTrackMenuDrawer } from "../../Control/TrackMenu/TrackMenu";
import { useState } from "react";
import DecoratedTrackTitle from "../../Control/DecoratedTrackTitle/DecoratedTrackTitle";
import { queueTracks } from "../../../../util/PlayerConnect";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { PlayerAction } from "../../../Audio/Player/Player";
import { SongPersistService } from "../../../../services/Persist";
import CarouselWrapper from "../../../Layout/DashShell/CarouselWrapper/CarouselWrapper";

const columns = [
  {
    field: "trackNumber",
    headerName: "#",
    width: 56,
  },
  {
    field: "Title",
    headerName: "Title",
    width: 240,
    renderCell: (p) => <DecoratedTrackTitle track={p.row} />,
  },
  {
    field: "artistName",
    headerName: "Artist",
    width: 180,
  },
  {
    field: "albumName",
    headerName: "Album",
    width: 180,
  },
  {
    field: "Genre",
    headerName: "Genre",
    width: 150,
  },
  {
    field: "trackTime",
    headerName: "Time",
    // sortable: false,
    width: 160,
    renderCell: (params) => mmss(params.row.trackTime / 1000),
    //    valueGetter: (params) => params.getValue("Size"),
  },
  {
    field: "menu",
    headerName: " ",
    always: !0,
    width: 56,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <IconButton
          onClick={() => {
            const track = params.row;
            openTrackMenuDrawer.next({ track });
          }}
          size="small"
        >
          <MoreVert />
        </IconButton>
      );
    },
  },
];

export default function TrackGrid({
  rows = [],
  fields = [],
  clicked,
  open = true,
  selection,
  screenState,
}) {
  const [args, setArgs] = useState({ open: false });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const requestPlay = (t) => {
    const start = pristine(rows).indexOf(t);
    const p = queueTracks(matches, rows, start, t);
    setArgs(p);
  };

  const locale = useHistory();
  const navigateToObject = (d) => {
    locale.push(d);
    console.log({ d });
  };
  const handleData = (e) => {
    // ['artist','album','genre']
    const addresses = {
      artistName: `/browse/artist/${e.row.artistFk}`,
      albumName: `/browse/album/${e.row.albumFk}`,
      Genre: `/browse/genre/${e.row.genreKey}`,
    };
    if (!!addresses[e.field]) {
      return navigateToObject(addresses[e.field]);
    }
    e.field !== "menu" && requestPlay(e.row);
  };
  useEffect(() => {
    const o = SongPersistService.current;
    const sub = PlayerAction.subscribe((t) => {
      t?.hasOwnProperty("FileKey") && setArgs({ ...args, t });
    });
    !!o && !args?.t && setArgs({ ...args, t: o });
    return () => sub.unsubscribe();
  }, [args]);
  const selected = [args.t?.ID];

  if (screenState === "tablet") {
    return (
      <>
        <CarouselWrapper
          choose={requestPlay}
          tracks={rows.filter((f) => !!f.albumImage)}
        />
      </>
    );
  }

  if (matches) {
    return (
      <>
        <TrackList
          selection={selected}
          choose={requestPlay}
          open={open}
          pageSize={10}
          tracks={rows}
        />
      </>
    );
  }
  return (
    <>
      [{screenState}]
      <DataGrid
        onCellClick={handleData}
        classes={{ root: "TrackGrid" }}
        selectionModel={selected}
        rows={rows}
        columns={columns.filter(
          (c) => c.always || fields?.indexOf(c.field) > -1
        )}
        pageSize={10}
      />
    </>
  );
}
