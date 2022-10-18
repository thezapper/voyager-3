import { level } from './level';
import * as BABYLON from 'babylonjs';
//import 'babylonjs-loaders';

export class solarSystem implements level 
{
  planets = [
    // radius in km, distance in millions of km
    { name: 'Sun', radius: 696_000, distance: 0, url: '', offset: 0 },
    { name: 'Mercury', radius: 2_440, distance: 60, url: 'Mercury_(planet)', offset: 0 },
    { name: 'Venus', radius: 6_050, distance: 100, url: 'Venus', offset: 0 },
    { name: 'Earth', radius: 6_370, distance: 150, url: 'Earth', offset: 0 },
    { name: 'Mars', radius: 3_390, distance: 220, url: 'Mars', offset: 0 },
    { name: 'Jupiter', radius: 69_900, distance: 780, url: 'Jupiter', offset: 0 },
    { name: 'Saturn', radius: 58_200, distance: 1420, url: 'Saturn', offset: 0 },
    { name: 'Uranus', radius: 25_300, distance: 2870, url: 'Uranus', offset: 0 },
    { name: 'Neptune', radius: 24_600, distance: 4500, url: 'Neptune', offset: 0 },
  ];

  load(scn: BABYLON.Scene): void 
  {
    const opts = {

    }
    let offset = 0;
    this.planets.forEach((item, idx) => 
    {
      const planet = BABYLON.MeshBuilder.CreateSphere(item.name, opts, scn);

      planet.translate(BABYLON.Axis.Z, offset);

      offset += item.radius / 10000;
      //offset += item.radius / 10000;

      const scl = item.radius / 10000;
      planet.scaling = new BABYLON.Vector3(scl, scl, scl);
    });
  }

  // Any special case code required for this level
  update(): void 
  {
    return;
  }
}