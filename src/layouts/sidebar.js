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
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import Chartpage from '../pages/chartpage.js';

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
  
  const StyledListPaper = styled(Paper)(() => ({
    margin:'10px',
    color: property.txtColor,
    borderRadius: property.borderRadius,
    '&:hover': {
      //border: '1.5px solid' + property.warnColor,
      color: property.mainColor,

    },
  }));


  function Datalist({data, year, setYear, setColor, setShape, colors, shapes, datasets, setDatasets}){

    const [show, setShow] = useState(false)

    return(
      <>
      <StyledListPaper key={data.name} elevation={1}>
        <ListItem disablePadding >
          <ListItemButton  disableRipple={true} onClick={() => setShow(!show)}>
            <ListItemText>
              <Typography sx={{ fontWeight: "600" }}>{data.name}</Typography>
            </ListItemText>
            <ListItemIcon>
              <KeyboardArrowDownRoundedIcon sx={{ml:"auto"}}/>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {

        data.sub && show ? <List sx={{p:0, pb:'2px'}}> {data.sub.map((dt, i) => (
            <SubDatalist data={dt} setColor={setColor} setShape={setShape} colors={colors} shapes={shapes} setYear={setYear} year={year} datasets={datasets} setDatasets={setDatasets} key={i}/>
          ))} </List> : null

        }

      </StyledListPaper>


      </>

    )
  }

  function SubDatalist({data, year, setYear, setColor, setShape, colors, shapes, datasets, setDatasets}){
    
    const [show, setShow] = useState(false)

    return(
      <>
      <StyledListPaper key={data.sub_name}  elevation={1}>
        <ListItem disablePadding>
          <ListItemButton  disableRipple={true} onClick={() => setShow(!show)}>
            <ListItemText>
            <Typography sx={{ fontSize: "0.9rem" }}>{data.sub_name}</Typography>
            </ListItemText>
            <ListItemIcon>
              <KeyboardArrowDownRoundedIcon sx={{ml:"auto"}}/>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {

          data.list && show ? <List  sx={{p:0, pb:'2px'}}> {data.list.map((dt, i) => (
              <ListDatalist data={dt} setColor={setColor} setShape={setShape} colors={colors} shapes={shapes} year={year} setYear={setYear} datasets={datasets} setDatasets={setDatasets} key={i}/>
            ))} </List> : null

        }
      </StyledListPaper>
      </>

    )
  }

  function ListDatalist({data, year, setYear, setColor, setShape, colors, shapes, datasets, setDatasets}){

    const [show, setShow] = useState(false)

    return(
      <>
      <StyledListPaper key={data.list_name}  elevation={1}>
        <ListItem disablePadding>
          <ListItemButton  disableRipple={true} onClick={() => setShow(!show)} >
          <ListItemText>
            <Typography sx={{ fontSize: "0.85rem" }}>{data.list_name}</Typography>
            </ListItemText>
            <ListItemIcon>
              <KeyboardArrowDownRoundedIcon sx={{ml:"auto"}}/>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {

          data.res && show ? <List sx={{p:0, pb:'2px'}}> {data.res.map((dt, i) => (
              <ResDatalist data={dt} setColor={setColor} setShape={setShape} colors={colors} shapes={shapes} year={year} setYear={setYear} datasets={datasets} setDatasets={setDatasets} key={i}/>
            ))} </List> : null

        }
      </StyledListPaper>

      </>

    )
  }

  function ResDatalist({data, year, setYear, setColor, setShape, colors, shapes, datasets, setDatasets}){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const url = 'https://kostis-server.run.goorm.site:3000/'

    let res = useQuery(['res'], ()=>
    axios.get(url+encodeURIComponent(data.res_name)).then((result)=>{
      return result.data
    }))


    let dataset = useQuery(['dataset'], ()=>
    axios.get(url+'pop').then((result)=>{
      return result.data
    })
    )

    
    return(
      <>
      <StyledListPaper key={data.res_name} >
        <ListItem disablePadding>
          <ListItemButton disableRipple={true}
          onClick={handleClickOpen}
          >
          <ListItemText>
            <Typography sx={{ fontSize: "0.8rem" }}>{data.res_name}</Typography>
            </ListItemText>
            <ListItemIcon>
              <KeyboardArrowDownRoundedIcon sx={{ml:"auto"}}/>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </StyledListPaper>
      <Chartpage open={open} setOpen={setOpen}
                year={year} setYear={setYear} colors={colors}
                shapes={shapes} setColor={setColor} setShape={setShape} 
                dataset={dataset.data} name={data.res_name} datasets={datasets} setDatasets={setDatasets}/>
      </>

    )
  }


export default function Sidebar({open, setOpen, year, setYear, setColor, setShape, colors, shapes, datasets, setDatasets}) {

  const url = 'https://kostis-server.run.goorm.site:3000/'

  let list = useQuery(['list'], ()=>
    axios.get(url).then((result)=>{
      return result.data
    }))
    
    return(
      <StyledDrawer
        anchor="left"
        open={open}>
      <ClickAwayListener onClickAway={()=>setOpen(false)}>
        <StyledPaper elevation={0} sx={{height:'auto'}}>
        <DrawerHeader>
        <EqualizerRoundedIcon sx={{ml: '10px', mt:"auto", fontSize: 40, color:property.mainColor}}/>
          <Typography variant="h6" noWrap component="div" sx={{ml:'10px', mr:'auto', mt:"auto", fontSize:22}}>
            KOSTIS
          </Typography>
        </DrawerHeader>
        <List>
         {list.data&&list.data.map((dt, i) => (
            <Datalist data={dt} year={year} setColor={setColor} setYear={setYear} colors={colors} shapes={shapes} datasets={datasets} setDatasets={setDatasets} setShape={setShape} key={i}/>
          ))}
        </List>
        </StyledPaper>
        </ClickAwayListener>
      </StyledDrawer>
    )
}