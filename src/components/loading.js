import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Load = styled(Box)(({ theme }) => ({
    width: "400px", 
    height: "680px", 
    marginRight:'10px',
    position:'absolute'
  }));

export default function CircularIndeterminate() {
  return (
    <Load>
      <CircularProgress />
    </Load>
  );
}