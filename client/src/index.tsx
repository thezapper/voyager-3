import "./styles.css";

import React, { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';

//import { ThreeRenderer } from './components/three/threeRenderer';
import { Babylon } from './components/babylon/babylon';

import {EventEmitter} from 'events';

export const ee = new EventEmitter();
ee.on('message', function (text) 
{
  console.log("EE> ", text)
})

// This is the main landing page, optionally select renderers here
const MainApp: FunctionComponent = () =>
{
  // useEffect( () => 
  // {
    
  // },[])

  return (
    <>
      {/* <ThreeRenderer planets={planets} curPlanet={currentPlanet} /> */}
      <Babylon />
    </>
  );
}

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<MainApp />);