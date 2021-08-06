import React from "react";
import Popover from "@material-ui/core/Popover";
import "./PopoverInput.css";
import {
  Avatar,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { search, send } from "../../../../services/RemoteData";
import {
  Album,
  ChevronRight,
  LocalOffer,
  MoreHoriz,
  MusicNote,
  People,
  Sync,
} from "@material-ui/icons";
import { rxcs } from "../../../../util/Functions";
import { queueTrack } from "../../../../util/PlayerConnect";
import PopoverStyles from "./PopoverStyles";
import { useHistory } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { openTrackMenuDrawer } from "../TrackMenu/TrackMenu";
const PopoverInput = ({ setChosed, setParams }) => {
  const classes = PopoverStyles();
  const [on, setOn] = React.useState(grey[300]);
  const [paremeter, setParameter] = React.useState(null);
  const [data, setData] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.keyCode === 13 && find(event.target.value, event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const locale = useHistory();
  const navigateToObject = (d) => {
    const address = `/search/${d.type}/${d.param}`;
    locale.push(address);
  };

  const find = (param, anchor) => {
    setBusy(true);
    search(param).then((res) => {
      setParameter(param);
      setBusy(false);
      setData({ ...res.data });
      setAnchorEl(anchor);
    });
  };
  const keys = Object.keys(data).filter(
    (f) => ["youtube", "itunes"].indexOf(f) < 0
  );
  const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <div className="PopoverInput">
      <div className={classes.search}>
        <div className={rxcs({ [classes.searchIcon]: true, busy })}>
          {busy ? <Sync /> : <MusicNote style={{ color: on }} />}
        </div>
        <InputBase
          placeholder="Find music…"
          disabled={busy}
          onBlur={() => setOn(grey[300])}
          onFocus={() => setOn(grey[600])}
          onKeyUp={handleClick}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      <PopoverWrapper open={open} anchorEl={anchorEl} handleClose={handleClose}>
        <div className={classes.typography}>
          {keys?.map((key) => (
            <PopoverInputSection
              setChosed={setChosed}
              key={key}
              type={key}
              item={data[key]}
              param={paremeter}
              setParams={navigateToObject}
              handleClose={handleClose}
            />
          ))}
        </div>
      </PopoverWrapper>
    </div>
  );
};

export const PopoverIcons = {
  albums: <Album />,
  artists: <People />,
  songs: <MusicNote />,
  genres: <LocalOffer />,
};

const Types = {
  albums: "album",
  artists: "artist",
};

function PopoverInputSection({
  item,
  type,
  setChosed,
  setParams,
  param,
  handleClose,
}) {
  const classes = PopoverStyles();
  const queue = (Key) => {
    const Keys = [Key];
    send("tune", { Keys }).then((res) => {
      const { data } = res;
      queueTrack(false, data[0]);
      handleClose();
    });
  };
  const menu = (Key) => {
    const Keys = [Key];
    send("tune", { Keys }).then((res) => {
      const { data } = res;
      openTrackMenuDrawer.next({ track: data[0] });
      handleClose();
    });
  };
  const launch = (ID) => {
    if (type === "songs") return queue(ID);
    !!Types[type] && setChosed({ dataType: Types[type], ID });
    handleClose();
  };
  return (
    <>
      <List
        classes={{ root: classes.root }}
        dense
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {item.label}
          </ListSubheader>
        }
      >
        {item?.items?.map((k) => (
          <ListItem key={k.Key} onClick={() => launch(k.Key)}>
            <ListItemAvatar>
              <Avatar alt={k.Title} src={k.image}>
                {PopoverIcons[type]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              classes={{ secondary: "secondary", primary: "link" }}
              primary={k.Title}
              secondary={k.Artist || `${k.count} tracks`}
            />
            {type === "songs" && (
              <ListItemSecondaryAction onClick={() => menu(k.Key)}>
                <MoreHoriz />
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}

        {item?.length > 2 && (
          <ListItem onClick={() => setParams({ param, type })}>
            <ListItemText
              classes={{ primary: "link" }}
              primary={` View all ${item?.length} ${type}`}
            ></ListItemText>
            <ListItemSecondaryAction>
              <ChevronRight />
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </>
  );
}

PopoverInput.defaultProps = {};
export default PopoverInput;

export function PopoverWrapper({ open, anchorEl, handleClose, children }) {
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children}
    </Popover>
  );
}
