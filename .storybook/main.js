module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript"
  },
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "./provider-panel/preset"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};