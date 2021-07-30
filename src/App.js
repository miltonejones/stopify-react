import "./App.css";

import {
  BrowserRouter as Router,
  Switch as Choice,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";

import AppLayout, {
  AppLayoutContent,
  DownloadMessageDrawer,
} from "./components/Layout/AppLayout/AppLayout";
import AppToolbar from "./components/Layout/AppToolbar/AppToolbar";
import ResponsivePlayerDrawer, {
  drawerOpen,
} from "./components/Audio/ResponsivePlayerDrawer/ResponsivePlayerDrawer";
import AppSidebar from "./components/Layout/AppSidebar/AppSidebar";
import { TrackMenuDrawer } from "./components/Common/Control/TrackMenu/TrackMenu";
import { PlaylistMenuDrawer } from "./components/Common/Control/PlaylistMenu/PlaylistMenu";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { setup } from "./services/Blob";
import { rxcs } from "./util/Functions";
import appRoutes from "./app/Routes";
import { TrackEditorDrawer } from "./components/Common/Form/TrackEditor/TrackEditor";

function App() {
  const [sidebarOpen, setOpen] = useState(true);
  const [playerBodyOpen, setPlayerBodyOpen] = useState(false);
  const theme = useTheme();
  const screenIsBiggerThanSmSize = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    const sub = drawerOpen.subscribe((d) => {
      setPlayerBodyOpen(d.open);
    });
    setup().then((count) => console.log("%s cached files", count));
    return () => sub.unsubscribe();
  }, [playerBodyOpen]);

  const okToShowSidebar = screenIsBiggerThanSmSize
    ? sidebarOpen
    : sidebarOpen && !playerBodyOpen;

  const setParams = (d) => {
    alert("setParams WAS CALLED");
    console.log({ d });
  };

  const sidebarArgs = {
    open: okToShowSidebar,
  };

  const contentArgs = {
    sidebarOpen,
    screenIsBiggerThanSmSize,
    playerBodyOpen,
    okToShowSidebar,
  };
  return (
    <Router>
      <div className="App">
        <>
          <AppToolbar
            clicked={() => setOpen(!sidebarOpen)}
            setParams={setParams}
          />
          <ResponsivePlayerDrawer />
          <div className="AppLayout">
            <AppSidebar {...sidebarArgs} />
            <div className={rxcs({ left: true, open: okToShowSidebar })}>
              <Choice>
                <Route
                  path="/library"
                  children={<DisplayListView library {...contentArgs} />}
                />
                <Route
                  path="/home"
                  children={<DisplayListView {...contentArgs} />}
                />
                <Route
                  path="/browse/:type/:id"
                  children={<DisplayListView {...contentArgs} />}
                />
                <Route
                  path="/search/:type/:param"
                  children={<DisplayListView {...contentArgs} />}
                />
                <Route
                  path="/browse/:type"
                  children={<DisplayListView {...contentArgs} />}
                />
                <Route
                  path="/"
                  children={<DisplayListView home {...contentArgs} />}
                />
              </Choice>
            </div>
          </div>
          <TrackMenuDrawer />
          <PlaylistMenuDrawer />
          <DownloadMessageDrawer />
          <TrackEditorDrawer />
        </>
      </div>
    </Router>
  );
}

function DisplayListView(props) {
  const parameters = useParams();
  const route = appRoutes.filter(
    (f) => !!f.type && f.type === parameters?.type
  )[0];
  const params = parameters?.param ? { ...parameters } : {};
  let selectedObject =
    parameters?.id && !parameters?.param
      ? { dataType: parameters.type, ID: parameters.id }
      : {};

  !!props.library && (selectedObject = { dataType: "tune" });

  const contentArgs = {
    selectedObject,
    route,
    params,
  };

  return (
    <>
      <AppLayoutContent {...contentArgs} {...props} />
    </>
  );
}

export default App;
