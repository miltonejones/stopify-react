import React from "react";
import ResponsivePlayerDrawer from "../../../Audio/ResponsivePlayerDrawer/ResponsivePlayerDrawer";
import DataList from "./DataList";

export default {
  title: "Common/Display/DataList",
  component: DataList,
};

const Template = (args) => (
  <>
    <ResponsivePlayerDrawer />
    <DataList {...args} />
  </>
);

export const ArtistView = Template.bind({});
export const AlbumView = Template.bind({});
export const GenreView = Template.bind({});
export const PlaylistView = Template.bind({});

ArtistView.args = {
  flat: true,
  dataType: "artist",
  ID: 614,
};

AlbumView.args = {
  flat: true,
  dataType: "album",
  ID: 12,
};
PlaylistView.args = {
  flat: true,
  dataType: "playlist",
  ID: "krab",
};
GenreView.args = {
  flat: true,
  dataType: "genre",
  ID: "alternative",
};
ArtistView.parameters = {
  layout: "fullscreen",
  viewport: {
    defaultViewport: "ipad12p",
  },
};

PlaylistView.parameters = {
  ...ArtistView.parameters,
};

GenreView.parameters = {
  ...ArtistView.parameters,
};

AlbumView.parameters = {
  ...ArtistView.parameters,
};
