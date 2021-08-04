import "./App.css";

import {
  BrowserRouter as Router,
  Switch as Choice,
  Route,
  useParams,
} from "react-router-dom";

import {
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
import { ImporterDrawer } from "./components/Common/Form/Importer/Importer";
import EventSnackBar from "./components/Common/EventSnackBar/EventSnackBar";
import { updatePlaylistCollection } from "./services/RemoteData";
import { SCREEN_STATE } from "./app/Constants";

function App() {
  const [sidebarOpen, setOpen] = useState(true);
  const [playerBodyOpen, setPlayerBodyOpen] = useState(false);
  const theme = useTheme();
  const screenIsBiggerThanSmSize = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsBiggerThanLgSize = useMediaQuery(theme.breakpoints.up("md"));
  const orientationLandscape = useMediaQuery("(orientation: landscape)");
  const shortenedDisplay = useMediaQuery("screen and (max-height: 600px)");
  useEffect(() => {
    const sub = drawerOpen.subscribe((d) => {
      setPlayerBodyOpen(d.open);
    });
    updatePlaylistCollection();
    setup().then((count) => console.log("%s cached files", count));
    return () => sub.unsubscribe();
  }, [playerBodyOpen]);

  const windowStates = {
    [SCREEN_STATE.SCREEN]: screenIsBiggerThanSmSize && !shortenedDisplay,
    [SCREEN_STATE.MOBILE]: !screenIsBiggerThanSmSize && !orientationLandscape,
    [SCREEN_STATE.TABLET]: orientationLandscape && shortenedDisplay,
  };
  const screenState = Object.keys(windowStates).filter(
    (s) => windowStates[s]
  )[0];

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
    screenState,
  };
  return (
    <Router>
      <div className="App">
        <>
          <AppToolbar
            stats={{
              screenIsBiggerThanLgSize,
              orientationLandscape,
              shortenedDisplay,
              ...contentArgs,
              ...windowStates,
            }}
            clicked={() => setOpen(!sidebarOpen)}
            setParams={setParams}
          />
          <ResponsivePlayerDrawer screenState={screenState} />
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
          <ImporterDrawer />
          <EventSnackBar />
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
