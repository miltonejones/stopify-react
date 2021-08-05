import React from "react";
import SongList from "./SongList";

export default {
  title: "Layout/Dash/SongList",
  component: SongList,
};

const Template = (args) => <SongList {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
