import React from "react";
import CoverFlowTilt from "./CoverFlowTilt";
import tracks from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "CoverFlowTilt",
  component: CoverFlowTilt,
};

const Template = (args) => <CoverFlowTilt {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  slides: tracks.map((t) => ({
    title: t.Title,
    subtitle: t.albumName,
    description: t.artistName,
    image: t.albumImage,
  })),
};
