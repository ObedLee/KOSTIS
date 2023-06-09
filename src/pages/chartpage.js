import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Chartlist from '../components/chartlist'
import Chartbox from '../components/chartbox';
import { SwatchesPicker } from 'react-color';
import { styled } from '@mui/material/styles';
import Yearbar from '../components/yearbar.js';
import { useState, useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomBox = styled(Box,{ shouldForwardProp: (prop) => prop !== 'fullScreen' })(
  ({ fullScreen }) => ({
  width:'60vw',
  height:'78vh', 
  display:'flex', 
  flexWrap: 'no-wrap', 
  flexDirection:'column',
  ...(fullScreen && {
    height:'auto',
    width:'100%',
  }),

}));

const CustomBox2 = styled(Box,{ shouldForwardProp: (prop) => prop !== 'fullScreen' })(
  ({ fullScreen }) => ({
  width:'100%',
  height:'100%', 
  display:'flex', 
  flexWrap: 'no-wrap', 
  marginLeft:'40px',
  ...(fullScreen && {
    flexDirection:'column',
  }),

}));


export default function Chartpage({open, setOpen, name, setDatasets, datasets, dataset, year, setYear, setColor, setShape, colors, shapes}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [tempC, setTempC] = useState(null)
  const [tempS, setTempS] = useState('Bar')
  const [open1, setOpen1] = useState(true);

  useEffect(()=>{
    fullScreen&&setOpen1(false)
    !fullScreen&&setOpen1(true)
  },[fullScreen])

  const handleChangeComplete = color => {
    if (tempC !== null){
      const copy = [color.hex, ...tempC]
      setTempC(copy);
    }
    else{
      setTempC([color.hex])
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTempC(null)
    setTempS()
  };

  const handleReset = () => {
    setTempC(null)
  };


  const handleClose2 = () => {
    const copy = [...datasets, dataset]
    setDatasets([...copy])
    const copy2 = [...colors, tempC]
    setColor([...copy2])
    const copy3 = [...shapes, tempS]
    setShape([...copy3])
    setTempC(null)
    setTempS()
    setOpen(false);
  };


  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="chart-title"
        fullWidth='true'
        maxWidth='xl'
        fullScreen={fullScreen}
        TransitionComponent={Transition}
      >
        <Chartlist setTempS={setTempS} open={open1} setOpen={setOpen1}/>
       {open1&&<DialogTitle id="chart-title" sx={{textAlign: 'center', marginLeft: '150px'}}>
          {name}
        </DialogTitle>}
        {!open1&&<DialogTitle id="chart-title" sx={{textAlign: 'center'}}>
          {name}
        </DialogTitle>}
        {open1&&<DialogContent sx={{height:'auto',  marginLeft: '150px',display:'flex', px:2}}>
        <CustomBox2 fullScreen={fullScreen}>
          <CustomBox fullScreen={fullScreen}>
            <Chartbox ex={true} year={year} dataset={dataset} shape={tempS} color={tempC}/>
            <Yearbar setYear={setYear}/>
          </CustomBox>
          {fullScreen&&<Box sx={{height:'100%'}}>
            <SwatchesPicker height="100%" width="100%" onChangeComplete={handleChangeComplete}/>
          </Box>}
          {!fullScreen&&<Box sx={{height:'100%', marginLeft:'15px'}}>
            <SwatchesPicker height="100%" width="100%" onChangeComplete={handleChangeComplete}/>
          </Box>}
        </CustomBox2>
        </DialogContent>}
        {!open1&&<DialogContent sx={{height:'auto', display:'flex', px:2}}>
        <CustomBox2 fullScreen={fullScreen}>
          <CustomBox fullScreen={fullScreen}>
            <Chartbox ex={true} year={year} dataset={dataset} shape={tempS} color={tempC}/>
            <Yearbar setYear={setYear}/>
          </CustomBox>
          {fullScreen&&<Box sx={{height:'100%'}}>
            <SwatchesPicker height="100%" width="100%" onChangeComplete={handleChangeComplete}/>
          </Box>}
          {!fullScreen&&<Box sx={{height:'100%', marginLeft:'15px'}}>
            <SwatchesPicker height="100%" width="100%" onChangeComplete={handleChangeComplete}/>
          </Box>}
        </CustomBox2>
        </DialogContent>}
        <DialogActions>
          <Button variant="outlined" onClick={handleReset}>색상 초기화</Button>
          <Button variant="contained" onClick={handleClose}>취소</Button>
          <Button variant="contained" onClick={handleClose2} autoFocus>
            추가
          </Button>
        </DialogActions>
      </Dialog>
  );
}