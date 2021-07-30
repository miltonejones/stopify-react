import React from "react";
import ProgressBar from "./ProgressBar";

export default {
  title: "Audio/Player/ProgressBar",
  component: ProgressBar,
};

const Template = (args) => <ProgressBar {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  flat: false,
  width: 400,
  value: 72,
};
