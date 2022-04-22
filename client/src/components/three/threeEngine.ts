import * as THREE from 'three';

import { planet } from '../..';
import { ee } from '../../index';

import { PlanetObj } from './objects/planet'

export class threeEngine {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  cam1: THREE.PerspectiveCamera;
  canvas: HTMLCanvasElement;
  raycast: THREE.Raycaster;

  updateList: THREE.Mesh[];
  //onSelectCallback: (name:string)=>void;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.canvas = canvas;
    const aspect = canvas.width / canvas.height;
    const fov = 60;
    const near = 0.1;
    const far = 100;
    this.cam1 = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.cam1.position.setZ(6);
    //this.cam1.position.setX(4);

    this.scene = new THREE.Scene();
    this.raycast = new THREE.Raycaster();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    requestAnimationFrame(this.render);
    canvas.addEventListener('click', this.onMouseClick);
  }

  setPlanet(name: string) {
    // first reset selection
    this.scene.children.forEach(el => {

      if (el instanceof PlanetObj) {
        const p = el as PlanetObj;

        if (p.name === name) 
          p.selected = true;
        else
          p.selected = false;
        
      }
    });
  }

  onMouseClick = (evt: MouseEvent) => {
    const point = new THREE.Vector2;
    point.x = (evt.clientX / this.canvas.width) * 2 - 1;
    point.y = -(evt.clientY / this.canvas.height) * 2 + 1;

    this.raycast.setFromCamera(point, this.cam1);

    // calculate objects intersecting the picking ray
    const intersects = this.raycast.intersectObjects(this.scene.children);

    // nothing selected
    if (intersects.length == 0) {
      //this.onSelect('none');
      ee.emit('selectPlanet', 'none');
    } else {
      // highlight the selected option
      for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object as THREE.Mesh;

        ee.emit('selectPlanet', obj.name);
      }
    }
  }

  init(planets: planet[]) {

    console.log("Init Renderer");
    console.log(planets);

    let xOffset = 0;
    planets.forEach((el) => {

      const newPlanet = new PlanetObj();
      newPlanet.scale.x = newPlanet.scale.y = newPlanet.scale.z = el.radius / 100000;
      newPlanet.name = el.name;
      newPlanet.translateX(xOffset + (el.radius / 100000));
      
      xOffset += (2 * (el.radius / 100000)) + 0.5;

      this.scene.add(newPlanet);
    });

  }

  updatePlanets(time: number) {
    this.scene.children.forEach(el => {
      if (el instanceof PlanetObj)
        (el as PlanetObj).onUpdate(time)
      
    }
    );
  }

  render = (time: number) => {
    time *= 0.001;  // convert time to seconds

    this.updatePlanets(time);

    this.renderer.render(this.scene, this.cam1);

    requestAnimationFrame(this.render);
  }

}