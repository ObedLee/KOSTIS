import property from '../config/property.js';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


const  charts = ['bar', 'line','pie', 'doughnut', 'polarArea', 'radar', 'scatter', 'bubble']

const StyledPaper = styled(Paper)(() => ({
    color: property.txtColor,
}));

const StyledListItem = styled(ListItem)(() => ({
'&:hover': {
    // backgroundColor: property.mainColor,
    // color: property.white
    color: property.mainColor,
    border: '1.5px solid' + property.warnColor,

},
}));

export default function Chartlist({tempS, setTempS}) {

    return(
        <StyledPaper elevation={0}
            sx={{ height: '100%',
                width: '120px',
                backgroundColor: property.backColor,
                px: '15px',
                position:'absolute'}}>
        <List>
          {charts.map((text) => (
            <StyledPaper key={text} sx={{my: '10px'}}>
            <StyledListItem disablePadding>
              <ListItemButton sx={{py: '15px'}} onClick={()=>{
                setTempS(text)
                console.log(tempS)
              }}>
                <ListItemText primary={text} sx={{textAlign:'center'}}/>
              </ListItemButton>
            </StyledListItem>
            </StyledPaper>
          ))}
        </List>
        </StyledPaper>
    )
}