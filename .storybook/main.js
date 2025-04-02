/** @type { import('@storybook/html-vite').StorybookConfig } */
module.exports = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  },
  viteFinal: (config) => {
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      'swiper/element/bundle',
    ];
    return config;
  },
  docs: {
    autodocs: "tag"
  }
};
