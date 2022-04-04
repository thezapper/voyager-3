
let delta = 0.0;
let lastFrame = 0.0;
let ave = 0.0;
let deltaP = 0.0;
let lastFrameP = 0.0;
let now = 0.0;
let aveP = 0.0;
let frameCount = 0;
async function renderLoop(time: number)
{
    now = performance.now();
    delta = time - lastFrame;
    deltaP = now - lastFrameP;
    
    lastFrame = time;
    lastFrameP = now;

    ave += delta;
    aveP += deltaP;

    if (frameCount > 30)
    {
        console.log(`Ave Frame time: ${(ave/30).toFixed(4)}, Perf time: ${(aveP/30).toFixed(4)}`);
        frameCount = ave = aveP = 0;
    }

    frameCount++;

    await new Promise(r => setTimeout(r, 16));

    window.requestAnimationFrame(renderLoop);
}

export
{
    renderLoop as renderLoop,
    //loadModel as loadModel,
    //setCanvas as setCanvas
}