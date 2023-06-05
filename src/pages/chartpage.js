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
import { useState} from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomBox = styled(Box)(() => ({
  width:'58%',
  height:'auto', 
  display:'flex', 
  flexWrap: 'wrap', 
  flexDirection:'column',
  justifyContent: 'space-between',
  margin: 'auto'
}));

const CustomBox2 = styled(Box)(() => ({
  width:'100%',
  height:'auto', 
  display:'flex', 
  flexWrap: 'wrap', 
  flexDirection:'column',
  justifyContent: 'space-between',

}));



export default function Chartpage({open, setOpen, name, setDatasets, datasets, dataset, year, setYear, setColor, setShape, colors, shapes}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [tempC, setTempC] = useState()
  const [tempS, setTempS] = useState()

  const handleChangeComplete = color => {
    setTempC(color.hex);

  };

  const handleClose = () => {
    const copy = [...datasets, dataset]
    setDatasets([...copy])
    const copy2 = [...colors, tempC]
    setColor([...copy2])
    const copy3 = [...shapes, tempS]
    setShape([...copy3])
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
        <Chartlist tempS={tempS} setTempS={setTempS}/>
        <DialogTitle id="chart-title" sx={{textAlign: 'center', marginLeft: '155px'}}>
          {name}
        </DialogTitle>
        <DialogContent sx={{height:'70vh',  marginLeft: '155px', display:'flex', px:2}}>
        <CustomBox2>
          <CustomBox>
            <Chartbox ex={true} year={year} dataset={dataset} shape={tempS} color={tempC}/>
            <Yearbar setYear={setYear}/>
          </CustomBox>
          <Box sx={{height:'24%', margin:'auto'}}>
            <SwatchesPicker height="100%" width="100%" onChangeComplete={handleChangeComplete}/>
          </Box>
        </CustomBox2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose} autoFocus>
            적용
          </Button>
        </DialogActions>
      </Dialog>
  );
}