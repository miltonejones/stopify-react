import React from "react";
import AppToolbar from "./AppToolbar";

export default {
  title: "Layout/AppToolbar",
  component: AppToolbar,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <AppToolbar {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
