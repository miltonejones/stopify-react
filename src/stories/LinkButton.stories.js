import React from "react";
import LinkButton from "../components/Common/LinkButton";

export default {
  title: "Tools/Dev/LinkButton",
  component: LinkButton,
};

const Template = (args) => <LinkButton {...args} />;
export const DefaultView = Template.bind({});
export const DisabledView = Template.bind({});
DefaultView.args = {};
DisabledView.args = { disabled: true };
