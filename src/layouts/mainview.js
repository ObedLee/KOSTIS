import property from '../config/property.js';
import Kakaomap from '../components/kakaomap.js';
import Yearbar from '../components/yearbar.js';
import Chartbox from '../components/chartbox.js';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import {  useEffect } from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


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


export default function Mainview({year, setYear, colors, shapes, datasets,  setDatasets, setColor, setShape}){

  const url = 'https://kostis-server.run.goorm.site/'

  let pop = useQuery(['pop'], ()=>
    axios.get(url+'pop').then((result)=>{
      return result.data
    })
    )

  useEffect(()=>{
    setDatasets([pop.data])
  }, [pop.data])

  const onDragEnd = (res) => {

    if (res == null || res.source === null || res.destination === null) return
    
    const sourceOrderNo = res.source.index;
    const destinationOrderNo = res.destination.index;

    let copy = [...datasets]
    const temp = copy[sourceOrderNo]
    copy[sourceOrderNo]= copy[destinationOrderNo]
    copy[destinationOrderNo] = temp
    setDatasets([...copy]) 

    let copy1 = [...colors]
    const temp1 = copy1[sourceOrderNo]
    copy1[sourceOrderNo]= copy1[destinationOrderNo]
    copy1[destinationOrderNo] = temp1
    setColor([...copy1])

    let copy2 = [...shapes]
    const temp2 = copy2[sourceOrderNo]
    copy2[sourceOrderNo]= copy2[destinationOrderNo]
    copy2[destinationOrderNo] = temp2
    setShape([...copy2])

  }

  return(
    <Main>
      <Box>
        <Kakaomap/>
        <Yearbar setYear={setYear}/>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="chart">
          {provided =>  (
      <StyledBox ref={provided.innerRef} {...provided.droppableProps} className="chartbox-wrap">
        <Grid container spacing={{ xs: 1, md: 1}} columns={{ xs: 2, sm:4, md: 8, lg: 16}}>
          {datasets&&datasets !== 0&&datasets.map((data, i) => (
            <Draggable draggableId={String(i)} index={i} key={i}>
            {provided =>
              <Grid item xs={2} sm={2} md={7} lg={8} key={i} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <Chartbox key={i} id={i} datasets={datasets} setDatasets={setDatasets} dataset={data} year={year} color={colors[i]} shape={shapes[i]} setColor={setColor} setShape={setShape} index={i} colors={colors} shapes={shapes} ex={false}/>
              </Grid>}
            </Draggable>
        ))}
      </Grid>
      {provided.placeholder}
      </StyledBox>
      )}
    </Droppable>
  </DragDropContext>

    </Main>

  )
}


