import React, { useCallback, useEffect, useState } from "react";
import "./VerticalList.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { queueCollection } from "../../../../util/PlayerConnect";
import { HourglassEmpty, VolumeUp } from "@material-ui/icons";
import { PlayerAction } from "../../../Audio/Player/Player";
import { rxcs } from "../../../../util/Functions";
import Spinner from "../../../Common/Control/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  gutter: {
    padding: 0,
    margin: 0,
    // outline: 'dotted 2px orange'
  },
  title: {
    fontSize: "20px",
    margin: 0,
  },
  label: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
}));

const Waiter = () => (
  <Spinner on>
    <HourglassEmpty />
  </Spinner>
);

const VerticalListItem = ({ artist, i, footer, loadVertical, field, type }) => {
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const classes = useStyles();

  const load = (id) => {
    setBusy(true);
    loadVertical(id);
  };

  const check = useCallback(
    (track) => {
      const test = {
        artist: artist.ID === track.artistFk,
        album: artist.ID === track.albumFk,
      };
      setActive(test[type]);
      setBusy(false);
    },
    [type, artist]
  );

  useEffect(() => {
    const sub = PlayerAction.subscribe((t) => {
      !!t?.FileKey && check(t);
    });
    return () => sub.unsubscribe();
  });
  const label = i === 0 ? artist.Name : `${i + 1}. ${artist.Name}`;
  return (
    <ListItem
      onClick={() => load(artist.ID)}
      key={artist.ID}
      classes={{
        gutters: classes.gutter,
        multiline: classes.multiline,
        root: rxcs({ "standard-button": true }),
      }}
      style={{ margin: 0, padding: "0 8px" }}
    >
      {i === 0 && (
        <ListItemAvatar>
          <Avatar alt={artist.Name} src={artist[field]} />
        </ListItemAvatar>
      )}
      <ListItemText
        classes={{
          primary: rxcs({ [classes.label]: true, link: true }),
          secondary: classes.label,
        }}
        key={artist.ID}
        secondary={footer(artist)}
        primary={
          <>
            {active && <VolumeUp />}
            {busy && <Waiter />}
            {label}
          </>
        }
      />
    </ListItem>
  );
};
const VerticalList = (props) => {
  const { objects, field, type, small } = props;
  const classes = useStyles();
  const artists = objects?.result || [];
  const loadVertical = (id) => queueCollection(type, id, small);
  return (
    <div className={classes.root}>
      {/* <div className={classes.title}>
        <>{icon}</>
        {label}
      </div> */}
      <List dense component="nav" aria-label="main mailbox folders">
        {artists.map((artist, i) => {
          const args = {
            artist,
            i,
            footer: props.footer,
            type,
            loadVertical,
            field,
            key: i,
          };
          return <VerticalListItem {...args} />;
        })}
      </List>
    </div>
  );
};

VerticalList.defaultProps = {};
export default VerticalList;
