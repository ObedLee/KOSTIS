import Topbar from './topbar';
import Sidebar from './sidebar';
import Mainview from './mainview';

import { useState } from 'react';


export default function Mainlayout() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Topbar open={open} setOpen={setOpen}/>
      <Sidebar open={open}/>
      <Mainview open={open}/>
    </>
  );
};