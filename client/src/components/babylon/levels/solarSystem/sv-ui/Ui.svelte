<script lang="ts">
	// import { onMount } from 'svelte';

  const width = document.body.clientWidth; //document.width is obsolete
  const height = document.body.clientHeight;
  
  // onMount(() => {
    
  // });

</script>

<ui>

  <div class="ui-container">
    Svelte UI Container Component
  </div>

</ui>

<style>
  .ui-container {
    border: 2px solid green;
    background-color: beige;
    position: absolute;
    left: 20;
    top: 20;
  }
</style>