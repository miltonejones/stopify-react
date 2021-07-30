import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import {
  Add,
  Album,
  Cached,
  Edit,
  LocalOffer,
  People,
  PlaylistAddCheck,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { blobDownloadComplete, cache, cached } from "../../../../services/Blob";
import Observer from "../../../../services/Observables";
import { openTrackEditorDrawer } from "../../Form/TrackEditor/TrackEditor";
import { openPlaylistMenuDrawer } from "../PlaylistMenu/PlaylistMenu";
// import ListItemLink from "../ListItemLink/ListItemLink";
import "./TrackMenu.css";

const TrackMenu = ({ track, click }) => {
  const [saved, setSaved] = useState(-1);
  useEffect(() => {
    !!track &&
      saved < 0 &&
      cached(track).then((rows) => {
        setSaved(rows?.length > 0 ? 1 : 0);
      });
  }, [saved, track]);
  const nodes = [
    {
      label: "View Artist",
      dataType: "artist",
      ID: track?.artistFk,
      when: !!track?.artistFk,
      footer: track?.artistName,
      icon: <People />,
      path: `/browse/artist/${track?.artistFk}`,
    },
    {
      label: "View Album",
      dataType: "album",
      ID: track?.albumFk,
      when: !!track?.albumFk,
      footer: track?.albumName,
      icon: <Album />,
      path: `/browse/album/${track?.albumFk}`,
    },
    {
      label: "View Genre",
      dataType: "genre",
      ID: track?.genreKey,
      when: !!track?.genreKey,
      footer: track?.Genre,
      icon: <LocalOffer />,
      path: `/browse/genre/${track?.genreKey}`,
    },
  ].filter((f) => f.when);

  const save = async (t) => {
    const file = await cache(t);
    blobDownloadComplete.next(file);
    click && click();
  };

  const locale = useHistory();
  const navigateToObject = (d) => {
    locale.push(d.path);
    console.log({ d });
    click && click();
  };

  const caption = saved === 1 ? "Remove download" : "Download song";

  return (
    <List>
      {nodes.map((node) => {
        return (
          // <ListItemLink
          //   icon={node.icon}
          //   key={node.label}
          //   secondary={node.footer}
          //   primary={node.label}
          //   to={node.path}
          // />
          <ListItemSm node={node} click={navigateToObject} />
        );
      })}

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PlaylistAddCheck />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add to queue" secondary="Play this song next" />
      </ListItem>

      <ListItem
        onClick={() => {
          openTrackEditorDrawer.next(track);
          click && click();
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <Edit />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{ primary: "link" }}
          primary="Edit Track"
          secondary="Open the track editor"
        />
      </ListItem>

      <ListItem
        onClick={() => {
          openPlaylistMenuDrawer.next(track);
          click && click();
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <PlaylistAddCheck />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{ primary: "link" }}
          primary="Add to playlist"
          secondary="Organize this song  to play later"
        />
      </ListItem>

      <ListItem onClick={() => save(track)}>
        <ListItemAvatar>
          <Avatar>
            <Cached />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{ primary: "link" }}
          primary={caption}
          secondary="Save this song to your device"
        />
      </ListItem>
    </List>
  );
};

const ListItemSm = ({ node, click }) => {
  return (
    <ListItem onClick={() => click(node)}>
      <ListItemAvatar>
        <Avatar>{node.icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: "link" }}
        secondary={node.footer}
        primary={node.label}
      />
    </ListItem>
  );
};

TrackMenu.propTypes = {};

TrackMenu.defaultProps = {
  click: (i) => !!i && alert(`${i.Title} was clicked`),
};

export default TrackMenu;

export const openTrackMenuDrawer = new Observer("openTrackMenuDrawer");

export const TrackMenuDrawer = ({ direct }) => {
  const [args, setArgs] = useState({ open: false });

  const toggleDrawer = () => {
    setArgs({ open: false });
  };

  useEffect(() => {
    openTrackMenuDrawer.subscribe((a) => setArgs({ ...a, open: true }));
  });

  return (
    <div>
      <Drawer anchor="bottom" open={args.open} onClose={toggleDrawer}>
        <TrackMenu
          {...args}
          click={(e) => {
            toggleDrawer();
            !!e && direct(e);
          }}
        />
      </Drawer>
    </div>
  );
};
