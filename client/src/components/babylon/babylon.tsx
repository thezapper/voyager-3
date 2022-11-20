import React, { FunctionComponent, useEffect, useState } from 'react';
import * as engine from './babylonEngine';
import { UIPanel } from './levels/solarSystem/ui/UIPanel';

//interface Babylon_props { }

// This component is intended to be a fully enclosed Babylon React component.  However, unlike 
// react-three-fiber which converts every three object into a React component here I'm keeping
// the Babylon code as pure typescript.  This means if I want to switch React for another library
// (Vue, Svelte, Solid etc.) I don't need to rewrite all the Babylon related code, just the small
// React wrapper.
export const Babylon: FunctionComponent = () =>
{
  // navigator.mediaDevices.enumerateDevices()
  //   .then((device) =>
  //   {
  //     console.dir(device);
  //   });
  const[planets, setPlanets] = useState([]);
  
  const uiLayerNotification = (data: object) =>
  {
    console.log("Callback ", data)
    setPlanets(data as any)
  };

  useEffect(() => 
  {
    console.log("Creating Babylon component....");

    const canvas = document.getElementById("BblCanvas") as HTMLCanvasElement;
    
    engine.createScene(canvas, uiLayerNotification);

    return () =>
    {
      console.log("Destroying Babylon component...");
    };

  }, []);


  const width = document.body.clientWidth; //document.width is obsolete
  const height = document.body.clientHeight;
  return (
    <>
      <UIPanel planets={planets} curPlanet={'none'} />

      <canvas id="BblCanvas" width={width} height={height}></canvas>
    </>
  )
}
