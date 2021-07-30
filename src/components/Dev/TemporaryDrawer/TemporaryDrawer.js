import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { Button } from "@material-ui/core";

export default function TemporaryDrawer(props) {
  const { anchor, title } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer}>{title}</Button>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer}>
        {props.children}
      </Drawer>
    </div>
  );
}
