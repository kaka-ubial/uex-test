import * as React from 'react';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const getM3Theme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#6750A4' : '#D0BCFF', 
    },
    background: {
      default: mode === 'light' ? '#FEF7FF' : '#141218', 
      paper: mode === 'light' ? '#FEF7FF' : '#141218',  
    },
    text: {
      primary: mode === 'light' ? '#1D1B20' : '#FEF7FF', 
      secondary: mode === 'light' ? '#49454F' : '#CAC4D0', 
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'light' ? '#FEF7FF' : '#141218',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'color 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          backgroundImage: 'none', 
        },
      },
    },
  },
});

export default function M3ThemeProvider({ children, mode = 'light' }: { children: React.ReactNode, mode?: 'light' | 'dark' }) {
  const theme = React.useMemo(() => getM3Theme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}