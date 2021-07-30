import React from "react";
import SearchGrid from "./SearchGrid";

export default {
  title: "SearchGrid",
  component: SearchGrid,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <SearchGrid {...args} />;

export const AlbumView = Template.bind({});
export const SongView = Template.bind({});

AlbumView.args = {
  type: "albums",
  param: "benatar",
};

SongView.args = {
  type: "songs",
  param: "benatar",
};
