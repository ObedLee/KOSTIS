import property from '../config/property.js';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const  charts = ['bar', 'line', 'area', 'pie', 'doughnut', 'polarArea', 'radar', 'scatter', 'bubble']

const StyledPaper = styled(Paper)(() => ({
    color: property.txtColor,
}));

const StyledListItem = styled(ListItem)(() => ({
'&:hover': {
    backgroundColor: property.mainColor,
    color: property.white
},
}));

export default function Chartlist({open, setOpen}) {

    return(
        <StyledPaper elevation={0}
            sx={{ height: '100%',
                width: '180px',
                backgroundColor: property.backColor,
                px: '15px',
                position:'absolute'}}>
        <List>
          {charts.map((text) => (
            <StyledPaper key={text}
                sx={{my: '10px'}}>
            <StyledListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </StyledListItem>
            </StyledPaper>
          ))}
        </List>
        </StyledPaper>
    )
}