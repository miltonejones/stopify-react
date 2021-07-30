import { createTheme } from "@material-ui/core/styles";
// To use defined mui color palettes within key values, like `divider: grey[300]`, within this config file, we must import those colors from `@material-ui/core/colors`, first.
// REF: https://next.material-ui.com/customization/color/
import { common, grey, purple } from "@material-ui/core/colors";

// import fonts at the theme level from ``.
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// XXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXX
// ATLAS DEV NOTE: MUI usage is `next` or v5 alpha -- EVERYTHING IS SUBJECT TO MUI RELEASES UNTIL STABLE.
// XXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXX

// # MUI THEMING REFERENCE/SYNTAX:
// ## ############################
// ## https://next.material-ui.com/customization/theming/
// ## THIS config file is based on the following template and node files in /@material-ui/
// ## https://next.material-ui.com/customization/default-theme/
// ## DEV COMMENTS here are, primarily, from the mui lib files, to help explain usage and context to App teams to successfully apply mui theme edits.
// ## #TODO: convert color values to start as MUI HUE[SHADE] where/when possible, and if there's no alpha/opacity to worry about.
// ## APPROACH has been: adjust the key values to match the FIGMA MUI UI Components, THEN match any values with MUI HUE[SHADE] palette format.
// ## ############################

// # STEP #1 of 2:
// ## ############################
// ## BEGIN WITH THE MUI DEFAULT THEME CONFIG OBJECT FROM ABOVE REF.
// ## WHY: In order to 'self-reference', access, & apply compiled 'theme keys', initial design token values, mixins, helpers, from the 'base' `theme` input/output, we need to "pre-compile" the `theme`,
// ## SO THAT: an object exists to access and compile again, with more complex global overrides & expressions.
// ## WHY: This helps keep the 'global' theme as 1 file, instead of successive, nested <ThemeProvider>s and `createTheme`s.
// ## ...AND simplifies the relationship & scope between `app shell` and `app shell template`.
// ## UPDATES to all of this are HIGHLY likely.
// ## REF: MUI ISSUE: https://github.com/mui-org/material-ui/issues/21757
// ## REF: EXAMPLE CODE: https://github.com/mui-org/material-ui/blob/7855f2b967b7edaae012f35e18480fa72374fcfd/docs/src/modules/branding/BrandingRoot.tsx
// ## ############################

let theme = createTheme({
  name: "Default Brand",
  // REF: https://next.material-ui.com/customization/breakpoints/
  breakpoints: {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ["xs", "sm", "md", "lg", "xl"],
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    unit: "px",
  },
  direction: "ltr",
  // REF: https://next.material-ui.com/customization/palette/
  palette: {
    // A collection of common colors.
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    // The palette mode, can be light or dark.
    mode: "light",
    // The colors used to represent primary interface elements for a user.
    primary: {
      main: "#007DFF",
      dark: "#0057B2",
      light: "#3397FF",
      contrastText: "#FFFFFF",
    },
    // The colors used to represent secondary interface elements for a user.
    secondary: {
      // purple[400]=#AB47BC
      main: purple[400],
      dark: "#773183",
      light: "#BB6BC9",
      contrastText: "#FFFFFF",
    },
    // The colors used to represent interface elements that the user should be made aware of.
    error: {
      // red[500]=#F44336
      main: "#F44336",
      dark: "#E31B0C",
      light: "#F88078",
      contrastText: "#FFFFFF",
    },
    // The colors used to represent potentially dangerous actions or important messages.
    warning: {
      // orange[500]=#FF9800
      main: "#FF9800",
      dark: "#C77700",
      light: "#FFB547",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: {
      // blue[500]=#2196F3
      main: "#2196F3",
      dark: "#0B79D0",
      light: "#64B6F7",
      contrastText: "#FFFFFF",
    },
    // The colors used to indicate the successful completion of an action that user triggered.
    success: {
      // green[500]=#4CAF50
      main: "#4CAF50",
      dark: "#3B873E",
      light: "#7BC67E",
      contrastText: "#FFFFFF",
    },
    // The grey colors.
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.54)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    // The color used to divide different elements.
    divider: grey[300],
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: common.white,
      default: grey[50],
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.08)",
      hoverOpacity: 0.08,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  // REF: https://next.material-ui.com/system/typography/
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // The default font size of the Material Specification: 14.
    fontSize: 14,
    // px
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: 16,
  },
  // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons and type, can align to a 4dp grid.
  // Can be 1 value or array of up to 4:
  // 1: value: number,
  // 2: [topBottom, rightLeft]
  // 3: [top, rightLeft, bottom]
  // 4: [top, right, bottom, left]
  // REF: https://next.material-ui.com/customization/spacing/
  spacing: 4,
  // Affect the border radius of ALL MUI elements, and components, like Button, Card, Menu, etc
  shape: {
    // Value can be a unitless number: borderRadius: 4, OR string with unit: borderRadius: '4px', borderRadius: '50%'.
    borderRadius: "4px",
  },
  // MUI: We need to centralize the zIndex definitions as they work like global values in the browser.
  // MUI defaults: 1000, 1050,
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  // overrides: {
  //   MuiIconButton: {
  //     root: {
  //       boxShadow: ` 5px 5px 10px #d4d4d4,
  //                     -5px -5px 10px #ffffff`,
  //       "& :active": {
  //         borderRadius: "50%",
  //         boxShadow: `inset 6px 6px 12px #c8c8c8,
  //                                   inset -6px -6px 12px #ffffff`,
  //       },
  //     },
  //   },
  // },
  // DENSITY EFFECTS BY USING 'components' object:
  // REF: https://next.material-ui.com/customization/theme-components/
  // REF: https://next.material-ui.com/customization/density/
  // components: {
  //   MuiButton: {
  //     defaultProps: {
  //       size: 'small',
  //     },
  //   },
  //   MuiFilledInput: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiFormControl: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiFormHelperText: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiIconButton: {
  //     defaultProps: {
  //       size: 'small',
  //     },
  //     styleOverrides: {
  //       sizeSmall: {
  //         // Adjust spacing to reach minimal touch target hitbox
  //         marginLeft: 4,
  //         marginRight: 4,
  //         padding: 12,
  //       },
  //     },
  //   },
  //   MuiInputBase: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiInputLabel: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiListItem: {
  //     defaultProps: {
  //       dense: true,
  //     },
  //   },
  //   MuiOutlinedInput: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiFab: {
  //     defaultProps: {
  //       size: 'small',
  //     },
  //   },
  //   MuiTable: {
  //     defaultProps: {
  //       size: 'small',
  //     },
  //   },
  //   MuiTextField: {
  //     defaultProps: {
  //       margin: 'dense',
  //     },
  //   },
  //   MuiToolbar: {
  //     defaultProps: {
  //       variant: 'dense',
  //     },
  //   },
  // },
});

// ## STEP #2 of 2:
// ## ############################
// ## NOW we can access, & apply everything that was compiled above...
// ## including values and tokens/vars like `breakpoints {...}`, `palette {...}`, etc.
// ## SO THAT: an object exists to access and compile again, with more complex global overrides & expressions.
// ## WHY: This helps keep the 'global' theme as 1 file, instead of successive, nested <ThemeProvider>s and `createTheme`s.
// ## ############################

const stopifyThemeDefault = createTheme(theme, {
  typography: {
    h1: {
      // Set 'Base' for all sizes from xs-xl, with NO media-query:
      // fontSize: '1.2rem',
      // OR:
      // https://next.material-ui.com/customization/typography/#responsive-font-sizes
      // https://next.material-ui.com/customization/breakpoints/#css-media-queries
      [theme.breakpoints.only("xs")]: {
        fontSize: "2.00rem", // 32px/16px
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "3.50rem", // 56px/16px
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "4.75rem", // 76px/16px
      },
      [theme.breakpoints.only("lg")]: {
        fontSize: "5.375rem", // 86px/16px
      },
      [theme.breakpoints.only("xl")]: {
        fontSize: "6.00rem", // 96px/16px
      },
    },
    h2: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "1.750rem", // 28px/16px
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "2.375rem", // 38px/16px
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "3.0rem", // 48px/16px
      },
      [theme.breakpoints.only("lg")]: {
        fontSize: "3.375rem", // 54px/16px
      },
      [theme.breakpoints.only("xl")]: {
        fontSize: "3.75rem", // 60px/16px
      },
    },
    h3: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "1.625rem", // 26px/16px
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "2.00rem", // 32px/16px
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "2.625rem", // 42px/16px
      },
      [theme.breakpoints.only("lg")]: {
        fontSize: "2.875rem", // 46px/16px
      },
      [theme.breakpoints.only("xl")]: {
        fontSize: "3.0rem", // 48px/16px
      },
    },
    h4: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "1.50rem", // 24px/16px
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "1.625rem", // 26px/16px
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "1.875rem", // 30px/16px
      },
      [theme.breakpoints.only("lg")]: {
        fontSize: "2.125rem", // 34px/16px
      },
      [theme.breakpoints.only("xl")]: {
        fontSize: "2.125rem", // 34px/16px
      },
    },
    h5: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "1.250rem", // 20px/16px
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "1.250rem", // 20px/16px
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "1.375rem", // 22px/16px
      },
      [theme.breakpoints.only("lg")]: {
        fontSize: "1.50rem", // 24px/16px
      },
      [theme.breakpoints.only("xl")]: {
        fontSize: "1.50rem", // 24px/16px
      },
    },
    h6: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "1.125rem", // 18px/16px
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "1.125rem", // 18px/16px
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "1.250rem", // 20px/16px
      },
      [theme.breakpoints.only("lg")]: {
        fontSize: "1.250rem", // 20px/16px
      },
      [theme.breakpoints.only("xl")]: {
        fontSize: "1.250rem", // 20px/16px
      },
    },
  },
});

export default stopifyThemeDefault;
