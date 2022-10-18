import React, { FunctionComponent, useEffect } from 'react';
import * as engine from './babylonEngine';
//import * as vRec from './videoRecorder'
//import { Placeholder } from './placeholder'

//interface Babylon_props { }

export const Babylon: FunctionComponent = () =>
{
  navigator.mediaDevices.enumerateDevices()
    .then((device) =>
    {
      console.dir(device);
    });

  useEffect(() => 
  {
    console.log("Creating Babylon component....");

    const canvas = document.getElementById("BblCanvas") as HTMLCanvasElement;
    engine.createScene(canvas);

    //let canvas2 = document.getElementById("renderTarget") as HTMLCanvasElement;
    //engine.setCanvas(canvas2);

    //vRec.startRecording(canvas2);

    //engine.loadModel("Hello");
    return () =>
    {
      console.log("Destroying Babylon component...");
    };

  }, []);

  const width = document.body.clientWidth; //document.width is obsolete
  const height = document.body.clientHeight;
  return (
    <>
      <canvas id="BblCanvas" width={width} height={height}></canvas>
    </>
  )
}
