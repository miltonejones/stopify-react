import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import shellThemes from "../src/themes/exportedThemes.js";
import { CssBaseline } from "@material-ui/core";
// VIEWPORTS https://storybook.js.org/docs/react/essentials/viewport
// import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

// demo shell themes available from appShell shellThemes include:
// atlasThemeDefaultBrand (default Tango Theme)
// testThemePurpleLightGreen (demo theme)

addDecorator((story) => (
  <ThemeProvider theme={shellThemes.stopifyThemeDefault}>
    <CssBaseline />
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  </ThemeProvider>
));

// VIEWPORT ADDON DEFS
// FROM ATLAS THEME/DESIGN SYSTEM BREAKPOINTS:
// DEV: `clamp()` on width to emulate responsive ranges: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()
const ATLAS_THEME_BRAND_VIEWPORTS = {
  xs: {
    name: "xs (0-599) [theme.breakpoints]",
    styles: {
      width: "clamp(0px, 100%, 599px)",
      height: "100%",
    },
  },
  sm: {
    name: "sm (600-959) [theme.breakpoints]",
    styles: {
      width: "clamp(600px, 100%, 959px)",
      height: "100%",
    },
  },
  md: {
    name: "md (960-1279) [theme.breakpoints]",
    styles: {
      width: "clamp(960px, 100%, 1279px)",
      height: "100%",
    },
  },
  lg: {
    name: "lg (1280-1919) [theme.breakpoints]",
    styles: {
      width: "clamp(1280px, 100%, 1919px)",
      height: "100%",
    },
  },
  xl: {
    name: "xl (1920 - ∞) [theme.breakpoints]",
    styles: {
      width: "clamp(1920px, 100%, 4096px)", // 4096=4K
      height: "100%",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // layout: "centered",
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    grid: {
      cellSize: 4,
      opacity: 0.25,
      cellAmount: 4,
      offsetX: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
      offsetY: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
    },
  },
  viewport: {
    viewports: {
      ...ATLAS_THEME_BRAND_VIEWPORTS, // DOC: https://storybook.js.org/docs/react/essentials/viewport#add-new-devices
      ...INITIAL_VIEWPORTS, // LIST: https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts#L3
    },
    // Default `defaultViewport` param/prop/val syntax:
    // defaultViewport: 'iphone6',
  },
  // TODO: "Show code" displays "<MDXCreateElement ...>" and not the JSX.
  // https://github.com/storybookjs/storybook/issues/11542
  // As a workaround you can set the docs.source.type story parameter to "code".
  // 'code', 'dynamic', 'auto'
  // Storybook `v 6.3.x` has a PERMANENT FIX for this.
  // docs: {
  //   source: {
  //     type: "code",
  //   },
  // },
};
