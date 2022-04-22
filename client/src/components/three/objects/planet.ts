// Data for a planet object as it appears in the 3D scene
import * as THREE from 'three';

export class PlanetObj extends THREE.Mesh {
  
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

  onUpdate(time: number) {
    if (this.selected)
      this.rotation.y = time;

    //this.rotation.x = time;
  }


}