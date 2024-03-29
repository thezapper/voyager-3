// A Level is a class that contains standard js/ts Babylon code to create objects in the scene.  
// I wanted to call it a scene really, but that might be confusing with the Babylon scene.
// The intention is that it acts like a map file in a game, rather than using the quite 
// complicated editor, shitty React-three-fiber or defining my own map format. This just supplies 
// a function to call which creates the objects and adds them to a Babylon scene object.  It's 
// simply a neater way of containing the creation code and possibly any special case logic
// required by the level. 

export enum LEVEL {
  SPACE,
  DINOS,
  CV
}

import { Engine } from '@babylonjs/core';
//import 'babylonjs-loaders';

export interface level
{
  load(eng: Engine) : void;
  update() : void;
  render() : void;
  // post information back to the UI layer
  //uiNotification : ( data: object ) => void;
}

