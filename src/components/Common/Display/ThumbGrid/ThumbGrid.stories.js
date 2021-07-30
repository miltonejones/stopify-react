import React from "react";
import albums from "../../../../stories/assets/stories-album-list.json";
import artists from "../../../../stories/assets/stories-artist-list.json";
import genres from "../../../../stories/assets/stories-genres-list.json";
import playlists from "../../../../stories/assets/data.json";
import ThumbGrid from "./ThumbGrid";
import { generateKey } from "../../../../util/Functions";

export default {
  title: "Common/Display/ThumbGrid",
  component: ThumbGrid,
};

const Template = (args) => <ThumbGrid {...args} />;

export const AlbumView = Template.bind({});
export const ArtistView = Template.bind({});
export const GenreView = Template.bind({});
export const PlaylistView = Template.bind({});

playlists.map((p) => (p.listKey = p.listKey || generateKey(p.Title)));
AlbumView.args = { items: albums };
ArtistView.args = { items: artists };
GenreView.args = { items: genres };
PlaylistView.args = { items: playlists };
