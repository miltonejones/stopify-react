import { Collapse } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import Observer from "../../../services/Observables";
import { rxcs } from "../../../util/Functions";
import PlayerBody from "../PlayerBody/PlayerBody";
import "./ResponsivePlayerDrawer.css";

export const drawerOpen = new Observer("drawerOpen");
export const playerQueueInsert = new Observer();

const ResponsivePlayerDrawer = ({ screenState }) => {
  const [args, setArgs] = useState({});
  const { open = false, cancel, flat, items, start } = args;
  const [index, reportIndex] = useState(start);

  const splice = useCallback(
    (e) => {
      const updated = args.items?.slice(0);
      updated.splice(index + 1, 0, Object.assign(e, { queued: true }));
      setArgs({ ...args, items: updated });
    },
    [args, index]
  );

  useEffect(() => {
    const sub = [
      drawerOpen.subscribe((d) => {
        const nu = { ...args, ...d };
        setArgs(nu);
      }),
      playerQueueInsert.subscribe(splice),
    ];
    return () => sub.map((s) => s.unsubscribe());
  }, [args, items, splice]);

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
          report={reportIndex}
          screenState={screenState}
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
      classes={{ root: "ResponsivePlayerDrawer", hidden: "shortened" }}
      in={open}
    >
      {props.children}
    </Collapse>
  );
}
