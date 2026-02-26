import { createTheme } from '@mui/material/styles';

// Цвета из Terraria
const terrariaTheme = createTheme({
  palette: {
    primary: {
      main: '#5D7B5D', // Лесной зеленый
      light: '#7C9C7C',
      dark: '#3E543E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#BD8A5A', // Древесный коричневый
      light: '#D4A373',
      dark: '#8B5E3C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F0E6D2', // Светлый песочный
      paper: '#FFF8E7',
    },
    text: {
      primary: '#3C2F23',
      secondary: '#6B5A4A',
    },
  },
  typography: {
    fontFamily: '"Courier New", "Roboto", monospace',
    h4: {
      fontWeight: 600,
      letterSpacing: '1px',
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '8px 16px',
          borderWidth: '2px',
          boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.2), inset 2px 2px 0 rgba(255,255,255,0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'inset -3px -3px 0 rgba(0,0,0,0.2), inset 3px 3px 0 rgba(255,255,255,0.3)',
          },
        },
        containedPrimary: {
          background: '#5D7B5D',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#8B5E3C',
          boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
          backgroundColor: 'rgba(255, 248, 231, 0.9)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#BD8A5A',
          boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '4px solid #3E543E',
        },
      },
    },
  },
});

export default terrariaTheme;
