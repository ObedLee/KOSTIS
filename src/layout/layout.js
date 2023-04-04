import './App.css';
import Appbar from '../components/appbar';
import Sidebar from '../components/sidebar';
import Main from '../components/appbar';

import { useState } from 'react';

function App() {

  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <Appbar open={open} setOpen={setOpen}/>
      <Sidebar open={open} setOpen={setOpen}/>
      <Main/>
    </div>
  );
}

export default App;
