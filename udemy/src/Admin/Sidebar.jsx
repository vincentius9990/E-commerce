import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import Users from './Users';
import Shippinginfo from './Shippinginfo';

const drawerWidth = 240;

const menuItems = [
  { text: 'Users', icon: <GroupIcon />, action: 'handleUsers' },
  { text: 'ShippingInfo', icon: <LocalShippingIcon />, action: 'handleShipping' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('Users'); // Set default to 'Users'

  const handleUsers = () => {
    setSelectedItem('Users');
  };

  const handleShipping = () => {
    setSelectedItem('ShippingInfo');
  };

  const handleItemClick = (action) => {
    if (action === 'handleUsers') {
      handleUsers();
    } else if (action === 'handleShipping') {
      handleShipping();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <IconButton variant="text" color="primary" onClick={() => navigate('/')}>
            <Tooltip title="HOME">
              <HomeIcon />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.action)}
                sx={{
                  backgroundColor: selectedItem === item.text ? 'primary.main' : 'inherit',
                  color: selectedItem === item.text ? 'white' : 'inherit',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedItem === item.text ? 'white' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {selectedItem === 'Users' ? <Users /> : <Shippinginfo />}
      </Box>
    </Box>
  );
};

export default Sidebar;
