import React from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme, Tooltip } from '@mui/material';
import { Dashboard, People, Receipt, Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useColorMode } from '../../theme/ThemeContext';

const Sidebar = () => {
  const theme = useTheme();
  const colorMode = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Traders', icon: <People />, path: '/traders' },
    { text: 'Invoices', icon: <Receipt />, path: '/invoices' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Box sx={{
      width: 260, height: '100vh', bgcolor: 'background.paper',
      borderRight: `1px solid ${theme.palette.divider}`,
      display: 'flex', flexDirection: 'column', position: 'sticky', top: 0
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>TEXTILE MS</Typography>
        <IconButton onClick={colorMode.toggleColorMode}>
          <Tooltip title="Toggle light/dark mode">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </Tooltip>
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, px: 2, mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'white' : 'text.primary',
                  '&:hover': { bgcolor: isActive ? 'primary.dark' : theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6' },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'white' : 'primary.main', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ p: 2 }}><ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: '#ef4444' }}><ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Logout /></ListItemIcon><ListItemText primary="Logout" /></ListItemButton></Box>
    </Box>
  );
};

export default Sidebar;