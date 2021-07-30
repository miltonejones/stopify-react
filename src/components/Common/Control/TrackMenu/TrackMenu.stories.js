import React from "react";
import TrackMenu from "./TrackMenu";
import tracks from "../../../../stories/assets/stories-track-list.json";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Common/Control/TrackMenu",
  component: TrackMenu,
};

const Template = (args) => (
  <Router>
    <TrackMenu {...args} />
  </Router>
);

export const DefaultView = Template.bind({});

DefaultView.args = { track: tracks[0] };
