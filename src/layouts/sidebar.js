import property from '../store/property.js';

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
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

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
    //...theme.mixins.toolbar,
    minHeight: '54px'
    // /justifyContent: 'flex-end',
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    margin:'10px',
    color: property.txtColor,
    borderRadius: property.borderRadius,
  }));
  
  const StyledListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
      backgroundColor: property.lightColor,
      color: property.white
    },
  }));

export default function Sidebar({open}) {

    return(
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <StyledPaper  elevation={0} sx={{height:'100vh'}}>
        <DrawerHeader>
        <EqualizerRoundedIcon sx={{ml: '10px', mt:"auto", fontSize: 40, color:property.mainColor}}/>
          <Typography variant="h6" noWrap component="div" sx={{ml:'10px', mr:'auto', mt:"auto"}}>
            KOSTIS
          </Typography>
        </DrawerHeader>
        <List>
          {['데이터1', '데이터2', '데이터3','데이터4', '데이터5', '데이터6'].map((text, index) => (
            <StyledPaper>
            <StyledListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
                <ListItemIcon>
                  <KeyboardArrowDownRoundedIcon sx={{ml:"auto"}}/>
                </ListItemIcon>
              </ListItemButton>
            </StyledListItem>
            </StyledPaper>
          ))}
        </List>
        </StyledPaper>
      </StyledDrawer>


    )
}