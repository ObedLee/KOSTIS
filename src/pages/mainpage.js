import Topbar from '../layouts/topbar';
import Sidebar from '../layouts/sidebar';
import Mainview from '../layouts/mainview';

import { useState } from 'react';


export default function Mainpage() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Topbar open={open} setOpen={setOpen}/>
      <Sidebar open={open} setOpen={setOpen}/>
      <Mainview open={open}/>
    </>
  );
};