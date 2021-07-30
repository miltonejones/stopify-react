import { PlayArrow } from "@material-ui/icons";
import React from "react";
import PlayerButton from "./PlayerButton";

export default {
  title: "Audio/Player/PlayerButton",
  component: PlayerButton,
};

const Template = (args) => <PlayerButton {...args} />;

export const DefaultView = Template.bind({});
export const SmallView = Template.bind({});
export const DisabledView = Template.bind({});

DefaultView.args = {
  icon: <PlayArrow />,
};

SmallView.args = {
  ...DefaultView.args,
  size: "small",
};

DisabledView.args = {
  ...DefaultView.args,
  disabled: "true",
};
