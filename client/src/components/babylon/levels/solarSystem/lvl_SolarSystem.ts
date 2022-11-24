import { level } from '../level';
import * as BABYLON from 'babylonjs';
//import 'babylonjs-loaders';
import { ee } from '../../../..';

import {planet, planetData, notifyCallback} from './planet'

class systemState
{

}

export class solarSystem implements level 
{
  // post information back to the UI layer
  uiNotification : ( data: object ) => void;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  defaultCam: BABYLON.ArcRotateCamera;
  light: BABYLON.PointLight;

  // +------------------------------------------------------------+
  // | TODO - Load all data from the server
  // +------------------------------------------------------------+

  planets:planetData[] = [
    // radius in km, distance in millions of km
    //{ name: 'Sun', radius: 696_000, distance: 0, url: ''},
    { name: 'Mercury', radius: 2_440, distance: 60, url: 'Mercury_(planet)'},
    { name: 'Venus', radius: 6_050, distance: 100, url: 'Venus'},
    { name: 'Earth', radius: 6_370, distance: 150, url: 'Earth'},
    { name: 'Mars', radius: 3_390, distance: 220, url: 'Mars'},
    { name: 'Jupiter', radius: 69_900, distance: 780, url: 'Jupiter'},
    { name: 'Saturn', radius: 58_200, distance: 1420, url: 'Saturn'},
    { name: 'Uranus', radius: 25_300, distance: 2870, url: 'Uranus'},
    { name: 'Neptune', radius: 24_600, distance: 4500, url: 'Neptune'},
  ];

  planetObjs:planet[] = [];
  
  selectPlanet(data: object)
  {
    //if (data['source'] === 'engine')
    // focus the camera here
    console.log("Solar System - planet ", data['name'], " selected from ", data['source']);
  }

  // +------------------------------------------------------
  // | Create and set up the scene
  // +------------------------------------------------------
  load(engine: BABYLON.Engine): void 
  {
    this.engine = engine;
    this.scene = new BABYLON.Scene(this.engine);

    // set up events from UI
    ee.on('selectPlanet', this.selectPlanet.bind(this));

    // Set up objects for the level

    this.defaultCam = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(45).radians(), 80, 
      new BABYLON.Vector3(0, 0, 0), this.scene);
    this.defaultCam.setTarget(BABYLON.Vector3.Zero());
    this.defaultCam.attachControl(engine.getRenderingCanvas(), false); // Attach the camera to the canvas
    this.scene.activeCameras.push(this.defaultCam);

    const lightPos = new BABYLON.Vector3(0, 50, 0);
    this.light = new BABYLON.PointLight("pointLight", lightPos, this.scene);
    this.light.intensity = 1.0;

    let orbit = 0
    this.planets.forEach((item, idx) => 
    {
      orbit += item.radius/1000;
      item.distance = orbit;
      orbit += item.radius/1000;
      const newPlanet = new planet(item, this.scene);
      newPlanet.onClickCallback = this.selectPlanet;
      this.planetObjs.push(newPlanet)
    });

    const groundOpts = 
    {
      width:10, height:10,
      subdivisions: 2,
      updatable:false
    }
    const ground = BABYLON.MeshBuilder.CreateGround('ground1', groundOpts, this.scene);
    ground.receiveShadows = true;
    //shadowGenerator = new BABYLON.ShadowGenerator(512, light);

    this.scene.onPointerObservable.add( (pointerInfo) => 
    {
      switch (pointerInfo.type) 
      {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          console.log("POINTER DOWN");
          if (pointerInfo.pickInfo.pickedMesh === null)
            ee.emit('selectPlanet', {name: 'none', source:'engine'});
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
          // Rather than doing an 'if this or that clicked' block here
          // each mesh has a onclick method
          console.log("POINTER PICK");
          pointerInfo.pickInfo.pickedMesh.metadata?.onPick(pointerInfo);
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

    //this.uiNotification(this.planets);
    ee.emit('loadPlanets', this.planets);

  }

  render(): void 
  {
    this.scene.render();  
  }

  // Any special case code required for this level
  update(): void 
  {
    return;
  }
}