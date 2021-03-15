import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  body: 'Roboto, "sans-serif"',
  heading: 'Roboto, "sans-serif"'
};

const breakpoints = createBreakpoints({
  sm: '37.5em',
  md: '52.5em',
  lg: '64em',
  xl: '80em'
});

const colors = {
  primary: {
    50: '#FAF5FF',
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659'
  }
};

const theme = extendTheme({ colors, fonts, breakpoints });

export default theme;
