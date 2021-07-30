import { Collapse } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Observer from "../../../services/Observables";
import { rxcs } from "../../../util/Functions";
import PlayerBody from "../PlayerBody/PlayerBody";
import "./ResponsivePlayerDrawer.css";

export const drawerOpen = new Observer("drawerOpen");

const ResponsivePlayerDrawer = () => {
  const [args, setArgs] = useState({});
  const { open = false, cancel, flat, items, start } = args;
  useEffect(() => {
    const sub = drawerOpen.subscribe((d) => {
      const nu = { ...args, ...d };
      setArgs(nu);
    });
    return () => sub.unsubscribe();
  }, [args, items]);
  if (!items?.length) return <i />;
  return (
    <div className={rxcs({ ResponsivePlayerDrawer: true, open })}>
      <CollapsingDrawer open={open}>
        <PlayerBody
          collapsed={!open}
          cancel={cancel}
          flat={flat}
          tracks={items}
          start={start}
        />
      </CollapsingDrawer>
    </div>
  );
};

ResponsivePlayerDrawer.defaultProps = {};
export default ResponsivePlayerDrawer;

function CollapsingDrawer(props) {
  const { open } = props;

  return (
    <Collapse
      classes={{ root: "ResponsivePlayerDrawer", hidden: "hidden" }}
      in={open}
    >
      {props.children}
    </Collapse>
  );
}
