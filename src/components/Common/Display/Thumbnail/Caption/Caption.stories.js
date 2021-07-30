import React from "react";
import Caption from "./Caption";

export default {
  title: "Common/Display/Thumbnail/Caption",
  component: Caption,
};

const Template = (args) => <Caption {...args} />;

export const DefaultView = Template.bind({});
export const SmallView = Template.bind({});

DefaultView.args = { text: "Baby, What You Want Me To Do!" };
SmallView.args = { ...DefaultView.args, small: true };
