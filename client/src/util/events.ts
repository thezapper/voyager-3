import {EventEmitter} from 'events';

export enum msg
{
  SelectPlanet = 'SelectPlanet'
}

export class events 
{
  private ee : EventEmitter;

  constructor()
  {
    this.ee = new EventEmitter();

  }

  somefunction = () =>
  {
    let str = "";
    str = msg.SelectPlanet;
    console.log(str);
  }
}