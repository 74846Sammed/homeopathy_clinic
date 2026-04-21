import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../Assets/Images/logo 2.png';
import '../Header/Header.css'

const drawerWidth = 240;

// Navigation items with their corresponding paths
const navItems = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact_us' }
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Home');

  // Set active tab based on current route
  React.useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleTabClick = (item) => {
    setActiveTab(item.name);
    navigate(item.path);
    setMobileOpen(false); // Close mobile drawer after navigation
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Mark's Hospital
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              sx={{ 
                textAlign: 'center',
                backgroundColor: activeTab === item.name ? '#4caf50' : 'transparent',
                color: activeTab === item.name ? '#fff' : 'inherit',
                '&:hover': {
                  backgroundColor: activeTab === item.name ? '#45a049' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
              onClick={() => handleTabClick(item)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#213360', height: '70px' }}>
        <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            <img className='logo' src={logo} />
            Mark's Hospital
          </Typography>

          {/* Center: Desktop nav buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button 
                key={item.name} 
                sx={{ 
                  color: '#fff',
                  backgroundColor: activeTab === item.name ? '#4caf50' : 'transparent',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: activeTab === item.name ? '#45a049' : 'rgba(255, 255, 255, 0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleTabClick(item)}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { sm: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Page content
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae.
        </Typography>
      </Box> */}
    </Box>
  );
}

export default Header;