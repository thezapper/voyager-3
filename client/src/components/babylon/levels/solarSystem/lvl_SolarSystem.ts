import { level } from '../level';
import * as BABYLON from 'babylonjs';
//import 'babylonjs-loaders';

import {planet, planetData} from './planet'

export class solarSystem implements level 
{
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
  private scene: BABYLON.Scene;

  load(scn: BABYLON.Scene): void 
  {
    this.scene = scn;

    let orbit = 0
    this.planets.forEach((item, idx) => 
    {
      orbit += item.radius/1000;
      item.distance = orbit;
      orbit += item.radius/1000;
      this.planetObjs.push(new planet(item, scn))
    });
  }

  // Any special case code required for this level
  update(): void 
  {
    return;
  }
}