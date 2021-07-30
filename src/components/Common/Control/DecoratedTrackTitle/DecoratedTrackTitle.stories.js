import React from "react";
import DecoratedTrackTitle from "./DecoratedTrackTitle";
import tracks from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "Common/Control/DecoratedTrackTitle",
  component: DecoratedTrackTitle,
};

const Template = (args) => <DecoratedTrackTitle {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { track: tracks[4] };
