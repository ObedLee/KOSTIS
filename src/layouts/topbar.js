import property from '../store/property.js';
import Searchbox from '../components/searchbox.js'
import Sharebox from '../components/sharebox.js'
import AlertDialog from '../pages/chartpage.js'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: property.backColor,
  color: property.txtColor,
  ...(open && {
    width: `calc(100% - ${property.drawerWidth}px)`,
    marginLeft: `${property.drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Topbar({open, setOpen}) {

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit"
            aria-label="open drawer"
            onClick={open?handleDrawerClose:handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Searchbox/>
          <AlertDialog/>
          <IconButton sx={{ ml: 'auto' }}>
            <HelpOutlineRoundedIcon />
          </IconButton>
          <Sharebox/>
        </Toolbar>
      </AppBar>
  );
}
