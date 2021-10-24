import {
  Avatar,
  // Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./TrackList.css";
import PaginationBar from "../../Control/PaginationBar/PaginationBar";
import { MoreVertRounded } from "@material-ui/icons";
import { openTrackMenuDrawer } from "../../Control/TrackMenu/TrackMenu";
import DecoratedTrackTitle from "../../Control/DecoratedTrackTitle/DecoratedTrackTitle";

const styles = {
  root: {
    // outline: "dotted 1px #37a",
    borderBottom: "solid 1px #e0e0e0",
    backgroundColor: "#ebebeb",
    margin: 0,
    padding: "0 12px",
  },
  disabled: {
    backgroundColor: "#ebebff",
  },
};

// const drawer = {
//   root: {
//     outline: "dotted 4px #ff0",
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//   },
//   paper: {
//     maxWidth: 350,
//     margin: "0 24px",
//   },
// };

export const QueueItem = withStyles(styles)(ListItem);
// export const QueueDrawer = withStyles(drawer)(Drawer);

const InnerContent = ({ args, first, selection, choose }) => {
  return (
    <>
      <div className="TrackList">
        <PaginationBar {...args} />
        <List style={{ minWidth: 300 }} dense>
          {first?.map((track) => (
            <QueueItem
              key={track.ID}
              disabled={selection?.indexOf(track.ID) > -1}
              onClick={() => choose && choose(track)}
            >
              <ListItemAvatar>
                <Avatar alt={track.Title} src={track.albumImage} />
              </ListItemAvatar>
              <TrackItemText track={track} />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  onClick={() => {
                    openTrackMenuDrawer.next({ track });
                  }}
                >
                  <MoreVertRounded />
                </IconButton>
              </ListItemSecondaryAction>
            </QueueItem>
          ))}
        </List>
      </div>
    </>
  );
};

const Popper = ({ anchorEl, children, open, handleClose }) => {
  const id = open ? "track-list-popover" : undefined;
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
};

const TrackList = ({
  tracks,
  open,
  anchor = "top",
  close,
  choose,
  selection = [],
  pageSize = 5,
  popper,
}) => {
  const [page, setPage] = useState(0);
  const firstPage = page * pageSize;
  const group = tracks.slice(firstPage, firstPage + pageSize);
  const first = !group.length ? tracks.slice(0, pageSize) : group;
  const args = {
    startPage: firstPage,
    pageSize,
    collection: tracks,
    selection,
    click: (d) => setPage((x) => x + d),
  };
  const pops = { anchorEl: popper, open, handleClose: () => close && close() };
  const content = { args, first, selection, choose };

  if (!!popper) {
    return (
      <Popper {...pops}>
        <InnerContent {...content} />
      </Popper>
    );
  }
  if (open) {
    return (
      <>
        <InnerContent {...content} />
      </>
    );
  }
  return <i />;
};

function TrackItemText({ track }) {
  return (
    <ListItemText
      primary={<DecoratedTrackTitle track={track} />}
      secondary={<TrackItemInfo track={track} />}
      classes={{ primary: "no-wrap max-300" }}
    ></ListItemText>
  );
}

export function TrackItemInfo({ track }) {
  return (
    <>
      {!!track.albumName && (
        <div className="track-album no-wrap max-200">{track.albumName}</div>
      )}
      {!!track.artistName && (
        <div className="track-artist no-wrap max-200">{track.artistName}</div>
      )}
    </>
  );
}

TrackList.defaultProps = {};
export default TrackList;
