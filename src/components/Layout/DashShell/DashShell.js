import { Grid, Paper } from "@material-ui/core";
import {
  Album,
  ChevronRight,
  Home,
  Link,
  LocalOffer,
  MusicNote,
  People,
  PlaylistPlay,
  Schedule,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getGenreData, query } from "../../../services/RemoteData";
import "./owl.css";
import "./genre.css";
import "./banner.css";
import "./DashShell.css";
import DesktopOnly from "./DesktopOnly/DesktopOnly";
import DynamicGrid from "./DynamicGrid/DynamicGrid";
import VerticalList from "./VerticalList/VerticalList";
import SongList from "./SongList/SongList";
import PlaylistBanners from "./PlaylistBanners/PlaylistBanners";
import { SongPersistService } from "../../../services/Persist";
import GenreMenu from "./GenreMenu/GenreMenu";
import LinkList from "./LinkList/LinkList";
import appRoutes from "../../../app/Routes";
import { queueTrack } from "../../../util/PlayerConnect";
import Underline from "../../Common/Underline/Underline";
import { navigationComplete } from "../../../app/State";
import { useHistory } from "react-router-dom";
import LoadingAnimation from "../../Common/LoadingAnimation/LoadingAnimation";
// getGenreData

const addressOf = (d) => d?.data?.address || `/browse/${d?.type}`;
const routeOf = (type) => appRoutes.filter((r) => r.type === type)[0];

const DashShell = ({ small, direct, setChosed, hidden }) => {
  const [dashData, setDashData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [genreItems, setGenreItems] = useState(null);
  const memory = SongPersistService.get();
  useEffect(() => {
    const route = { path: "Home.html" };
    !dashData &&
      query("search/dashSearch").then((datum) => {
        console.log({ datum });
        setDashData(datum.data);
        navigationComplete.next({ route });
      });
    !genreData &&
      getGenreData().then((datum) => {
        const genres = datum?.genres?.map((g, i) => ({
          genre: g,
          songs: datum.data[i].data,
        }));
        const items = datum?.items?.filter((item) => item.Count > 400);
        setGenreItems(items);
        setGenreData(genres);
      });
  }, [dashData, genreData]);

  const locale = useHistory();
  const setObject = (o) => {
    const path = [o.dataType === "tune" ? "/library" : `/browse/${o.dataType}`];
    !!o.ID && path.push(o.ID);
    const address = path.join("/");
    locale.push(address);
    console.log({ address });
  };
  const navigateToObject = (d) => {
    const address = addressOf(d);
    locale.push(address);
    console.log({ d, address });
  };
  const ft_artist = (a) => `${a.trackCount} tracks`;
  const ft_album = (a) => `${a.artistName}, ${a.trackCount} tracks`;
  const playTrack = (i) => queueTrack(small, i);
  if (hidden) return <i />;
  if (!dashData) {
    return <LoadingAnimation />;
  }
  return (
    <div className="DashShell">
      <Grid container spacing={1}>
        {/* <Grid item xs={12} sm={12}>
          <DashPod>artist carousel</DashPod>
        </Grid> */}
        <DesktopOnly>
          <DynamicGrid size={8}>
            {" "}
            <DashPod
              icon={<Schedule />}
              title="Recently Added"
              see={() => setObject({ dataType: "tune" })}
            >
              <SongList play={playTrack} data={dashData[2].result} />
            </DashPod>
          </DynamicGrid>
        </DesktopOnly>
        <DynamicGrid size={4}>
          {" "}
          {!!genreItems && (
            <DashPod icon={<Home />} title="Stopify" underline>
              <GenreMenu items={genreItems} />
            </DashPod>
          )}
          <DashPod icon={<Link />} title="Quick Links">
            <LinkList direct={direct} />
          </DashPod>
        </DynamicGrid>

        <DynamicGrid size={8}>
          <>
            {" "}
            <DashPod
              icon={<PlaylistPlay />}
              title="Playlists"
              see={() => navigateToObject(routeOf("playlist"))}
            >
              <PlaylistBanners small={small} />
            </DashPod>
            {!!memory?.length && (
              <DashPod icon={<MusicNote />} title="Recently Played">
                <SongList play={playTrack} data={memory} />
              </DashPod>
            )}
          </>
        </DynamicGrid>

        <DynamicGrid size={4}>
          <DashPod
            title="Top Artists"
            icon={<People />}
            see={() => navigateToObject(routeOf("artist"))}
          >
            <VerticalList
              field="artistImage"
              type="artist"
              small={small}
              footer={ft_artist}
              objects={dashData[0]}
            />
          </DashPod>
        </DynamicGrid>

        <DynamicGrid size={8}>
          {" "}
          {genreData?.map((k) => (
            <DashPod
              key={k.genre}
              icon={<LocalOffer />}
              title={`Genre: ${k.genre}`}
              see={() => setObject({ dataType: "genre", ID: k.genre })}
            >
              <SongList play={playTrack} data={k.songs} />
            </DashPod>
          ))}
        </DynamicGrid>

        <DynamicGrid size={4}>
          <DashPod
            title="Top Albums"
            icon={<Album />}
            see={() => navigateToObject(routeOf("album"))}
          >
            <VerticalList
              field="albumImage"
              type="album"
              small={small}
              footer={ft_album}
              objects={dashData[1]}
            />
          </DashPod>
        </DynamicGrid>
      </Grid>
    </div>
  );
};

DashShell.defaultProps = {};
export default DashShell;

function DashPod({ icon, title, children, see, underline }) {
  const label = underline ? (
    <Underline dark>{title}</Underline>
  ) : (
    <label>{title}</label>
  );
  return (
    <>
      <Paper
        variant="outlined"
        classes={{ root: "dash-page-paper" }}
        className="dash-page-paper recent-carousel-body"
      >
        {!!icon && (
          <div className="amplify-card-header">
            {icon} {label}
            {!!see && (
              <div onClick={() => see && see()} className="see-all">
                See all <ChevronRight />
              </div>
            )}
          </div>
        )}
        {children}
      </Paper>
    </>
  );
}
