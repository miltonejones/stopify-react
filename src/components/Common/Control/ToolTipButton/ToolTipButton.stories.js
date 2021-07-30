import { Add } from "@material-ui/icons";
import React from "react";
import ToolTipButton from "./ToolTipButton";

export default {
  title: "Common/Control/ToolTipButton",
  component: ToolTipButton,
};

const Template = (args) => <ToolTipButton {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  title: "You should be here!",
  click: console.log,
  icon: <Add />,
};
