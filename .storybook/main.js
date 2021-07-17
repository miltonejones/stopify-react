module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    // DOCS: https://storybook.js.org/docs/react/essentials/viewport
    "@storybook/addon-viewport",
    // DOCS: https://storybook.js.org/addons/storybook-addon-designs/
    // DOCS: https://pocka.github.io/storybook-addon-designs
    "storybook-addon-designs",
    "@storybook/addon-storysource",
    "storybook-addon-outline",
  ],
};
