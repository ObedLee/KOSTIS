import property from '../property.js';
import Kakaomap from '../components/kakaomap.js';
import Yearbar from '../components/yearbar.js';
import Chartbox from '../components/chartbox.js';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const Main = styled('div')(({ theme }) => ({
  position: 'relative',
  display:'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  height: '100%',
  padding:'10px',
  backgroundColor: property.backColor,
}));

export default function Mainview({open}){

  return(
      <Main>
          <Box>
            <Kakaomap/>
            <Yearbar/>
          </Box>
          <Chartbox/>
      </Main>
  )
}


