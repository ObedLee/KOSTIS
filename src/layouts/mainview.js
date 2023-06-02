import property from '../config/property.js';
import Kakaomap from '../components/kakaomap.js';
import Yearbar from '../components/yearbar.js';
import Chartbox from '../components/chartbox.js';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useState, useEffect } from 'react';

const Main = styled('div')(({ theme }) => ({
  position: 'relative',
  display:'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  height: '100%',
  padding:'10px',
  marginTop: '70px',
  backgroundColor: property.backColor,
}));

const StyledBox = styled(Box)(() => ({
  display:'flex',
  flexGrow: 1,
  margin: '0 10px 10px 10px',
 // flexShrink:1,
 flexBasis: '400px'
}))


export default function Mainview(){

  const url = 'http://localhost:8080/'

  const [year, setYear] = useState(0)
  const [datasets, setDatasets] = useState([])


  let pop = useQuery(['pop'], ()=>
    axios.get(url+'pop').then((result)=>{
      return result.data
    })
    )

  useEffect(()=>{
    setDatasets([pop.data])
  }, [])

  
  return(
      <Main>
          <Box>
            <Kakaomap/>
            <Yearbar year={year} setYear={setYear}/>
          </Box>
          <StyledBox>
          <Grid container spacing={{ xs: 1, md: 1}} columns={{ xs: 2, sm:4, md: 8, lg: 16}}>
          {datasets&&datasets!=0&&datasets.map((data, index) => (

            <Grid item xs={2} sm={2} md={7} lg={8} key={index}>
              <Chartbox datasets={datasets} setDatasets={setDatasets} dataset={data} year={year} index={index}/>
            </Grid>
          ))}
        </Grid>
    </StyledBox>
      </Main>
  )
}


