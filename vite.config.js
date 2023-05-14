// vite.config.js
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

//import react from "@vitejs/plugin-react";

export default defineConfig(
  {
    //   plugins: [react(), svelte()],
    plugins: [ svelte(
      {
        configFile: "../svelte.config.js"
      } 
    ) ],
    server: {
      port:80,
      host:"127.0.0.1",
      strictPort:true
    },
    root: "client/src/",
    publicDir: "client/public",
    build: {
      outDir: "../public"
    }
  }
  
);