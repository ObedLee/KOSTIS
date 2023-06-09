import Topbar from '../layouts/topbar';
import Sidebar from '../layouts/sidebar';
import Mainview from '../layouts/mainview';
import { useState } from 'react';

export default function Mainpage() {

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(0)
  const [colors, setColor] = useState(['#F82'])
  const [shapes, setShape] = useState(['Bar'])
  const [datasets, setDatasets] = useState([])

  return (
    <>
      <Topbar open={open} setOpen={setOpen}/>
      <Sidebar year={year} setYear={setYear} colors={colors} shapes={shapes} open={open} setColor={setColor} setShape={setShape}  datasets={datasets} setDatasets={setDatasets} setOpen={setOpen}/>
      <Mainview year={year} setYear={setYear} colors={colors} shapes={shapes} datasets={datasets} setDatasets={setDatasets} setColor={setColor} setShape={setShape}/>
    </>
  );
};