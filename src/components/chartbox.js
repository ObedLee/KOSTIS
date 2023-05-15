import property from '../config/property';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import IconButton from '@mui/material/IconButton';

import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


const StyledPaper = styled(Paper)(() => ({
    height: '240px',
    width: '100%',
    textAlign: 'center',
    color: property.txtColor,
    borderRadius: property.borderRadius,
}));

export default function Chartbox() {

  let data =  {
    labels: ['7-8', '8-9', '9-10', '10-11', '11-12', '17-18', '18-19', '19-20' ],
    datasets: [
      {
        type: 'bar',
        label: '탑승인원',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [1,2,3,4,5],
        borderColor: 'red',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: '하차인원',
        backgroundColor: 'rgb(75, 192, 192)',
        data: [1,2,3,4,5],
      },
    ],
  };

  return( 
      <StyledPaper elevation={4}>
        <Box sx={{textAlign:'right'}}>
          <IconButton disableRipple='true' edge='end'>
            <ShareRoundedIcon fontSize="small"/>
          </IconButton>
          <IconButton disableRipple='true'>
            <DownloadRoundedIcon fontSize="small"/>
          </IconButton>
            <Line type="line" data={data} />
        </Box>
      </StyledPaper>

  );
}