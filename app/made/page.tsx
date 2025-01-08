"use client";

import { Suspense, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MadeContent from "./MadeContent";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    opacity: 0.9,
                    '&.Mui-selected': {
                        color: '#ffffff',
                        opacity: 1,
                        backgroundColor: '#343a40',
                        borderRadius: '8px',
                    },
                    '&:hover': {
                        opacity: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                    },
                    minHeight: '40px',
                    padding: '2px 16px',
                    transition: 'all 0.3s',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    display: 'none',
                },
            },
        },
    },
});

const Made = () => {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }>
                <MadeContent />
            </Suspense>
        </ThemeProvider>
    );
};

export default Made;

