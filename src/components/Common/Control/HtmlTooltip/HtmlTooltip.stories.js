import React from "react";
import HtmlTooltip from "./HtmlTooltip";

export default {
  title: "Common/Control/HtmlTooltip",
  component: HtmlTooltip,
};

const Template = (args) => (
  <HtmlTooltip {...args}>
    <div>stuff to see</div>
  </HtmlTooltip>
);

export const DefaultView = Template.bind({});

DefaultView.args = { title: "Tooltip title will be whhatt??" };
