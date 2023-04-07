import Topbar from '../layouts/topbar';
import Sidebar from '../layouts/sidebar';
import Mainview from '../layouts/mainview';

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