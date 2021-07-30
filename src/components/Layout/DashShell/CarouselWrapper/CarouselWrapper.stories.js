import React from "react";
import CarouselWrapper from "./CarouselWrapper.js";

export default {
  title: "CarouselWrapper",
  component: CarouselWrapper,
};

const Template = (args) => <CarouselWrapper {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
