import React, { FunctionComponent, useEffect, useState } from 'react';
import { renderLoop } from './engine2d';

export const Renderer2d: FunctionComponent = (props) =>
{
  useEffect(() => 
  {
    console.log("Creating Canvas component...");

    const canvas = document.getElementById("Canvas2D") as HTMLCanvasElement;
    canvas.width = 640;
    canvas.height = 480;

    let options: CanvasRenderingContext2DSettings;
    //options.alpha = false;
    const ctx = canvas.getContext("2d", options);

    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.lineTo(400, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    ctx.arcTo(200, 200, 400, 0, 100);
    ctx.stroke();

    window.requestAnimationFrame(renderLoop);

    return () =>
    {
      console.log("Destroying Canvas component...");
    };

  });

  return (
    <>
      <canvas id="Canvas2D" width="1280" height="720"></canvas>
    </>
  )
}
