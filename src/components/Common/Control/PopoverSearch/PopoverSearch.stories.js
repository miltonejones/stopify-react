import React from "react";
import PopoverSearch from "./PopoverSearch";
import tracks from "../../../../stories/assets/stories-track-list.json";

export default {
  title: "PopoverSearch",
  component: PopoverSearch,
};

const Template = (args) => <PopoverSearch {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  type: "artists",
  track: tracks[0],
  field: "artistName",
  index: "artistFk",
};
