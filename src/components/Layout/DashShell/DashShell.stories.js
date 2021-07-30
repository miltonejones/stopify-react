import React from "react";
import DashShell from "./DashShell";

export default {
  title: "DashShell",
  component: DashShell,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <DashShell {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
