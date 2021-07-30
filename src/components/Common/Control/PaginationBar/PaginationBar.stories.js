import React from "react";
import PaginationBar from "./PaginationBar";

export default {
  title: "Common/Control/PaginationBar",
  component: PaginationBar,
};

const Template = (args) => <PaginationBar {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  startPage: 8,
  pageSize: 15,
  collection: (function (e) {
    for (var i = 0; 654 > ++i; e.push(i));
    return e;
  })([]),
  selection: [],
  click: console.log,
};
