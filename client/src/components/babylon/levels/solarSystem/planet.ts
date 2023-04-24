//import * as BABYLON from 'babylonjs';
import { CellMaterial }      from '@babylonjs/materials'
import { Mesh, MeshBuilder } from '@babylonjs/core/Meshes/'
import { Scene }             from '@babylonjs/core/scene';
import { Texture }           from '@babylonjs/core/Materials';
import { Vector3, Axis, Color3 } from '@babylonjs/core/Maths';

import { ee } from '../../../../index'

export interface planetData
{
  name:string,
  radius:number,    // km
  distance:number,  // millions of km
  url:string
}

export type notifyCallback =  ( data: object ) => void;

export class planet //implements planetData
{
  data: planetData;
  onClickCallback : notifyCallback;

  private sphereMesh: Mesh;
  isSelected  = false;

  rotRate = 0.5 * (Math.PI * 2); // rotations per second
  tick = (delta: number) =>
  {
    if (this.isSelected == true)
    {
      const rot = this.rotRate * (delta / 1000);
      this.sphereMesh.rotation.y += rot;
    }
  }

  getPos = () =>
  {
    return this.sphereMesh.position;
  }
  
  onPick = (evt) =>
  {
    this.isSelected = true;
    ee.emit('selectPlanet', {name: this.data.name, source:'engine'});
    //this.onClickCallback({name: this.data.name, source:'engine'});
  }

  constructor(data:planetData, scn: Scene)
  {
    this.data = data;

    // ee.on('selectPlanet', (data) => 
    // {
    //   console.log(data, this.data);
    // });

    const opts = {
      segments: 5
    }
    const sqOpts = {
      size: 1
    }
    this.sphereMesh = MeshBuilder.CreateSphere(data.name, opts, scn);
    //this.sphereMesh = BABYLON.MeshBuilder.CreateBox(data.name, sqOpts, scn);
    this.sphereMesh.metadata = {parent: this};

    //const mat = new BABYLON.StandardMaterial("cell", scn);
    const mat = new CellMaterial("cell", scn);

    // Set up the diffuse texture
    mat.diffuseTexture = new Texture("./assets/256.jpg", scn);

    // Set up diffuse color
    mat.diffuseColor = new Color3(0.0, 0.0, 1.0);
    //mat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    //mat. = new BABYLON.Color3(0.0, 0.0, 1.0);
    mat.computeHighLevel = true;

    this.sphereMesh.material = mat;

    const radiusFraction = data.radius / 1000;
    this.sphereMesh.translate(Axis.Z, data.distance);
    
    const scl = radiusFraction * 2;
    this.sphereMesh.scaling = new Vector3(scl, scl, scl);
    
    this.sphereMesh.metadata.onPick = this.onPick;

    // scn.onKeyboardObservable.add( () => {
    //   this.sphereMesh.scaling.y *= 2;
    // });
    
  }

}