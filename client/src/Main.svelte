<script lang="ts">
	import { onMount } from 'svelte';
  import * as engine from './components/babylon/babylonEngine';
  import Ui from './components/babylon/levels/solarSystem/sv-ui/Ui.svelte'
  let canvas: HTMLCanvasElement;

  const width = document.body.clientWidth; //document.width is obsolete
  const height = document.body.clientHeight;
  
  onMount(() => {
    canvas = document.getElementById("BblCanvas") as HTMLCanvasElement;
    engine.createScene(canvas);
    
  });

</script>

<main>

  <Ui> </Ui>

  <canvas id="BblCanvas" width={width} height={height}></canvas>

</main>