import React from "react";
import Playhead from "./Playhead";
import tracks from "../../../stories/assets/stories-play-list.json";

export default {
  title: "Audio/Player/Playhead",
  component: Playhead,
};

const Template = (args) => <Playhead {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  flat: false,
  tracks,
  index: 2,
  advance: console.log,
  mode: { repeat: 1, shuffle: 1 },
};
