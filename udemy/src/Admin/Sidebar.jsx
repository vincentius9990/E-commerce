import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Tooltip, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import Users from './Users';

const drawerWidth = 240;

const menuItems = [
  { text: 'users', icon: <GroupIcon />, action: 'handleUsers' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState('');
const [usertoggle,setusertoggle] = useState(false);
  const handleUsers = () => {
    setSelectedItem('users');
    setusertoggle(true);
    
    // Handle users click logic
  };

  const handleItemClick = (action) => {
    if (action === 'handleUsers') {
      handleUsers();
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
          <IconButton variant='text' color="primary" onClick={() => navigate('/')}>
            <Tooltip title='HOME'>
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
              <ListItemButton onClick={() => handleItemClick(item.action)} className={selectedItem === item.text ? 'colorChange' : ''}>
                <ListItemIcon>
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
        
       {usertoggle?(<Users/>):( <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
        
        
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        )} 
      </Box>
    </Box>
  );
};

export default Sidebar;
