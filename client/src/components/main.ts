/*global document*/

import Main from './main.svelte'


const svApp = new Main({
  target: document.getElementById('svelte-app')
})

export default svApp
