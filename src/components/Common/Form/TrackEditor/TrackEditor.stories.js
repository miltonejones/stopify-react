import React from "react";
import TrackEditor from "./TrackEditor";
import tracks from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "Common/Form/TrackEditor",
  component: TrackEditor,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <TrackEditor {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { track: tracks[0] };
