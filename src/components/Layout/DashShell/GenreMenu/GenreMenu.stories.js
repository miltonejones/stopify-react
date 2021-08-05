import React from "react";
import GenreMenu from "./GenreMenu";

export default {
  title: "Layout/Dash/GenreMenu",
  component: GenreMenu,
};

const Template = (args) => <GenreMenu {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
