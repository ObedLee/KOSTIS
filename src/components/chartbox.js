import property from '../store/property';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledBox = styled(Box)(() => ({
  display:'inline-flex',
  flexGrow: 1,
  margin: '0 10px 10px 10px',
 // flexShrink:1,
 flexBasis: '400px'
}))

const Chart = styled(Paper)(() => ({
    height: '240px',
    //width: '400px',
    textAlign: 'center',
    color: property.txtColor,
    borderRadius: property.borderRadius,
}));

export default function Chartbox() {
  return( 
    <StyledBox>
          <Grid container spacing={{ xs: 1, md: 1}} columns={{ xs: 2, sm:4, md: 8, lg: 16}}>
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={2} sm={2} md={4} lg={8} key={index}>
              <Chart elevation={4}>
              </Chart>
            </Grid>
          ))}
        </Grid>
    </StyledBox>

  );
}