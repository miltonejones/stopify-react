import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  TextField,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Sync } from "@material-ui/icons";
import React from "react";
import { rxcs } from "../../util/Functions";
import "./PopoverSelect.css";

const PopoverOption = ({ option, onSelect }) => {
  return (
    <>
      <ListItem onClick={() => onSelect && onSelect(option)}>
        {!!option.avatar && (
          <ListItemAvatar>
            <Avatar {...option.avatar}>{option.avatar.icon}</Avatar>
          </ListItemAvatar>
        )}

        <ListItemText primary={option.value} secondary={option.secondary} />
      </ListItem>
    </>
  );
};

const PopoverSelect = ({ title, options, icon, promise, onSelect }) => {
  const [busy, setBusy] = React.useState(false);
  const [on, setOn] = React.useState(grey[300]);
  const [parameter, setParameter] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = (param) =>
    new Promise((c) =>
      c(
        options?.filter(
          (x) => x.value?.toLowerCase().indexOf(param.toLowerCase()) > -1
        )
      )
    );

  const find = (param, anchor) => {
    setBusy(1);
    const locate = promise || Promise.resolve();
    locate().then(() => {
      search(param).then((res) => {
        setBusy(!1);
        setParameter(param);
        setData(res);
        !!res?.length && setAnchorEl(anchor);
      });
    });
  };

  const handleClick = (event) => {
    const { target, currentTarget, keyCode } = event;
    const { value } = target;
    keyCode === 13 && find(value, currentTarget);
    setParameter(value);
  };

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    setParameter(value);
  };

  const select = (o) => {
    setParameter(o.value);
    onSelect && onSelect(o);
    handleClose();
  };

  const open = Boolean(anchorEl);
  return (
    <div className="PopoverSelect">
      <div className="popover-input">
        <div className={rxcs({ busy })}>{busy ? <Sync /> : icon}</div>
        <TextField
          placeholder={title}
          variant="outlined"
          value={parameter}
          onBlur={() => setOn(grey[300])}
          onFocus={() => setOn(grey[600])}
          onKeyUp={handleClick}
          onChange={handleChange}
          classes={{
            root: "inputRoot",
            input: rxcs({ inputInput: 1, on }),
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <PopoverWrapper open={open} anchorEl={anchorEl} handleClose={handleClose}>
        <List dense classes={{ root: "pop-list" }}>
          {data.map((option, i) => (
            <PopoverOption onSelect={select} key={i} option={option} />
          ))}
        </List>
      </PopoverWrapper>
    </div>
  );
};

PopoverSelect.defaultProps = {};

export default PopoverSelect;

function PopoverWrapper({ open, anchorEl, handleClose, children }) {
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {children}
    </Popover>
  );
}
