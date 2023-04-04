import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    color:"#383838",
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    }
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // /justifyContent: 'flex-end',
  }));

export default function Sidebar({open, setOpen}) {

    return(
        <StyledDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
        <EqualizerRoundedIcon sx={{ mr: 1}}/>
          <Typography variant="h6" noWrap component="div" sx={{ mr:'auto'}}>
            K-Statics
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
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