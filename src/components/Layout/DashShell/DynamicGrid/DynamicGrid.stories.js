import React from "react";
import DynamicGrid from "./DynamicGrid";

export default {
  title: "Layout/Dash/DynamicGrid",
  component: DynamicGrid,
};

const Template = (args) => <DynamicGrid {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
