import React from "react";
import CubePlayer from "./CubePlayer";

const parameters = { layout: "fullscreen" };
export default {
  title: "Tools/Dev/CubePlayer",
  component: CubePlayer,
};

const Template = (args) => <CubePlayer {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
DefaultView.parameters = parameters;
