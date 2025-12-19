'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useMemo } from 'react';

/**
 * MUI Theme configuration using CSS custom properties from SCSS.
 * This bridges the SCSS color system with MUI's theming.
 */
const createAppTheme = () =>
  createTheme({
    palette: {
      primary: {
        main: '#006a6a', // var(--color-primary-main)
        light: '#26c6c6', // var(--color-primary-light)
        dark: '#004f4f', // var(--color-primary-dark)
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ba5d07', // var(--color-secondary-main)
        light: '#ffa726', // var(--color-secondary-light)
        dark: '#8a4400', // var(--color-secondary-dark)
        contrastText: '#ffffff',
      },
      error: {
        main: '#d32f2f', // var(--color-error-main)
      },
      success: {
        main: '#388e3c', // var(--color-success-main)
      },
      warning: {
        main: '#f57c00', // var(--color-warning-main)
      },
      info: {
        main: '#1976d2', // var(--color-info-main)
      },
      grey: {
        50: '#eceff1',
        100: '#cfd8dc',
        200: '#b0bec5',
        300: '#90a4ae',
        400: '#78909c',
        500: '#607d8b',
        600: '#546e7a',
        700: '#455a64',
        800: '#37474f',
        900: '#263238',
      },
      background: {
        default: '#ffffff',
        paper: '#eceff1',
      },
      text: {
        primary: '#263238',
        secondary: '#546e7a',
        disabled: '#78909c',
      },
      divider: '#b0bec5',
    },
    typography: {
      fontFamily: '"Space Grotesk", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
        },
      },
    },
  });

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Application Theme Provider
 * Wraps the app with MUI theming that syncs with SCSS color variables.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;

