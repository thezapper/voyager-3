import * as BABYLON from 'babylonjs';

export interface planetData
{
  name:string,
  radius:number,    // km
  distance:number,  // millions of km
  url:string
}

export class planet
{
  private sphereMesh:BABYLON.Mesh;

  constructor(data:planetData, scn:BABYLON.Scene)
  {
    const opts = {
      segments: 10
    }
    this.sphereMesh = BABYLON.MeshBuilder.CreateSphere(data.name, opts, scn);
    
    //let offset = 0;
    const radiusFraction = data.radius / 1000;
    this.sphereMesh.translate(BABYLON.Axis.Z, data.distance);

    //offset += data.radius / 10000;
    //offset += item.radius / 10000;

    const scl = radiusFraction * 2;
    this.sphereMesh.scaling = new BABYLON.Vector3(scl, scl, scl);
  }
}