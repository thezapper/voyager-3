import React, { FunctionComponent, useEffect, useState } from 'react';
import { threeEngine } from './threeEngine'

interface Three_props { }

export const ThreeRenderer: FunctionComponent<Three_props> = (props) =>
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
        const engine = new threeEngine(canvas);

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
