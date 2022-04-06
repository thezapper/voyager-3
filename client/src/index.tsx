import "./styles.css";

import React, { FunctionComponent, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { UIPanel } from './components/ui/UIPanel';

import { ThreeRenderer } from './components/three/threeRenderer';

import {EventEmitter} from 'events';

export var ee: EventEmitter;
ee = new EventEmitter();
ee.on('message', function (text) {
  console.log(text)
})
//ee.emit('message', 'hello world')

export interface planet {
  name: string;
  radius: number;
  distance: number;
  url?: string;
}

interface IProps
{
}

interface IState
{
}

let selectedSystem = "Sol";
let planets:planet[];

planets = [ 
  // radius in km, distance in millions of km
  {name:'Mercury', radius:2440, distance:60, url:'Mercury_(planet)'}, 
  {name:'Venus', radius:6050, distance:100, url:'Venus'}, 
  {name:'Earth', radius:6370, distance:150, url:'Earth'}, 
  {name:'Mars', radius:3390, distance:220, url:'Mars'}, 
  {name:'Jupiter', radius:69900, distance:780, url:'Jupiter'}, 
  {name:'Saturn', radius:58200, distance:1420, url:'Saturn'}, 
  {name:'Uranus', radius:25300, distance:2870, url:'Uranus'}, 
  {name:'Neptune', radius:24600, distance:4500, url:'Neptune'}, 
];

const MainApp: FunctionComponent = () =>
{
  const [currentPlanet, setPlanet] = useState('none');

  let onSelectPlanet = (name: string) =>
    {
        console.log("Main comp", name);
        setPlanet(name);
    }

    ee.on('selectPlanet', (choice) =>
    {
      setPlanet(choice);
    })

    return (
      <>
        <UIPanel planets={planets} curPlanet={currentPlanet} onSelectCallback={onSelectPlanet}/>
        <ThreeRenderer planets={planets} curPlanet={currentPlanet} />
      </>
    );
}

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<MainApp />);