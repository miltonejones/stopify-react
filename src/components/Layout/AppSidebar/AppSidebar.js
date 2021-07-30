import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import appRoutes from "../../../app/Routes";
import { navigationComplete } from "../../../app/State";
import { rxcs } from "../../../util/Functions";
import "./AppSidebar.css";

const AppSidebar = ({ wide, direct, type, open }) => {
  const [nav, setNav] = useState({});
  const routes = appRoutes.filter((r) => !!r.data?.icon);
  const className = rxcs({
    AppSidebar: true,
    wide,
    open,
  });

  useEffect(() => {
    const sub = navigationComplete.subscribe(setNav);
    return () => sub.unsubscribe();
  }, []);
  const locale = useHistory();
  const navigateToObject = (d) => {
    const address =
      d.data?.address || (!!d.type ? `/browse/${d.type}` : "/home");
    locale.push(address);
    console.log({ d, address });
  };
  const goto = (r) => {
    if (direct) return direct(r);
    navigateToObject(r);
  };
  return (
    <div className={className}>
      {routes.map((r, i) => (
        <div
          key={i}
          className={rxcs({
            "sidebar-link": !0,
            active: r.path === type || nav?.route?.path === r.path,
          })}
          onClick={() => goto(r)}
        >
          <IconButton
            color={
              r.path === type || nav?.route?.path === r.path
                ? "secondary"
                : "primary"
            }
          >
            {r.data.icon}
          </IconButton>
          <div className="sidebar-label">{r.data.label}</div>
        </div>
      ))}
    </div>
  );
};

AppSidebar.defaultProps = {};
export default AppSidebar;
