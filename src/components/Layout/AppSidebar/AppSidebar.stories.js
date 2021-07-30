import React from "react";
import AppSidebar from "./AppSidebar";

export default {
  title: "Layout/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    type: {
      options: [
        "Home.html",
        "Library.html",
        "Artist.html",
        "Album.html",
        "Genre.html",
        "Playlist.html",
      ],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <AppSidebar {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = { open: true, wide: false, type: "Home.html" };
