import React from "react";
import Photo from "./Photo";

export default {
  title: "Common/Display/Photo",
  component: Photo,
};

const Template = (args) => <Photo {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
