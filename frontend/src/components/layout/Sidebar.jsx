import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Dashboard, Work, People, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Job Work', icon: <Work />, path: '/job-work' },
    { text: 'Parties', icon: <People />, path: '/parties' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Drawer variant="permanent" anchor="left" className="w-64">
      <div className="w-64 p-4 font-bold text-xl border-b text-blue-700">Textile System</div>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout} className="mt-auto text-red-500">
          <ListItemIcon><Logout className="text-red-500" /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;