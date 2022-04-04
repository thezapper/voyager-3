import React, { FunctionComponent, useEffect, useState } from 'react';
import * as engine from './engine';
//import * as vRec from './videoRecorder'
//import { Placeholder } from './placeholder'

interface Babylon_props { }

export const Babylon: FunctionComponent<Babylon_props> = (props) =>
{
    navigator.mediaDevices.enumerateDevices()
        .then((device) =>
        {
            console.dir(device);
        });

    useEffect(() => 
    {
        console.log("Creating Babylon component....");

        let canvas = document.getElementById("BblCanvas") as HTMLCanvasElement;
        engine.createScene(canvas);

        //let canvas2 = document.getElementById("renderTarget") as HTMLCanvasElement;
        //engine.setCanvas(canvas2);

        //vRec.startRecording(canvas2);

        //engine.loadModel("Hello");
        return () =>
        {
            console.log("Destroying Babylon component...");
        };

    });

    return (
        <>
            <canvas id="BblCanvas" width="1920" height="720"></canvas>
        </>
    )
}
