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
import Legendlist from '../components/legendlist'
import { SwatchesPicker } from 'react-color';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomBox = styled(Box)(() => ({
  width:'100%',
  height:'100%', 
  display:'flex', 
  flexWrap: 'wrap', 
  flexDirection:'column',
  justifyContent: 'space-between'
}));


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Test
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="chart-title"
        fullWidth='true'
        maxWidth='lg'
        fullScreen={fullScreen}
        TransitionComponent={Transition}
      >
        <Chartlist/>
        <DialogTitle id="chart-title" sx={{textAlign: 'center', marginLeft: '210px'}}>
          {'통계 데이터 이름'}
        </DialogTitle>
        <DialogContent sx={{height:'70vh',  marginLeft: '210px', display:'flex', px:2}}>
          <Legendlist/>
          <CustomBox>
            <Chartbox />
            <SwatchesPicker height='auto' width='100%'/>
          </CustomBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose} autoFocus>
            적용
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}