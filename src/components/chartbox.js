import property from '../config/property';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter, Bubble } from "react-chartjs-2";

const StyledPaper = styled(Paper)(() => ({
    width: 'auto',
    textAlign: 'center',
    color: property.txtColor,
    borderRadius: property.borderRadius,
}));

export default function Chartbox({datasets, setDatasets, dataset, year, index, ex, colors, shapes, setColor, setShape, color, shape}) {

  const url = 'https://kostis-server.run.goorm.site/'

  const [lable, setLable] = useState([])
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
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
    let temp3 = []

    for (const key in sido.data){
      temp = [...temp, sido.data[key]]
      dataset && dataset.map((dt)=>{
        if (dt.C1_NM === sido.data[key] && dt.PRD_DE == year)
        {
          temp2 = [...temp2, dt.DT]

          let temp4 = {}
          temp4['x'] = dt.C1_NM
          temp4['y'] = dt.DT
          temp4['r'] = 8
          temp3 = [...temp3, temp4]
        }
      })
    }
    setLable(temp)
    setData(temp2)
    setData2(temp3)
    dataset&&setLegend(dataset[0].ITM_NM)


  }, [sido.data, dataset, year, color, shape])


  let chart =  {
    labels: lable,
    datasets: [
      { 
        label: legend,
        data: (shape==='Scatter'||shape==='Bubble')?data2:data,
        backgroundColor: color&&color!==[]&&color!==0&&color!==null&&color,
        borderWidth: 1,
        borderColor: color!==[]&&color!==0&&color!==null&&(shape==="Line"?color:"#FFF")
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: lable,
        offset: true,
    },
  }
}

  return( 
      <StyledPaper elevation={4}>
        <Box sx={{textAlign:'right', pb:'10px'}}>
          {!ex && (<><IconButton disableRipple={true} edge='end'>
            <ShareRoundedIcon fontSize="small"/>
          </IconButton>
          <IconButton disableRipple={true} edge='end'>
            <DownloadRoundedIcon fontSize="small"/>
          </IconButton>
          <IconButton disableRipple={true} onClick={()=>{
            let copy = [...datasets]
            copy.splice(index,1)
            setDatasets([...copy]) 
            
            let copy1 = [...colors]
            copy1.splice(index,1)
            setColor([...copy1])

            let copy2 = [...shapes]
            copy2.splice(index,1)
            setShape([...copy2])
 
          }}>
            <CloseRoundedIcon fontSize="small"/>
          </IconButton></>)}
            {(shape==='Bar')&&(<Bar data={chart}></Bar>)}
            {(shape==='Line')&&(<Line data={chart}></Line>)}
            {(shape==='Pie')&&(<Pie data={chart}></Pie>)}
            {(shape==='Doughnut')&&(<Doughnut data={chart}></Doughnut>)}
            {(shape==='PolarArea')&&(<PolarArea data={chart}></PolarArea>)}
            {(shape==='Radar')&&(<Radar data={chart}></Radar>)}
            {(shape==='Scatter')&&(<Scatter data={chart} options={options}></Scatter>)}
            {(shape==='Bubble')&&(<Bubble data={chart} options={options}></Bubble>)}
        </Box>
      </StyledPaper>
  );
}