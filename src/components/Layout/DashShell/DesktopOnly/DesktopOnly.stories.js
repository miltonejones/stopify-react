import React from "react";
import DesktopOnly from "./DesktopOnly";

export default {
  title: "Layout/Dash/DesktopOnly",
  component: DesktopOnly,
};

const Template = (args) => <DesktopOnly {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
