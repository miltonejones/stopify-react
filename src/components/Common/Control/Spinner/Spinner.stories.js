import { HourglassEmpty } from "@material-ui/icons";
import React from "react";
import Spinner from "./Spinner";

export default {
  title: "Spinner",
  component: Spinner,
};

const Template = (args) => (
  <Spinner {...args}>
    <HourglassEmpty />
  </Spinner>
);

export const DefaultView = Template.bind({});

DefaultView.args = {
  on: false,
};
