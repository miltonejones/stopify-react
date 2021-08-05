import React from "react";
import VerticalList from "./VerticalList";

export default {
  title: "Layout/Dash/VerticalList",
  component: VerticalList,
};

const Template = (args) => <VerticalList {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
