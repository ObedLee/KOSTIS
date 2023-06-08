import property from '../config/property.js';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import RadarRoundedIcon from '@mui/icons-material/RadarRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';



const  charts = ['bar', 'line','pie', 'doughnut', 'polarArea', 'radar', 'scatter', 'bubble']

const StyledPaper = styled(Paper)(() => ({
    color: property.txtColor,
}));

const StyledListItem = styled(ListItem)(() => ({
borderRadius: 4,
'&:hover': {
    // backgroundColor: property.mainColor,
    // color: property.white
    // color: property.mainColor,
    border: '2px solid' + property.warnColor,
    borderRadius:'15px'

},
}));

export default function Chartlist({setTempS}) {

    return(
        <StyledPaper elevation={0}
            sx={{ height: '100%',
                width: '160px',
                backgroundColor: property.backColor,
                px: '15px',
                position:'absolute'}}>
        <List>
          { charts.map((text, i) => (
            
            <StyledPaper elevation={1} key={text} sx={{my: '10px',borderRadius: 4}}>
            <StyledListItem disablePadding>
              <ListItemButton sx={{py: '20px'}} onClick={()=>{
                setTempS(text)
              }}>
              <ListItemIcon sx={{color:property.mainColor}}>
                {(i===0)&&(<LeaderboardRoundedIcon></LeaderboardRoundedIcon>)}
                {(i===1)&&(<ShowChartRoundedIcon></ShowChartRoundedIcon>)}
                {(i===2)&&(<PieChartRoundedIcon></PieChartRoundedIcon>)}
                {(i===3)&&(<DonutLargeRoundedIcon></DonutLargeRoundedIcon>)}
                {(i===4)&&(<RadarRoundedIcon></RadarRoundedIcon>)}
                {(i===5)&&(<HubRoundedIcon></HubRoundedIcon>)}
                {(i===6)&&(<ScatterPlotRoundedIcon></ScatterPlotRoundedIcon>)}
                {(i===7)&&(<BubbleChartRoundedIcon></BubbleChartRoundedIcon>)}
              </ListItemIcon>
                <ListItemText primary={text} sx={{textAlign:'center'}}/>
              </ListItemButton>
            </StyledListItem>
            </StyledPaper>
          ))}
        </List>
        </StyledPaper>
    )
}