import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

import { solarSystem } from './levels/solarSystem/lvl_SolarSystem';
import { level } from './levels/level'

let canvas2: HTMLCanvasElement;
let ctx2: CanvasRenderingContext2D;
let interval: number;
let engine: BABYLON.Engine;
let scene: BABYLON.Scene
//let x = 0;
let camera1: BABYLON.ArcRotateCamera;
let camera2: BABYLON.ArcRotateCamera;
let camera3: BABYLON.ArcRotateCamera;
//var camera4: bln.ArcRotateCamera;
//var camera5: bln.ArcRotateCamera;
let shadowGenerator: BABYLON.ShadowGenerator;
let rt1: BABYLON.RenderTargetTexture;
//let rt2: bln.RenderTargetTexture;
//let rt3: bln.RenderTargetTexture;
const clearCol = new BABYLON.Color4(0.0, 0.0, 0.0, 1.0);

//let uiNotification : ( data: object ) => void;

const isInit = false;
let currentLevel: level;
// Create the main Babylon scene and set it up.  The parameter 'fn' is a callback function so this
// class can send data back to the UI system which is a React component.  As this is a plain
// TS class object there is no props mechanism available to pass a callback down.  The benefit here
// is not locking the renderer into React as a UI library
function createScene(canvas: HTMLCanvasElement)
{
  // if (isInit === false)
  // {
  //   console.log("load scene first time");
  //   isInit = true;
  // }
  // else
  //   return;

  engine = new BABYLON.Engine(canvas, true);

  // currentLevel is a generic 'level' object but is loaded with a specific concrete type
  // we can only interact with it based on the structure of the 'level' interface
  // todo - change this based on the current level
  currentLevel = new solarSystem();
  //currentLevel.uiNotification = fn;
  currentLevel.load(engine);

  engine.runRenderLoop(currentLevel.render.bind(currentLevel));
}

function createRenderTarget(cam: BABYLON.Camera, _width = 256, _height = 256): BABYLON.RenderTargetTexture
{
  const _rt = new BABYLON.RenderTargetTexture("", { width: _width, height: _height }, scene);
  //rt.refreshRate = 4;
  _rt.onAfterRenderObservable.add(onTargetRender);
  //cam.customRenderTargets.push(_rt);
  cam.outputRenderTarget = _rt;

  //cam.customRenderTargets[0] = rt;

  scene.customRenderTargets.push(_rt);

  return _rt;
}

function onTargetRender(num: number, state: BABYLON.EventState)
{
  console.log("Rendertarget ", num);
  //getImageFromCamera(camera2);
}

function getImageFromCamera(cam: BABYLON.Camera)
{
  //let thisRt = camera2.outputRenderTarget;
  //let thisRt = cam.customRenderTargets[0];

  const ab = camera2.outputRenderTarget.readPixels();
  // let pixels = new Uint8ClampedArray(ab.buffer); <---------
  // let imageData = new ImageData(pixels, 256);

  const ab3 = camera3.outputRenderTarget.readPixels();
  //let pixels3 = new Uint8ClampedArray(ab3.buffer);
  //let imageData3 = new ImageData(pixels3, 256);

  ctx2.clearRect(0, 0, 200, 200);

  //ctx2.putImageData(imageData, 0, 128, 0, 0, 128, 128);
  // createImageBitmap(imageData).then((img: ImageBitmap) =>
  // {
  //     ctx2.save()
  //     ctx2.translate(0, 512);
  //     ctx2.scale(1.0, -1.0);
  //     ctx2.drawImage(img, 0, 0, 256, 256);
  //     ctx2.drawImage(img, 0, 256, 256, 256);
  //     ctx2.restore();
  //     //ctx2.drawImage(img, 0, 128, 128, 128);
  // });

  // createImageBitmap(imageData3).then((img: ImageBitmap) =>
  // {
  //     ctx2.save()
  //     ctx2.translate(0, 512);
  //     ctx2.scale(1.0, -1.0);
  //     ctx2.drawImage(img, 256, 0, 256, 256);
  //     ctx2.drawImage(img, 256, 256, 256, 256);
  //     ctx2.restore();
  //     //ctx2.drawImage(img, 0, 128, 128, 128);
  // });

  ctx2.fillStyle = 'green';
  ctx2.fillRect(10, 10, 150, 100);

}


let cube: BABYLON.AbstractMesh = null;
function loadModel(filename: string)
{
  //bln.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  //bln.SceneLoader.Append("box.babylon");
  //bln.SceneLoader.Append("201208_SHEARWATER.babylon");
  //bln.SceneLoader.Load("./Companion_Cube_Upgrade/", "Extra_Printable_Companion_Cube.stl");
  BABYLON.SceneLoader.ImportMesh("", "./Companion_Cube_Upgrade/", "Extra_Printable_Companion_Cube.stl", scene, (newMeshes) =>
  {
    cube = newMeshes[0];
    cube.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    newMeshes[0].position._x += 2.0;
    newMeshes[0].position._z += 2.0;

    //rt2.renderList.push(cube);

    shadowGenerator.addShadowCaster(cube, true);
  });

  BABYLON.SceneLoader.ImportMesh("f22", "./", "f-22_raptor.stl", scene, (newMeshes) =>
  {
    const mesh = <BABYLON.Mesh>newMeshes[0]
    mesh.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
    mesh.position._x -= 2.0;
    mesh.position._y += 2.0;

    //let myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
    //myMaterial.diffuseColor = bln.Color3.Blue();
    //mesh.material = myMaterial;

    //rt2.renderList.push(mesh);

    shadowGenerator.addShadowCaster(newMeshes[0], true);
  });

  //bln.SceneLoader.ImportMeshAsync("box", "", "scene.babylon");
}



function setCanvas(canvas: HTMLCanvasElement)
{
  canvas2 = canvas;
  ctx2 = canvas2.getContext('2d');
}

export
{
  createScene     as createScene,
  setCanvas       as setCanvas
  //loadModel as loadModel,
}