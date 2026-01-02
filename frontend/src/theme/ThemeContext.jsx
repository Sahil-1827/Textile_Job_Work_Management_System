import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => { } });
export const useColorMode = () => useContext(ColorModeContext);

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => {
                const newMode = prevMode === 'light' ? 'dark' : 'light';
                localStorage.setItem('themeMode', newMode);
                return newMode;
            });
        },
    }), []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: { main: '#3b82f6' },
            background: {
                default: mode === 'light' ? '#f9fafb' : '#111827', // Gray-900 for dark
                paper: mode === 'light' ? '#ffffff' : '#1f2937',   // Gray-800 for dark cards/sidebar
            },
            text: {
                primary: mode === 'light' ? '#111827' : '#f9fafb',
                secondary: mode === 'light' ? '#4b5563' : '#9ca3af',
            },
        },
        shape: { borderRadius: 12 },
        typography: { fontFamily: '"Inter", sans-serif' },
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};