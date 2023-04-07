import property from '../store/property';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledBox = styled(Box)(({ theme }) => ({
  display:'flex',
  flexGrow: 1,
  //flexShrink:1,
 //flexBasis: '400px'
}));

const Chart = styled(Paper)(({ theme }) => ({
    height: '240px',
    //width: '400px',
    textAlign: 'center',
    color: property.txtColor,
    borderRadius: property.borderRadius,
}));

export default function Chartbox() {
  return( 
    <StyledBox>
          <Grid container spacing={{ xs: 1, md: 1}} columns={{ xs: 2, sm:4, md: 12}}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={6} key={index}>
              <Chart elevation={4}> + </Chart>
            </Grid>
          ))}
        </Grid>
    </StyledBox>

  );
}