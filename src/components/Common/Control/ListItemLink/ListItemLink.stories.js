import { List } from "@material-ui/core";
import { Album } from "@material-ui/icons";
import React from "react";
import ListItemLink from "./ListItemLink";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Common/Control/ListItemLink",
  component: ListItemLink,
};

const Template = (args) => (
  <Router>
    <List>
      <ListItemLink {...args} />
    </List>
  </Router>
);

export const DefaultView = Template.bind({});
export const IconView = Template.bind({});

DefaultView.args = {
  primary: "Text for the link",
  secondary: "a caption is also allowed",
  to: "/",
  image:
    "http://is1.mzstatic.com/image/thumb/Music3/v4/7d/6d/df/7d6ddfc6-b59b-05d0-870c-ee756ad948ec/source/100x100bb.jpg",
  count: 99,
  small: false,
};

IconView.args = {
  icon: <Album />,
  primary: "Albums",
  to: "/",
  small: false,
};
