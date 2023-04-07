import property from '../property.js';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: property.drawerWidth,
    flexShrink: 0,
    marginTop:'70px',
    '& .MuiDrawer-paper': {
      width: property.drawerWidth,
      boxSizing: 'border-box',
      background: property.backColor,
      color: property.txtColor,
      
    }
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    marginBottom: '10px',
    color: property.txtColor,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // /justifyContent: 'flex-end',
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    margin:'10px',
    color: property.txtColor,
  }));
  

export default function Sidebar({open}) {

    return(
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <StyledPaper  elevation={0} sx={{height:'100vh'}}>
        <DrawerHeader>
        <EqualizerRoundedIcon sx={{ml: 2, mr: 1}}/>
          <Typography variant="h6" noWrap component="div" sx={{ mr:'auto'}}>
            KOSTIS
          </Typography>
        </DrawerHeader>
        <List>
          {['데이터1', '데이터2', '데이터3','데이터4', '데이터5', '데이터6'].map((text, index) => (
            <StyledPaper>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            </StyledPaper>
          ))}
        </List>
        </StyledPaper>
      </StyledDrawer>


    )
}