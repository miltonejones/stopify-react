import { MusicNote } from "@material-ui/icons";
import React from "react";
import CrumbList from "./CrumbList";

export default {
  title: "Common/Control/CrumbList",
  component: CrumbList,
};

const Template = (args) => <CrumbList {...args} />;

export const DefaultView = Template.bind({});
export const NameView = Template.bind({});

DefaultView.args = {
  route: {
    path: "Artist.html",
    type: "artist",
    data: {
      label: "Artists",
      icon: <MusicNote />,
      prefix: "/list/",
      home: true,
      cover: ["Artist_cover.html", "cover"],
    },
  },
};

NameView.args = {
  ...DefaultView.args,
  name: "Pat Benatar",
};
