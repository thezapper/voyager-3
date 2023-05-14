/*global document*/

import {EventEmitter} from 'events';
export const ee = new EventEmitter();

import Main from './Main.svelte'
ee.setMaxListeners(20);

//let svApp : Main | null = null;

const svApp = new Main({
  target: document.getElementById('svelte-app')
})


export default svApp
