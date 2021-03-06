import { Button, Menu, MenuItem } from "@material-ui/core";
import { LocalOffer } from "@material-ui/icons";
import React, { useState } from "react";
import { MenuLink } from "../LinkList/LinkList";
import "./GenreMenu.css";

const GenreMenu = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="GenreMenu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LocalOffer /> Browse Music by Genre...
      </Button>
      <Menu
        id="simple-menu"
        open={!!anchorEl}
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem key={item.Name} onClick={handleClose}>
            <MenuLink dest={`/browse/genre/${item.genreKey}`}>
              {item.Name} ({item.Count}
            </MenuLink>
            )
          </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>
          <MenuLink dest={"/browse/genre"}>View all genres...</MenuLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

GenreMenu.defaultProps = {};
export default GenreMenu;
