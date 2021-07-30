import React from "react";
import DataGrid from "./DataGrid";

export default {
  title: "Common/Display/DataGrid",
  component: DataGrid,
};

const Template = (args) => <DataGrid {...args} />;

export const AlbumView = Template.bind({});
export const ArtistView = Template.bind({});
export const GenreView = Template.bind({});
export const PlaylistView = Template.bind({});

AlbumView.args = {
  dataType: "album",
};

ArtistView.args = {
  dataType: "artist",
};

GenreView.args = {
  dataType: "genre",
};

PlaylistView.args = {
  dataType: "playlist",
};
