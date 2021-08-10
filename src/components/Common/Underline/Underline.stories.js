import React from "react";
import Underline from "./Underline";

export default {
  title: "Common/Display/Underline",
  component: Underline,
};

const Template = (args) => (
  <Underline {...args}>This will be the text</Underline>
);

export const DefaultView = Template.bind({});
export const DarkView = Template.bind({});

DefaultView.args = {};
DarkView.args = { dark: true };
