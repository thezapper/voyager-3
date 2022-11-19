import React, { FunctionComponent, useEffect, useState } from 'react';
import * as engine from './babylonEngine';
import { UIPanel } from './levels/solarSystem/ui/UIPanel';

//interface Babylon_props { }

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
