import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider';
import { Paper } from '@mui/material';
import property from '../property';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '400px',
  textAlign: 'center',
  padding: '8px 20px 0px 20px',
  marginTop: '10px',
  color: property.txtColor,
}));

const StyledSlider = styled(Slider)({
  color: property.mainColor,
  zIndex: 1,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: property.white,
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 44,
    height: 44,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: property.mainColor,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

function valueLabelFormat(value) {
  return `${value}년`;
}

export default function Yearbar() {

  let now = new Date();
  let minYear = 2000
  let maxYear = now.getFullYear() - 1;

  return (
    <StyledPaper elevation={4} >
      <StyledSlider
        valueLabelDisplay="on"
        aria-label="Yearbar"
        valueLabelFormat={valueLabelFormat}
        defaultValue={maxYear}
        min={minYear}
        max={maxYear}
        step={1}
      />
    </StyledPaper>
  );
}