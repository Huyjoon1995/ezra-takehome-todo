import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Button,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

// Test mode top bar with mock user
const TestTopBar = () => {
    const user = {
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://via.placeholder.com/32'
    };

    const handleLogout = () => {
        console.log('Mock logout in test mode');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgba(255,255,255,0.8)', color: 'black' }} elevation={0}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        Todo List
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <Avatar
                            src={user.picture}
                            alt={user.name}
                            sx={{ width: 32, height: 32, mr: 1 }}
                        />
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1 }}>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                                {user.email}
                            </Typography>
                        </Box>
                        <Button
                            onClick={handleLogout}
                            variant="outlined"
                            sx={{
                                color: 'black',
                                borderColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    borderColor: 'black',
                                },
                                marginLeft: '5px',
                                textTransform: 'none',
                                fontWeight: 600,
                            }}>LogOut</Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Real Auth0 top bar
const AuthTopBar = () => {
    const { user, isLoading, logout } = useAuth0();
    
    if (isLoading || !user) return null;

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgba(255,255,255,0.8)', color: 'black' }} elevation={0}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        Todo List
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <Avatar
                            src={user?.picture}
                            alt={user?.name || 'User'}
                            sx={{ width: 32, height: 32, mr: 1 }}
                        />
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1 }}>
                                {user?.name || 'User'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                                {user?.email}
                            </Typography>
                        </Box>
                        <Button
                            onClick={handleLogout}
                            variant="outlined"
                            sx={{
                                color: 'black',
                                borderColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    borderColor: 'black',
                                },
                                marginLeft: '5px',
                                textTransform: 'none',
                                fontWeight: 600,
                            }}>LogOut</Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export const TopBar = () => {
    const isTestMode = (window as any).__TEST_MODE__ || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';
    
    return isTestMode ? <TestTopBar /> : <AuthTopBar />;
}