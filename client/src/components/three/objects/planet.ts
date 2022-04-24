// Data for a planet object as it appears in the 3D scene
import * as THREE from 'three';

export interface Tickable
{
  tick(delta: number) : void;
}

export class superBasic extends THREE.Object3D implements Tickable {

  tick(delta: number): void {
    
  }
}

export class PlanetObj extends THREE.Mesh implements Tickable {
  
  public selected: boolean;
  
  protected distance: number; // orbit distance from star
  protected diameter: number;
  protected colour: THREE.Color;
  protected rotationRate: number;
  

  //obj: THREE.Object3D;

  constructor() {

    super(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshToonMaterial({ color: 0xffff00 })
    );

    //this.type = "PlanetObj";
    //this.name = "Earth"

    //this.onBeforeRender = this.onUpdate;
  }

  tick(time: number) {
    if (this.selected)
      this.rotation.y = time;

    //this.rotation.x = time;
  }


}