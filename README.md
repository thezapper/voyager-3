# <headText> Voyager-3
## <subheadText> Exploring space without travelling billions of miles.

A personal project to play around with 3D web development using [Three.js](https://threejs.org/) and [Babylon.js](https://www.babylonjs.com) and demonstrate some of the more amazing facts of space.

Also, DINOS! The timescales for dinosaus are impressive so it would be coold to do some sort of 3D timescale to show when they were around and for how long.

### <subheadText> General To Do (not in order)
* Host on Azure
* Some webasm in Rust
* Maybe replace React with Svelte
#### <subheadText> Graphics To Do
* Render targets (again)

### <subheadText> Done
* ~~React Three Fiber~~ I tried and it's shit.
* Replace Webpack with Vite.
* Try Tauri.

---

## <subheadText> Project Structure

The theory is to support 3 different renderers, Babylon (3D), Three (3D) and Canvas (2D).  The main focus is on Babylon, I've been back and forth on this, I started on Babylon, then tried Three and now have gone back to Babylon.  

## <subheadText> Build and run

For the easy peasy Vite dev server just run 
```
npm run dev
```

For the Node.js server that doesn't do anything other than serve the assets (yet)
```
npm run build-svr
npm run build
npm start
```
For development, if building from scratch first use;
```
npm run build-svr
npm run build
```
Then run
```
npm run watch-svr
npm run watch
```
Which will start watching the files for the server and initalise a server restart when they are changed, and will also watch the client files and rebuild.  The client is not hot re-loaded.

## <subheadText> The Rust webserver
The Rust server can be run directly from the root dir using
```
npm run rust
```

<style>
headText{
  color:#aa22ff;
  font-weight: 600;
}

subheadText{
  color:#aa77ff;
}
</style>