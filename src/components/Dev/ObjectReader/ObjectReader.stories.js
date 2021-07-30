import React from "react";
import ObjectReader from "./ObjectReader";

export default {
  title: "Tools/ObjectReader",
  component: ObjectReader,
};

const Template = (args) => <ObjectReader {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  something: "nothing",
};
