import React from "react";
import AppLayout from "./AppLayout";

export default {
  title: "Layout/AppLayout",
  component: AppLayout,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <AppLayout {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
