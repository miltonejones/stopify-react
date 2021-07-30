import { Drawer } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import { SquareButton } from "../../../Audio/PlayerButton/PlayerButton";
import PopoverInput from "../PopoverInput/PopoverInput";
import "./PopoverInputDrawer.css";

const PopoverInputDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="PopoverInputDrawer">
      <SquareButton
        flat
        className="white"
        onClick={() => {
          setOpen(!open);
        }}
        size="small"
      >
        <Search />
      </SquareButton>
      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <PopoverInput />
      </Drawer>
    </div>
  );
};

PopoverInputDrawer.defaultProps = {};
export default PopoverInputDrawer;
