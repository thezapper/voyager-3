import React, { FunctionComponent, useEffect, useState } from 'react';
import * as engine from './babylonEngine';
import { LEVEL }   from './levels/level';
import { SpaceUI } from './levels/solarSystem/ui/SpaceUI';
import { DinoUI }  from './levels/dino/ui/DinoUI';
//interface Babylon_props { }

// This component is intended to be a fully enclosed Babylon React component.  However, unlike 
// react-three-fiber which converts every three object into a React component here I'm keeping
// the Babylon code as pure typescript.  This means if I want to switch React for another library
// (Vue, Svelte, Solid etc.) I don't need to rewrite all the Babylon related code, just the 
// React wrapper.
// Initially the comms between UI and "backend" i.e. Babylon was going to be a callback mechanism
// passed to the engine, but this is difficult to manage a flexible way so I switched to the event 
// system.
export const Babylon: FunctionComponent = () =>
{
  // const[planets, setPlanets] = useState([]);
  const[currentLevel, setLevel] = useState(LEVEL.SPACE);
  
  // const uiLayerNotification = (data: object) =>
  // {
  //   console.log("Callback ", data)
  //   // setPlanets(data as any)
  // };

  useEffect(() => 
  {
    console.log("Creating Babylon component....");

    const canvas = document.getElementById("BblCanvas") as HTMLCanvasElement;
    
    engine.createScene(canvas);

    return () =>
    {
      console.log("Destroying Babylon component...");
    };

  }, []);


  let currentUi: React.ReactElement;

  switch (currentLevel) 
  {
    case LEVEL.SPACE:
      currentUi = <SpaceUI />;
      break;
    case LEVEL.DINOS:
      currentUi = <DinoUI />;
      break;
  }

  const width = document.body.clientWidth; //document.width is obsolete
  const height = document.body.clientHeight;
  return (
    <>
      {currentUi}

      <canvas id="BblCanvas" width={width} height={height}></canvas>
    </>
  )
}
