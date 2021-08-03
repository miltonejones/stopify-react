import React from "react";
import Thumbnail from "./Thumbnail";
import tracks from "../../../../stories/assets/stories-track-list.json";
import albums from "../../../../stories/assets/stories-album-list.json";
import artists from "../../../../stories/assets/stories-artist-list.json";
import genres from "../../../../stories/assets/stories-genres-list.json";
import playlists from "../../../../stories/assets/data.json";
import ObjectReader from "../../../Dev/ObjectReader/ObjectReader";
import { ThumbnailTypes } from "./ThumbnailTypes";

export default {
  title: "Common/Display/Thumbnail",
  component: Thumbnail,
};

const Template = (args) => {
  const what = ThumbnailTypes.filter((t) => t.when(args.track))[0];
  const parsed = what.is(args.track);
  return (
    <>
      <div style={{ margin: 0 }}>
        <Thumbnail {...args} />
      </div>

      <fieldset style={{ margin: "24px 0" }}>
        <legend>Debug Data</legend>
        <ObjectReader captionText={parsed.type + " Object"} {...args.track} />
        <ObjectReader captionText={"Parsed " + parsed.type} {...parsed} />
      </fieldset>
    </>
  );
};

export const TrackView = Template.bind({});
export const AlbumView = Template.bind({});
export const ArtistView = Template.bind({});
export const PlaylistView = Template.bind({});
export const GenreView = Template.bind({});

const index = 9;

const track = tracks[index];
const album = albums[index];
const artist = artists[index];
const playlist = playlists[index];
const genre = genres[index];

TrackView.args = {
  x: 200,
  y: 0,
  z: 0,
  track,
  turned: false,
  rect: false,
  cubed: false,
};
AlbumView.args = { ...TrackView.args, track: album };
ArtistView.args = { ...TrackView.args, track: artist };
PlaylistView.args = { ...TrackView.args, track: playlist };
GenreView.args = { ...TrackView.args, track: genre };
