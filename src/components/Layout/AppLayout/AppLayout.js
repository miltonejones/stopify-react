import { Drawer, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  blobDownloadComplete,
  blobDownloadProgress,
  setup,
} from "../../../services/Blob";
import { rxcs } from "../../../util/Functions";
import ResponsivePlayerDrawer, {
  drawerOpen,
} from "../../Audio/ResponsivePlayerDrawer/ResponsivePlayerDrawer";
import { PlaylistMenuDrawer } from "../../Common/Control/PlaylistMenu/PlaylistMenu";
import { TrackMenuDrawer } from "../../Common/Control/TrackMenu/TrackMenu";
import DataGrid from "../../Common/Display/DataGrid/DataGrid";
import DataList from "../../Common/Display/DataList/DataList";
import SearchGrid from "../../Common/Display/SearchGrid/SearchGrid";
import AppSidebar from "../AppSidebar/AppSidebar";
import AppToolbar from "../AppToolbar/AppToolbar";
import DashShell from "../DashShell/DashShell";
import "./AppLayout.css";

const AppLayout = () => {
  const [route, setRoute] = useState({});
  const [selectedObject, setSelectedObject] = useState({});
  const [params, setParams] = useState({});
  const [playerBodyOpen, setPlayerBodyOpen] = useState(false);
  const [sidebarOpen, setOpen] = useState(true);

  const theme = useTheme();
  const screenIsBiggerThanSmSize = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    const sub = drawerOpen.subscribe((d) => {
      setPlayerBodyOpen(d.open);
    });
    setup().then((count) => console.log("%s cached files", count));
    return () => sub.unsubscribe();
  }, [playerBodyOpen]);

  const ok = screenIsBiggerThanSmSize
    ? sidebarOpen
    : sidebarOpen && !playerBodyOpen;

  const chooseObject = (d) => {
    setParams({});
    setSelectedObject(d);
  };
  const direct = (d) => {
    setParams({});
    setSelectedObject(d.full ? { dataType: "tune" } : {});
    setRoute(d);
  };

  const sidebarArgs = {
    type: route?.path,
    direct,
    open: ok,
  };

  const contentArgs = {
    params,
    selectedObject,
    route,
    setRoute,
    chooseObject,
    direct,
    sidebarOpen,
    screenIsBiggerThanSmSize,
    playerBodyOpen,
  };
  return (
    <>
      <AppToolbar
        clicked={() => setOpen(!sidebarOpen)}
        setSelectedObject={chooseObject}
        setParams={setParams}
      />
      <ResponsivePlayerDrawer />
      <div className="AppLayout">
        <AppSidebar {...sidebarArgs} />
        <div className={rxcs({ left: true, open: ok })}>
          <AppLayoutContent {...contentArgs} />
        </div>
      </div>
      <TrackMenuDrawer direct={chooseObject} />
      <PlaylistMenuDrawer />
      <DownloadMessageDrawer />
    </>
  );
};

AppLayout.defaultProps = {};
export default AppLayout;

export const DownloadMessageDrawer = () => {
  const [args, setArgs] = useState({ open: false });

  const toggleDrawer = () => {
    setArgs({ open: false });
  };

  useEffect(() => {
    const sub = [
      blobDownloadProgress.subscribe((message) =>
        setArgs({ message, open: true })
      ),
      blobDownloadComplete.subscribe((message) => setArgs({ open: false })),
    ];
    return () => sub.map((s) => s.unsubscribe());
  });

  return (
    <div>
      <Drawer anchor="top" open={args.open} onClose={toggleDrawer}>
        <Typography>{args.message}</Typography>
      </Drawer>
    </div>
  );
};

export const AppLayoutContent = ({
  params,
  selectedObject, //
  route, //
  sidebarOpen, //
  screenIsBiggerThanSmSize, //
  playerBodyOpen, //
  okToShowSidebar,
  // deprecated with route
  setRoute,
  chooseObject,
  direct,
}) => {
  const locale = useHistory();
  const navigateToObject = (d) => {
    const address = `/browse/${d.type}/${d.ID}`;
    locale.push(address);
  };

  const dataGridArgs = {
    dataType: route?.type,
    direct: chooseObject || navigateToObject,
    open: sidebarOpen,
    route,
  };

  const okToShowDashShell = screenIsBiggerThanSmSize ? !0 : !playerBodyOpen;
  const home = !selectedObject?.dataType && !route?.type;

  if (!okToShowDashShell) {
    return <i/>;
  }
  return (
    <>
      {!!params?.type && (
        <SearchGrid
          direct={chooseObject}
          route={route}
          small={!screenIsBiggerThanSmSize}
          {...params}
        />
      )}
      {!!home && !route?.type && !params?.type && !selectedObject?.dataType && (
        <DashShell
          setSelectedObject={chooseObject}
          direct={setRoute}
          hidden={!okToShowDashShell}
          small={!screenIsBiggerThanSmSize}
        />
      )}
      {!!selectedObject?.dataType && !params?.type && (
        <DataList
          small={!screenIsBiggerThanSmSize}
          flat
          direct={direct}
          route={route}
          {...selectedObject}
        />
      )}
      {!!route?.type && !params?.type && !selectedObject?.dataType && (
        <DataGrid {...dataGridArgs} />
      )}
    </>
  );
};
