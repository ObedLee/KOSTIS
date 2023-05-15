import property from '../config/property.js';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const  legends= ['data1', 'data2', 'data3', 'data4', 'data5']

const StyledPaper = styled(Paper)(() => ({
    color: property.txtColor
}));

const StyledListItem = styled(ListItem)(() => ({
    padding: 0,
    '&:hover': {
        border:`1px solid ${property.warnColor}`,
        backgroundColor: property.white
},
}));

export default function Legendlist({open, setOpen}) {

    return(
        <StyledPaper elevation={0}
            sx={{width: '180px',
                mr: '20px'}}>
        <List>
          {legends.map((text) => (
            <StyledPaper key={text}
                sx={{mb: '10px'}}>
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