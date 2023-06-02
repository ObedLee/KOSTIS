import property from '../config/property';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const StyledPaper = styled(Paper)(() => ({
    width: '100%',
    textAlign: 'center',
    color: property.txtColor,
    borderRadius: property.borderRadius,
}));

export default function Chartbox({datasets, setDatasets, dataset, year, index}) {

  const url = 'http://localhost:8080/'

  const [lable, setLable] = useState([])
  const [data, setData] = useState([])
  const [legend, setLegend] = useState([])

  let sido = useQuery(['sido'], ()=>
    axios.get(url+'maps').then((result)=>{
    const temp = {}
    result.data.map((d, i)=>{
        temp[d.id] = d.name
    })
    return temp
  }))

  useEffect(()=>{
    let temp = []
    let temp2 = []
    for (const key in sido.data){
      temp = [...temp, sido.data[key]]
      dataset && dataset.map((dt, i)=>{
        if (dt.C1_NM === sido.data[key] && dt.PRD_DE == year)
          temp2 = [...temp2, dt.DT]
      })
    }
    setLable(temp)
    setData(temp2)
    setLegend(dataset[0].ITM_NM)
  
  
  }, [sido.data, dataset, year])


  let chart =  {
    labels: lable,
    datasets: [
      { 
        label: legend,
        type: 'bar',
        backgroundColor: 'red',
        data: data,
        borderWidth: 0,
      },
    ],
  };

  return( 
      <StyledPaper elevation={4}>
        <Box sx={{textAlign:'right'}}>
          <IconButton disableRipple={true} edge='end'>
            <ShareRoundedIcon fontSize="small"/>
          </IconButton>
          <IconButton disableRipple={true} edge='end'>
            <DownloadRoundedIcon fontSize="small"/>
          </IconButton>
          <IconButton disableRipple={true} onClick={()=>{
            let copy = [...datasets]
            copy.splice(index,1)
            setDatasets(copy)  
          }}>
            <CloseRoundedIcon fontSize="small"/>
          </IconButton>
            <Line type="line" data={chart} />
        </Box>
      </StyledPaper>

  );
}