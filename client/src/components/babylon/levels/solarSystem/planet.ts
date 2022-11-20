import * as BABYLON from 'babylonjs';
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
      segments: 10
    }
    this.sphereMesh = BABYLON.MeshBuilder.CreateSphere(data.name, opts, scn);
    this.sphereMesh.metadata = {parent: this};

    this.sphereMesh.metadata.onPick = this.onPick;
    
    //let offset = 0;
    const radiusFraction = data.radius / 1000;
    this.sphereMesh.translate(BABYLON.Axis.Z, data.distance);

    //offset += data.radius / 10000;
    //offset += item.radius / 10000;

    const scl = radiusFraction * 2;
    this.sphereMesh.scaling = new BABYLON.Vector3(scl, scl, scl);

    // scn.onKeyboardObservable.add( () => {
    //   this.sphereMesh.scaling.y *= 2;
    // });

    
  }

}