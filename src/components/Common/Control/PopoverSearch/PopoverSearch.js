import {
  Avatar,
  Collapse,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
} from "@material-ui/core";
import { Add, Save, Sync } from "@material-ui/icons";
import React, { useEffect } from "react";
import { query, search } from "../../../../services/RemoteData";
import { PopoverIcons, PopoverWrapper } from "../PopoverInput/PopoverInput";
import PopoverStyles from "../PopoverInput/PopoverStyles";
import "./PopoverSearch.css";

const PopoverSearch = ({
  type,
  field,
  index,
  track,
  updateTrack,
  create,
  event,
}) => {
  const [parameter, setParameter] = React.useState(null);
  const [newObjectPhoto, setNewObjectPhoto] = React.useState("");
  const [inputValue, setInputValue] = React.useState(track?.[field]);
  const [data, setData] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = PopoverStyles();
  const { items } = data;
  const typeName = type.substr(0, type.length - 1);
  useEffect(() => {
    const sub =
      event &&
      event.subscribe((b) => {
        !!b?.edited && setInputValue(b.edited[field]);
      });
    return () => sub.unsubscribe();
  }, [event, field]);
  const handleClick = (event) => {
    event.keyCode === 13 && find(event.target.value, event.currentTarget);
  };
  const createNew = () => {
    create(typeName, parameter, newObjectPhoto, index, field);
    setEdit(false);
  };
  const handleEdit = (event) => {
    setNewObjectPhoto(event.target.value);
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const launch = (i) => {
    setInputValue(i.Title);
    updateTrack && updateTrack(field, index, i.Title, i.Key);
    handleClose();
  };
  const find = (param, anchor) => {
    setBusy(true);
    const promise = type === "genres" ? getGenres(param) : search(param, type);
    promise.then((res) => {
      setParameter(param);
      setBusy(false);
      setData({ ...res.data });
      setAnchorEl(anchor);
      console.log({ res });
    });
  };
  const getGenres = (param) => {
    return new Promise((callback) => {
      query("genre").then((res) => {
        const items = res.data
          .filter((g) => g.Name.toLowerCase().indexOf(param.toLowerCase()) > -1)
          .map((g) => {
            return {
              Key: g.genreKey,
              Title: g.Name,
              count: g.Count,
              image: g.genreImage,
            };
          });
        callback({ data: { items } });
      });
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className="PopoverSearch">
      <div className={classes.search}>
        <TextField
          fullWidth
          value={inputValue}
          placeholder={`Find ${type}…`}
          label={type}
          disabled={busy}
          onKeyUp={handleClick}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {busy ? <Sync /> : PopoverIcons[type]}
              </InputAdornment>
            ),
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <PopoverWrapper open={open} anchorEl={anchorEl} handleClose={handleClose}>
        <List
          classes={{ root: classes.root }}
          dense
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {type} like "{parameter}"
            </ListSubheader>
          }
        >
          {items?.map((k) => (
            <ListItem key={k.Key} onClick={() => launch(k)}>
              <ListItemAvatar>
                <Avatar alt={k.Title} src={k.image}>
                  {k.Title}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                classes={{ secondary: "secondary", primary: "link" }}
                primary={k.Title}
                secondary={k.Artist || `${k.count} tracks`}
              />
            </ListItem>
          ))}

          {!items?.length && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Add />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                onClick={() => setEdit(!edit)}
                classes={{ secondary: "secondary", primary: "link" }}
                primary={`add ${parameter} as new ${typeName}`}
              />
            </ListItem>
          )}
          <Collapse in={edit}>
            <ListItem>
              <TextField
                value={newObjectPhoto}
                onChange={handleEdit}
                label={`image for "${parameter}"`}
                variant="outlined"
              />
              <ListItemSecondaryAction>
                <IconButton onClick={createNew}>
                  <Save />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Collapse>
        </List>
      </PopoverWrapper>
    </div>
  );
};

PopoverSearch.defaultProps = {};
export default PopoverSearch;
