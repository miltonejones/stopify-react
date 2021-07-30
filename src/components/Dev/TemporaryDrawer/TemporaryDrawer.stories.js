import React from "react";
import TemporaryDrawer from "./TemporaryDrawer";

export default {
  title: "Tools/TemporaryDrawer",
  component: TemporaryDrawer,
};

const Template = (args) => <TemporaryDrawer {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
