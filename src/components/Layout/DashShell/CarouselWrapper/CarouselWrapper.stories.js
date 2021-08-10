import React from "react";
import CarouselWrapper from "./CarouselWrapper.js";
import tracks from "../../../../stories/assets/stories-play-list.json";

export default {
  title: "Tools/Dev/Draft/CarouselWrapper",
  component: CarouselWrapper,
};

const Template = (args) => <CarouselWrapper {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { tracks };
