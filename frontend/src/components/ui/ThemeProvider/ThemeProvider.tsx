'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useMemo } from 'react';

/**
 * Minimal MUI Theme configuration.
 * Colors are handled via CSS variables in SCSS - see _colors.scss
 * MUI component colors are overridden in their respective wrapper components.
 */
const createAppTheme = () =>
    createTheme({
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
 * Provides minimal MUI configuration. Colors are managed via CSS variables.
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
