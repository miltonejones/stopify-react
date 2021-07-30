import React from "react";
import TrackList from "./TrackList";
import tracks from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "Common/Display/TrackList",
  component: TrackList,
};

const Template = (args) => <TrackList {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { tracks, open: false };
