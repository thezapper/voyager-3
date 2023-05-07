import "./styles.css";


//import React, { FunctionComponent, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

//import { ThreeRenderer } from './components/three/threeRenderer';
import Babylon  from './components/babylon/babylon';
import React from "react";

import {EventEmitter} from 'events';
export const ee = new EventEmitter();
ee.setMaxListeners(20);
// ee.on('message', function (text) 
// {
//   console.log("EE> ", text)
// })

// This is the main landing page, optionally select renderers here
// const MainApp: FunctionComponent = () =>
// {
//   useEffect( () => 
//   {
//     console.log("Create root")
//   }, [])

//   return (
//     <>
//       {/* <ThreeRenderer planets={planets} curPlanet={currentPlanet} /> */}
//       <Babylon />
//     </>
//   );
// }

//ReactDOM.createRoot(document.querySelector("#app")).render(<p>A</p>);
//createRoot(document.getElementById('container')).render(<Babylon />);
const container = document.getElementById('container');
const root = createRoot(container);
root.render(<Babylon />);