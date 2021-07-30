import React from "react";
import EqLabel from "./EqLabel";

export default {
  title: "Audio/Player/EqLabel",
  component: EqLabel,
};

const Template = (args) => <EqLabel {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { flat: false };
