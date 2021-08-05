import React from "react";
import PlaylistBanners from "./PlaylistBanners";

export default {
  title: "Layout/Dash/PlaylistBanners",
  component: PlaylistBanners,
};

const Template = (args) => <PlaylistBanners {...args} />;

export const DefaultView = Template.bind({});
export const SmallView = Template.bind({});

DefaultView.args = {};
SmallView.args = { small: true };
