import * as BABYLON from 'babylonjs';
import { CellMaterial } from 'babylonjs-materials';
import { ee } from '../../../../index'

export interface planetData
{
  name:string,
  radius:number,    // km
  distance:number,  // millions of km
  url:string
}

export class planet //implements planetData
{
  data: planetData;

  private sphereMesh:BABYLON.Mesh;

  private onUpdate()
  {
    this.sphereMesh.scaling.y *= 2;
    
  }
  
  onPick = (evt) =>
  {
    //console.log(this.data.name);
    ee.emit('message', this.data.name);
    ee.emit('selectPlanet', this.data.name);
  }

  constructor(data:planetData, scn:BABYLON.Scene)
  {
    this.data = data;

    const opts = {
      segments: 5
    }
    this.sphereMesh = BABYLON.MeshBuilder.CreateSphere(data.name, opts, scn);
    this.sphereMesh.metadata = {parent: this};

    //const mat = new BABYLON.StandardMaterial("cell", scn);
    const mat = new CellMaterial("cell", scn);

    // Set up the diffuse texture
    mat.diffuseTexture = new BABYLON.Texture("./devassets/256.jpg", scn);

    // Set up diffuse color
    mat.diffuseColor = new BABYLON.Color3(0.0, 0.0, 1.0);
    //mat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    //mat. = new BABYLON.Color3(0.0, 0.0, 1.0);
    mat.computeHighLevel = true;

    this.sphereMesh.material = mat;

    const radiusFraction = data.radius / 1000;
    this.sphereMesh.translate(BABYLON.Axis.Z, data.distance);
    
    const scl = radiusFraction * 2;
    this.sphereMesh.scaling = new BABYLON.Vector3(scl, scl, scl);
    
    this.sphereMesh.metadata.onPick = this.onPick;

    // scn.onKeyboardObservable.add( () => {
    //   this.sphereMesh.scaling.y *= 2;
    // });
    
  }

}