// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(
  {
    plugins: [react()],
    server: {
      port:80,
      host:"127.0.0.1",
      strictPort:true
    },
    root: "client/src",
    publicDir: "client/public",
    build: {
      outDir: "../public"
    }
  }
  
);