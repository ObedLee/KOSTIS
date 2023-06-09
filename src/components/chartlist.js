import property from '../config/property.js';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const  charts = ['Bar', 'Line','Pie', 'Doughnut', 'PolarArea', 'Radar', 'Scatter', 'Bubble']

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop:'10px',
  paddingBottom:'0',
  // necessary for content to be below app bar

  justifyContent: 'flex-end',
}));


export default function Chartlist({open, setOpen, setTempS}) {

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClickClose = () => {
    setOpen(false);
  };

    return(
      <>
      <Toolbar sx={{position:'fixed'}}>
      <IconButton color="inherit"
        aria-label="open drawer"
        onClick={open?handleClickClose:handleClickOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      </Toolbar>
      {open&&<StyledPaper elevation={0}
            sx={{ height: '100%',
                width: '160px',
                backgroundColor: property.backColor,
                px: '15px',
                position:'absolute'}}>

          <DrawerHeader>
            <IconButton onClick={open?handleClickClose:handleClickOpen}>
                <ChevronLeftIcon/>  
              </IconButton>
          </DrawerHeader>

        <List>
          { charts.map((text, i) => (
            
            <StyledPaper elevation={1} key={text} sx={{my: '10px',borderRadius: 4}} open={open}>
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
        </StyledPaper>}
        </>
    )
}