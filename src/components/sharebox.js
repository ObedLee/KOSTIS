import kakao from '../assets/images/kakaotalk.png'
import instagram from '../assets/images/instagram.png'
import facebook from '../assets/images/facebook.png'
import linked from '../assets/images/linked.png'
import property from '../store/property';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const snsList = [
  {
    img: kakao,
    title: '카카오톡'
  },
  {
    img: instagram,
    title: '인스타그램'
  },
  {
    img: facebook,
    title: '페이스북'
  },
  {
    img: linked,
    title: '링크복사'
  },
]

function ShareDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={'xs'}>
      <DialogTitle color={property.txtColor} sx={{m:'0', pb:0}}>Share</DialogTitle>
      <ImageList cols={4} sx={{margin:'10px'}} >
      {snsList.map((item) => ( 
        <ListItemButton 
          onClick={() => handleListItemClick(item.title)}
          key={item.title}
          sx={{justifyContent:"center"}} >
          <ImageListItem key={item.img} sx={{width:'40px'}} >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        </ListItemButton>
      ))}
    </ImageList>
    </Dialog>
  );
}

Sharebox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Sharebox() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(snsList[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button variant="contained"
        onClick={handleClickOpen}
        disableElevation
        sx={{ml:'10px',backgroundColor:property.mainColor}}>
        Share
      </Button>
      <ShareDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}