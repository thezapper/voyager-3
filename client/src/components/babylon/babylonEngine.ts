import * as bln from 'babylonjs';
import 'babylonjs-loaders';

import { solarSystem } from './levels/solarSystem/lvl_SolarSystem';

let canvas2: HTMLCanvasElement;
let ctx2: CanvasRenderingContext2D;
let interval: number;
let engine: bln.Engine;
let scene: bln.Scene
//let x = 0;
let light: bln.PointLight;
let camera1: bln.ArcRotateCamera;
let camera2: bln.ArcRotateCamera;
let camera3: bln.ArcRotateCamera;
//var camera4: bln.ArcRotateCamera;
//var camera5: bln.ArcRotateCamera;
let shadowGenerator: bln.ShadowGenerator;
let rt1: bln.RenderTargetTexture;
//let rt2: bln.RenderTargetTexture;
//let rt3: bln.RenderTargetTexture;
const clearCol = new bln.Color4(0.0, 0.0, 0.0, 1.0);
function renderLoop()
{
  const pos = new bln.Vector3(camera1.position._x, camera1.position._y, 2);
  //light.position = pos;
  if (cube)
    cube.rotate(bln.Vector3.Up(), 0.01);

  //camera2.alpha += 0.001;
  //camera3.alpha -= 0.002;

  //engine.clear(clearCol, true, true);

  scene.render();

  //getImageFromCamera(camera2);
}

let uiNotification : ( data: object ) => void;

// Create the main Babylon scene and set it up.  The parameter 'fn' is a callback function so this
// class can send data back to the UI system which is a React component.  As this is a plain
// TS class object there is no props mechanism available to pass a callback down.  The benefit here
// is not locking the renderer into React as a UI library
function createScene(canvas: HTMLCanvasElement, fn: (object)=>void)
{
  engine = new bln.Engine(canvas, true);
  scene = new bln.Scene(engine);

  uiNotification = fn;

  const ss = new solarSystem();
  ss.load(scene);

  // the scene has been loaded, notify the UI layer
  uiNotification(ss.planets);

  camera1 = new bln.ArcRotateCamera("Camera", 0, bln.Angle.FromDegrees(45).radians(), 80, new bln.Vector3(0, 0, 0), scene);
  camera1.setTarget(bln.Vector3.Zero());
  camera1.attachControl(canvas, false); // Attach the camera to the canvas

  // camera2 = new bln.ArcRotateCamera("Camera2", 0, bln.Angle.FromDegrees(45).radians(), 20, new bln.Vector3(0, 0, 0), scene);
  // camera2.setTarget(new bln.Vector3(1, 0, 0));

  // camera3 = new bln.ArcRotateCamera("Camera3", 0, bln.Angle.FromDegrees(65).radians(), 30, new bln.Vector3(0, 0, 0), scene);
  // camera3.setTarget(new bln.Vector3(1, 0, 0));

  const lightPos = new bln.Vector3(0, 50, 0);

  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  //var light = new bln.HemisphericLight('light1', new bln.Vector3(0, 1, 0), scene);
  light = new bln.PointLight("pointLight", lightPos, scene);
  light.intensity = 0.5;

  shadowGenerator = new bln.ShadowGenerator(512, light);

  // Create a built-in sphere shape to show the light position.
  // its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
  //const sphere = bln.Mesh.CreateSphere('lightPos', 16, 0.5, scene, false, bln.Mesh.FRONTSIDE);
  //sphere.position = lightPos;

  // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
  const ground = bln.Mesh.CreateGround('ground1', 10, 2.44*2, 2, scene, false);
  ground.receiveShadows = true;

  scene.activeCameras.push(camera1);
  //scene.activeCameras.push(camera2);
  //scene.activeCameras.push(camera3);

  //scene._activeCamera = camera1;

  //rt1 = createRenderTarget(camera1, 1280, 720);
  //rt2 = createRenderTarget(camera2);
  //rt2.clearColor = new bln.Color4(1.0, 0.0, 0.0, 0.0);
  //rt3 = createRenderTarget(camera3);

  //rt2.renderList.push(sphere);

  //camera2.outputRenderTarget = rt2;
  //camera3.outputRenderTarget = rt3;


  //rt = camera.outputRenderTarget;
  //rt.onAfterRenderObservable.add(onTargetRender);

  scene.onPointerObservable.add( (pointerInfo) => 
  {
    switch (pointerInfo.type) 
    {
    case BABYLON.PointerEventTypes.POINTERDOWN:
      console.log("POINTER DOWN");
      break;
    case BABYLON.PointerEventTypes.POINTERUP:
      console.log("POINTER UP");
      break;
      // case BABYLON.PointerEventTypes.POINTERMOVE:
      //   console.log("POINTER MOVE");
      //   break;
    case BABYLON.PointerEventTypes.POINTERWHEEL:
      console.log("POINTER WHEEL");
      break;
    case BABYLON.PointerEventTypes.POINTERPICK:
      console.log("POINTER PICK");
      pointerInfo.pickInfo.pickedMesh.metadata.onPick(pointerInfo);
      break;
    case BABYLON.PointerEventTypes.POINTERTAP:
    {
      //console.log(pointerInfo.pickInfo);
      break;
    }
    case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
      console.log("POINTER DOUBLE-TAP");
      break;
    }
  });

  engine.runRenderLoop(renderLoop);
}

function createRenderTarget(cam: bln.Camera, _width = 256, _height = 256): bln.RenderTargetTexture
{
  const _rt = new bln.RenderTargetTexture("", { width: _width, height: _height }, scene);
  //rt.refreshRate = 4;
  _rt.onAfterRenderObservable.add(onTargetRender);
  //cam.customRenderTargets.push(_rt);
  cam.outputRenderTarget = _rt;

  //cam.customRenderTargets[0] = rt;

  scene.customRenderTargets.push(_rt);

  return _rt;
}

function onTargetRender(num: number, state: bln.EventState)
{
  console.log("Rendertarget ", num);
  //getImageFromCamera(camera2);
}

function getImageFromCamera(cam: bln.Camera)
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


let cube: bln.AbstractMesh = null;
function loadModel(filename: string)
{
  //bln.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
  //bln.SceneLoader.Append("box.babylon");
  //bln.SceneLoader.Append("201208_SHEARWATER.babylon");
  //bln.SceneLoader.Load("./Companion_Cube_Upgrade/", "Extra_Printable_Companion_Cube.stl");
  bln.SceneLoader.ImportMesh("", "./Companion_Cube_Upgrade/", "Extra_Printable_Companion_Cube.stl", scene, (newMeshes) =>
  {
    cube = newMeshes[0];
    cube.scaling = new bln.Vector3(0.1, 0.1, 0.1);
    newMeshes[0].position._x += 2.0;
    newMeshes[0].position._z += 2.0;

    //rt2.renderList.push(cube);

    shadowGenerator.addShadowCaster(cube, true);
  });

  bln.SceneLoader.ImportMesh("f22", "./", "f-22_raptor.stl", scene, (newMeshes) =>
  {
    const mesh = <bln.Mesh>newMeshes[0]
    mesh.scaling = new bln.Vector3(0.01, 0.01, 0.01);
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