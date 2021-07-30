import { Drawer } from "@material-ui/core";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { Edit, Save, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Observer from "../../../../services/Observables";
import { createPlus, iTuneLookup, save } from "../../../../services/RemoteData";
import ObjectReader from "../../../Dev/ObjectReader/ObjectReader";
import PopoverSearch from "../../Control/PopoverSearch/PopoverSearch";
import { dataListChanged } from "../../Display/DataList/DataList";
import Underline from "../../Underline/Underline";
import "./TrackEditor.css";

const event = new Observer("event");
const TrackEditor = ({ track, finish }) => {
  const [editedTrack, setEditedTrack] = useState({ ...track });
  const [appleResults, setAppleResults] = useState(null);
  const updateTrack = (field, index, name, value) => {
    const updatedTrack = Object.assign(editedTrack, {
      [field]: name,
      [index]: value,
    });
    console.log({ updatedTrack, field, index, name, value });
    setEditedTrack({ ...updatedTrack });
  };
  const elements = [
    {
      type: "artists",
      field: "artistName",
      index: "artistFk",
      event,
    },
    {
      type: "albums",
      field: "albumName",
      index: "albumFk",
      event,
    },
    { type: "genres", field: "Genre", index: "genreKey", event },
  ];

  const updateValue = (f, v) => {
    const updatedTrack = Object.assign(editedTrack, {
      [f]: v,
    });
    setEditedTrack({ ...updatedTrack });
  };

  const handleChange = (f) => (event) => {
    updateValue(f, event.target.value);
  };

  const createThen = (type, name, image, index, field) => {
    createPlus(editedTrack, type, name, image, index, field).then((edited) => {
      setEditedTrack(edited);
      event.next({ edited, field });
    });
  };

  const locate = () => {
    iTuneLookup(editedTrack).then(setAppleResults);
  };

  const erase = () => {
    setAppleResults(null);
  };

  const assign = (t, f) => {
    const updatedTrack = Object.assign(editedTrack, t);
    console.log({ updatedTrack, t });
    setEditedTrack({ ...updatedTrack });
    setAppleResults(null);
    event.next({ edited: updatedTrack });
  };

  const saveTrack = () => {
    save(editedTrack).then(() => {
      dataListChanged.next();
      finish && finish();
    });
  };
  //createPlus = (track, type, Name, image, id, name)

  const scalarFields = [
    { label: "Title", xs: 10 },
    { trackNumber: "Title", xs: 6 },
    { label: "discNumber", xs: 6 },
  ];
  return (
    <div className="wrapper">
      <div className="TrackEditor flex">
        <div className="menu">
          <IconButton
            onClick={erase}
            color={!appleResults?.length ? "secondary" : "primary"}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={locate}
            color={!!appleResults?.length ? "secondary" : "primary"}
          >
            <Search />
          </IconButton>
        </div>

        <Collapse in={!!appleResults?.length}>
          <div className="collapser">
            <List dense>
              {appleResults?.map((tune, i) => (
                <ListItem style={{ width: "100%" }} key={i}>
                  <ListItemAvatar>
                    <Avatar src={tune.albumImage} alt={tune.Title} />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{
                      primary: "no-wrap max-200",
                      secondary: "no-wrap max-200",
                    }}
                    primary={tune.Title}
                    secondary={tune.albumName}
                  ></ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => assign(tune)}>
                      <Save />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Collapse>

        <Collapse in={!appleResults?.length}>
          <div className="title-bar">
            Edit <Underline dark>{editedTrack.Title}</Underline>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={2} classes={{ root: "flex middle" }}>
              <Avatar
                style={{ width: 48, height: 48 }}
                src={editedTrack.albumImage}
                alt={editedTrack.Title}
              />
            </Grid>
            {scalarFields.map((field, i) => (
              <Grid key={i} item xs={field.xs}>
                <TextField
                  fullWidth
                  label={field.label}
                  onChange={handleChange(field.label)}
                  value={editedTrack[field.label]}
                  variant="outlined"
                />
              </Grid>
            ))}

            {elements.map((element, i) => (
              <Grid key={i} item xs={12}>
                <PopoverSearch
                  track={editedTrack}
                  updateTrack={updateTrack}
                  create={createThen}
                  {...element}
                />
              </Grid>
            ))}
            <Grid item xs={6}>
              <Button
                color="secondary"
                style={{ width: "100%" }}
                variant="outlined"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="primary"
                style={{ width: "100%" }}
                variant="contained"
                onClick={saveTrack}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </div>
      {/* <ObjectReader captionText="edited track" {...editedTrack} />
      {editedTrack.FileKey} */}
    </div>
  );
};

TrackEditor.defaultProps = {};
export default TrackEditor;

export const openTrackEditorDrawer = new Observer("openTrackEditorDrawer");

export const TrackEditorDrawer = (props) => {
  const [args, setArgs] = useState({ open: false });

  const toggleDrawer = () => {
    setArgs({ open: false });
  };

  useEffect(() => {
    openTrackEditorDrawer.subscribe((track) => {
      setArgs({ track, open: true });
    });
  });

  const finish = () => {
    toggleDrawer();
    props.finish && props.finish();
  };

  return (
    <div>
      <Drawer
        classes={{ paper: "flex center debug" }}
        anchor="bottom"
        open={args.open}
        onClose={toggleDrawer}
      >
        <TrackEditor finish={finish} {...args} {...props} />
      </Drawer>
    </div>
  );
};