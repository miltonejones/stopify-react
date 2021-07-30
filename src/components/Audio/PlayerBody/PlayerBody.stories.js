import React from "react";
import PlayerBody from "./PlayerBody";
import tracks from "../../../stories/assets/stories-play-list.json";
const parameters = { layout: "fullscreen" };
export default {
  title: "Audio/PlayerBody",
  component: PlayerBody,
};

const Template = (args) => <PlayerBody {...args} />;

export const DefaultView = Template.bind({});
export const FlatView = Template.bind({});

DefaultView.args = {
  start: 19,
  tracks,
  caption: "Playing from Playlists",
  subheader: "Drill/Grind",
  width: 375,
};
FlatView.args = {
  ...DefaultView.args,
  flat: !0,
};
FlatView.parameters = parameters;
DefaultView.parameters = parameters;
