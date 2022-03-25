import React, { FunctionComponent, useEffect, useState } from 'react';
import * as THREE from './three';

interface Three_props { }

export const Babylon: FunctionComponent<Three_props> = (props) =>
{
    navigator.mediaDevices.enumerateDevices()
        .then((device) =>
        {
            console.dir(device);
        });

    useEffect(() => 
    {
        console.log("Creating Three component...");

        let canvas = document.getElementById("ThreeCanvas") as HTMLCanvasElement;
        //engine.createScene(canvas);
        const renderer = new THREE.WebGLRenderer({canvas});

        //let canvas2 = document.getElementById("renderTarget") as HTMLCanvasElement;
        //engine.setCanvas(canvas2);

        //vRec.startRecording(canvas2);

        //engine.loadModel("Hello");
        return () =>
        {
            console.log("Destroying Three component...");
        };

    });

    return (
        <>
            <canvas id="ThreeCanvas" width="1920" height="720"></canvas>
        </>
    )
}
