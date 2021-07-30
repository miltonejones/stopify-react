import React from "react";
import TrackGrid from "./TrackGrid";
import rows from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "Common/Display/TrackGrid",
  component: TrackGrid,
};

const Template = (args) => <TrackGrid {...args} />;

export const AlbumView = Template.bind({});
export const GenreView = Template.bind({});
export const ArtistView = Template.bind({});
rows.map((row) => (row.id = row.ID));

ArtistView.args = {
  rows,
  fields: ["Title", "albumName", "Genre", "trackTime"],
};
GenreView.args = {
  rows,
  fields: ["Title", "albumName", "artistName", "trackTime"],
};
AlbumView.args = {
  rows,
  fields: ["Title", "artistName", "Genre", "trackTime"],
};
ArtistView.parameters = {
  viewport: {
    defaultViewport: "ipad12p",
  },
};

GenreView.parameters = {
  ...ArtistView.parameters,
};

AlbumView.parameters = {
  ...ArtistView.parameters,
};
