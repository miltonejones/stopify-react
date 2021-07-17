import { addons } from "@storybook/addons";
// THEMING Storybook UI:
// https://storybook.js.org/docs/react/configure/theming
// import { themes } from '@storybook/theming';
import storybookTheme from "./storybookTheme";

addons.setConfig({
  // specifically THEMING Storybook's UI ("manager"):
  theme: storybookTheme,
  // ALL the other configs:
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  selectedPanel: undefined,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
  },
});
