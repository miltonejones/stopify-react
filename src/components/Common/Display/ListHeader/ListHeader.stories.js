import React from "react";
import ListHeader from "./ListHeader";

export default {
  title: "Common/Display/Header/ListHeader",
  component: ListHeader,
};

const Template = (args) => <ListHeader {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
