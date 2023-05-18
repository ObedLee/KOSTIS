import property from '../config/property.js';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ClickAwayListener from '@mui/base/ClickAwayListener';


const StyledDrawer = styled(Drawer)(() => ({
    flexShrink: 1,
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

  const StyledPaper = styled(Paper)(() => ({
    margin:'10px',
    color: property.txtColor,
    borderRadius: property.borderRadius,
  }));
  
  const StyledListItem = styled(ListItem)(() => ({
    '&:hover': {
      border: '2px solid' + property.warnColor,
      borderRadius: property.borderRadius,
    },
  }));



  
export default function Sidebar({open, setOpen, data}) {

    return(
      <StyledDrawer
        anchor="left"
        open={open}>
      <ClickAwayListener onClickAway={()=>setOpen(false)}>
        <StyledPaper elevation={0} sx={{height:'100vh'}}>
        <DrawerHeader>
        <EqualizerRoundedIcon sx={{ml: '10px', mt:"auto", fontSize: 40, color:property.mainColor}}/>
          <Typography variant="h6" noWrap component="div" sx={{ml:'10px', mr:'auto', mt:"auto"}}>
            KOSTIS
          </Typography>
        </DrawerHeader>
        <List>
          {data.map((dt, i) => (
            <StyledPaper key={dt.name} >
            <StyledListItem disablePadding>
              <ListItemButton>
                <ListItemText sx={{ml:"10px"}} primary={dt.name} />
                <ListItemIcon>
                  <KeyboardArrowDownRoundedIcon sx={{ml:"auto"}}/>
                </ListItemIcon>
              </ListItemButton>
            </StyledListItem>
            </StyledPaper>
          ))}
        </List>
        </StyledPaper>
        </ClickAwayListener>
      </StyledDrawer>
    )
}