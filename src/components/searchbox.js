
import property from '../config/property';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Drawer from '@mui/material/Drawer';
import { useState } from "react";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(property.white, 0.7),
  borderRadius: '30px',
  '&:hover': {
    backgroundColor: alpha(property.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: '30px',
    [theme.breakpoints.up('sm')]: {
      width: '17ch',
      '&:focus': {
        width: '33ch',
        border:`1px solid ${property.warnColor}`
        
      },
    }
}}));

const SearchDrawer = styled(Drawer)((theme) => ({
    zIndex: 1099,
    flexShrink: 1,
    '& .MuiDrawer-paper': {
      width: '41ch',
      height: '100vh',
      boxSizing: 'border-box',
      background: property.backColor,
      color: property.txtColor,
    }
}))

export default function Searchbar(){

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return(
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
     </Search>
    <SearchDrawer
      anchor='top'
      open={open}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
    >
    이건우
    </SearchDrawer>
    </>
 
  )

}
