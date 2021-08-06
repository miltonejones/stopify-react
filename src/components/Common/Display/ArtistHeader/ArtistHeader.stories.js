import React from "react";
import ArtistHeader from "./ArtistHeader";
import artists from "../../../../stories/assets/stories-artist-list.json";

export default {
  title: "Common/Display/Header/ArtistHeader",
  component: ArtistHeader,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <ArtistHeader {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { artistFk: artists[1].ID };
