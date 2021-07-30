import React from "react";
import ResponsivePlayerDrawer, { drawerOpen } from "./ResponsivePlayerDrawer";
import tracks from "../../../stories/assets/stories-play-list.json";
import { Button } from "@material-ui/core";

export default {
  title: "Audio/Player/ResponsivePlayerDrawer",
  component: ResponsivePlayerDrawer,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => {
  const p = {
    open: true,
    cancel: () => drawerOpen.next({ open: false }),
    flat: args.flat,
    items: tracks,
    start: 15,
  };
  const next = () => drawerOpen.next(p);
  return (
    <>
      <ResponsivePlayerDrawer />
      <Button onClick={next}>Open</Button>
    </>
  );
};

export const DefaultView = Template.bind({});

DefaultView.args = { flat: true };
