import React, { useEffect, useState } from "react";
import { query } from "../../../../services/RemoteData";
import "./ArtistHeader.css";
import ListHeader from "../ListHeader/ListHeader";
import { navigationComplete } from "../../../../app/State";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

const ArtistHeader = ({ artistFk, title, caption, disabled, direct }) => {
  const [artist, setArtist] = useState(null);
  const [nav, setNav] = useState({});
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const begin = () => {
      console.log('getting artist "%s"', artistFk);
      setLoading(true);
      query("artist", artistFk).then((d) => {
        setArtist(d.data);
        setLoading(false);
        console.log(d);
      });
    };

    !!artistFk &&
      (!artist?.ID || artistFk !== artist.ID) &&
      !loading &&
      !disabled &&
      begin();
    console.log(artistFk, artist?.ID);
    const sub = navigationComplete.subscribe(setNav);
    return () => sub.unsubscribe();
  }, [artistFk, artist, nav, loading, disabled]);
  if (!artist && !disabled)
    return (
      <>
        {" "}
        <LoadingAnimation />
      </>
    );
  const args = {
    ...artist,
    loading,
    caption: caption || `${artist.related?.length} tracks in your library`,
    title: title || artist.Name,
  };
  return (
    <>
      <ListHeader direct={direct} {...nav} {...args} />
    </>
  );
};

ArtistHeader.defaultProps = {};
export default ArtistHeader;
