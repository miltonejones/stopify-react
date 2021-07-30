import { PauseCircleFilled } from "@material-ui/icons";
import React from "react";
import ProgressButton from "./ProgressButton";

export default {
  title: "Audio/Player/ProgressButton",
  component: ProgressButton,
};

const Template = (args) => <ProgressButton {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { value: 75, icon: <PauseCircleFilled /> };
