import React from "react";
import PlaylistMenu from "./PlaylistMenu";
import tracks from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "Common/Control/PlaylistMenu",
  component: PlaylistMenu,
};

const Template = (args) => <PlaylistMenu {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { track: tracks[4] };
