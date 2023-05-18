import Topbar from '../layouts/topbar';
import Sidebar from '../layouts/sidebar';
import Mainview from '../layouts/mainview';
import { useState } from 'react';
import axios from 'axios'

export default function Mainpage() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])

  const url = 'http://localhost:8080/'
  

  axios.get(url).then((result)=>{
    setData([...result.data])
  })
  .catch(()=>{
    console.log('err')
  })

  console.log(data)
  return (
    <>
      <Topbar open={open} setOpen={setOpen}/>
      <Sidebar open={open} setOpen={setOpen} data={data}/>
      <Mainview open={open}/>
    </>
  );
};