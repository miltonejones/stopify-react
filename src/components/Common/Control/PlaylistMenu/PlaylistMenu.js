import { Divider, Drawer, Grid, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  addToPlaylistByKey,
  playListContainsTrack,
  query,
} from "../../../../services/RemoteData";
import "./PlaylistMenu.css";

import { rxcs } from "../../../../util/Functions";
import Observer from "../../../../services/Observables";
import Underline from "../../Underline/Underline";
const PlaylistMenu = ({ track }) => {
  const [lists, setLists] = useState([]);
  const update = useCallback(
    () =>
      query("playlist").then((res) => {
        console.log({ res });
        setLists([...res.data]);
      }),
    []
  );

  useEffect(() => {
    !lists.length && update();
  }, [lists, update]);

  const handleCheck = (listKey) => {
    addToPlaylistByKey(listKey, track).then(() => {
      window.setTimeout(() => update(), 199);
    });
  };

  return (
    <div className="PlaylistMenu">
      <Typography classes={{ root: "typo" }}>
        Add <Underline dark>{track?.Title}</Underline> to playlists(s):
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        {lists.map((item, i) => (
          <Grid
            classes={{
              root: rxcs({
                item: true,
                on: playListContainsTrack(track, item),
              }),
            }}
            key={i}
            item
            xs={6}
            sm={3}
            md={3}
            xl={2}
            lg={2}
          >
            <div onClick={() => handleCheck(item.Title)}> {item.Title}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

PlaylistMenu.defaultProps = {};
export default PlaylistMenu;

export const openPlaylistMenuDrawer = new Observer("openPlaylistMenuDrawer");

export const PlaylistMenuDrawer = () => {
  const [args, setArgs] = useState({ open: false });

  const toggleDrawer = () => {
    setArgs({ open: false });
  };

  useEffect(() => {
    openPlaylistMenuDrawer.subscribe((track) => setArgs({ track, open: true }));
  });

  return (
    <div>
      <Drawer anchor="bottom" open={args.open} onClose={toggleDrawer}>
        <PlaylistMenu {...args} />
      </Drawer>
    </div>
  );
};
