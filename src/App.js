import { useState, useEffect } from 'react';
import './App.css';
import AddColor from './components/addColor';
import ColorGrids from './components/colorGrids';
import {GlobalProvider} from './Context/colorContext';

const App = ()=> {

  return (
    <GlobalProvider>
      <AddColor />
      <ColorGrids />
    </GlobalProvider>
  );
}

export default App;
