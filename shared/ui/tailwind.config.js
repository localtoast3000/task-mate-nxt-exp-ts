const defaultTheme = require('tailwindcss/defaultTheme');
const daisyui = require('daisyui');
const daisyuiTheme = require('daisyui/src/theming/themes');

module.exports = (paths) => {
  const buildContentPaths = () => {
    if (paths.length > 0) return paths.map((path) => `${path}/**/*.{js,ts,jsx,tsx,mdx}`);
    return [];
  };

  return {
    content: [...buildContentPaths(paths)],
    important: true,
    daisyui: {
      themes: [
        {
          dark: {
            ...daisyuiTheme['[data-theme=dark]'],
            'base-content': '#ffffff',
            primary: '#4C35DE',
            secondary: '#DF3473',
            accent: '#008B61',
            info: '#c47bfd',
            neutral: '#8D92A1',
            'neutral-content': '#ffffff',
          },
          light: {
            ...daisyuiTheme['[data-theme=light]'],
            'base-content': 'black',
            'neutral-content': 'black',
          },
        },
      ],
    },
    theme: {
      fontFamily: {
        header: ['"Gelasio"', 'serif'],
        main: ['"Inter"', 'sans-serif'],
      },
      extend: {
        spacing: {
          'content-y-offset': '50px',
          'page-lg': '100px',
          'page-md': '50px',
          'page-sm': '30px',
          'page-xs': '20px',
          ...defaultTheme.spacing,
        },
        screens: {
          xxs: '350px',
          xs: '450px',
          ...defaultTheme.screens,
          xl: '1700px',
        },
        opacity: {
          ghost: '0.2',
          semighost: '0.3',
          light: '0.4',
          medium: '0.6',
          semibold: '0.8',
          bold: '0.9',
          disabled: '0.4',
          'on-hover': '0.8',
          ...defaultTheme.opacity,
        },
      },
      letterSpacing: {
        ...defaultTheme.letterSpacing,
        widest: '.2em',
      },
    },
    plugins: [daisyui],
  };
};
