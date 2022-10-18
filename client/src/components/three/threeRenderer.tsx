import React, { FunctionComponent, useEffect } from 'react';
import { threeEngine } from './threeEngine'

export interface planet {
    name: string;
    radius: number;
    distance: number;
}

interface renderer_props {
    planets : planet[];
    //onSelectCallback : (arg0:string)=>void;
    curPlanet: string;
 }

 let engine:threeEngine;
export const ThreeRenderer: FunctionComponent<renderer_props> = (props) => 
{

    useEffect(() => 
{
        console.log("Creating Three component...");

        const canvas = document.getElementById("ThreeCanvas") as HTMLCanvasElement;
        canvas.width = document.body.clientWidth; //document.width is obsolete
        canvas.height = document.body.clientHeight;
        engine = new threeEngine(canvas);
        engine.init(props.planets);

        return () => 
{
            console.log("Destroying Three component...");
        };

    }, []); // <-- one shot, don't keep creating the engine.

    useEffect(() => 
{
        console.log("Current planet changed to ", props.curPlanet);
        engine.setPlanet(props.curPlanet);
    },[props.curPlanet]);

    return (
            <canvas id="ThreeCanvas" ></canvas>
    )
}
