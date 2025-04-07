/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // 모든 WCAG 2.1 AA 규칙을 활성화
            id: 'wcag2a',
            enabled: true
          },
          {
            id: 'wcag2aa',
            enabled: true
          },
          {
            id: 'wcag21a',
            enabled: true
          },
          {
            id: 'wcag21aa',
            enabled: true
          }
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
        shouldShowOnlyHighlightedResults: false,
      },
      manual: false,
    },
  },
};

export default preview;
