import property from '../store/property.js';
import Kakaomap from '../components/kakaomap.js';
import Yearbar from '../components/yearbar.js';
import Chartbox from '../components/chartbox.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Main = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  justifyContent: 'space-evenly',
  textAlign: 'center',
  height: '100%',
  width: '100%',
  padding:'10px',
  marginTop: '70px',
  backgroundColor: property.backColor,
}));

export default function Mainview({open}){

  return(
      <Main container
        columns={{ xs: 2, sm: 4, md: 9 }}
        rowGap={{md:2, sm:1, xs:1}}
        columnSpacing={{md:2, sm:1, xs:1}}>
        <Grid item>
          <Box>
            <Kakaomap/>
            <Yearbar/>
          </Box>
        </Grid>
        {Array.from(Array(2)).map((_, index) => (
          <Grid item xs={2} sm={2} md={3}>
            <Chartbox/>
          </Grid>
        ))}


      </Main>
  )
}


