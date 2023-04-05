import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import property from '../property.js';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: property.drawerWidth,
    flexShrink: 0,
    color: property.mainColor,
    marginTop:'70px',
    '& .MuiDrawer-paper': {
      width: property.drawerWidth,
      boxSizing: 'border-box',
    }
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    color: property.mainColor,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // /justifyContent: 'flex-end',
  }));

export default function Sidebar({open}) {

    return(
        <StyledDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
        <EqualizerRoundedIcon sx={{ mr: 1}}/>
          <Typography variant="h6" noWrap component="div" sx={{ mr:'auto'}}>
            K-Statics
          </Typography>
        </DrawerHeader>
        <Divider />
        <List sx={{color:property.mainColor}}>
          {['데이터1', '데이터2', '데이터3','데이터4', '데이터5', '데이터6'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </StyledDrawer>

    )
}