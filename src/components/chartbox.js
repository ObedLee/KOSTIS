import property from '../store/property';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// const StyledBox = styled(Box)(() => ({
//   display:'inline-flex',
//   flexGrow: 1,
//   margin: '0 10px 10px 10px',
//   flexShrink:1,
//   flexBasis: '400px'
// }))

const Chart = styled(Paper)(() => ({
    height: '240px',
    // width: '400px',
    textAlign: 'center',
    color: property.txtColor,
    borderRadius: property.borderRadius,
    backgroundColor: property.white
}));

export default function Chartbox() {
  return( 
    <Chart elevation={4}>
    </Chart>

  );
}