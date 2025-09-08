import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import './App.css';
import { Todos } from './Todos';
import { TopBar } from './TopBar';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#475569',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

// Auth0 wrapper component that handles authentication logic
const AuthWrapper = () => {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    useEffect(() => {
        // If the auth state is loaded and user is not authenticated, redirect to login
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    return <Todos />;
};

// Test mode component that bypasses authentication
const TestModeApp = () => {
    return <Todos />;
};

function App() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isTestMode = (window as any).__TEST_MODE__ || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopBar />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                }}
            >
                {isTestMode ? <TestModeApp /> : <AuthWrapper />}
            </Box>
        </ThemeProvider>
    );
}

export default App;