# <headText> Voyager-3

### <subheadText> Space
The orginal intention for this is to play around with [Babylon.js](https://www.babylonjs.com) to make a cool 3D showcase, but also use it to visualise some of the amazing facts about space and the solar system.  

I wanted to be able to visualise the massive numbers and units involed in anything space related because it's just so difficult to grasp the concept of an object being 4.5 billion km from the sun, but if I can visually show that in some way with a relative scale I think it would be interesting to see.

The plan is to make a simple version first with cirular orbits and basic infomation, the sort of thing that a toddler might enjoy playing with, and later add an advanced mode which displays orbit inclination and a more realistic ovoid shape.

### <subheadText> Dinos

Also, DINOS! The timelines for dinosaus are impressive, for example there is a larger time separation between the Stegosaurus and T-Rex (approx 80 million years) than between the T-Rex and humans (65 million years), and the T-Rex was around for something like 1.2 to 3.6 million years but humans have only existed for about 0.3 million years! So it would be quite fun to do some sort of 3D timescale to show when they were around and for how long.

### <subheadText> CV

How can you make a CV more interesting to view? Turn it into a funky 3D world.  This will probably be a total nightmare to read, but it would be interesting to see how best to display large chunks of text in a 3D scene.  And also pull the data from a Google doc.

### <subheadText> General To Do (not in order)
* Host on Azure
* Some webasm in Rust
* Maybe replace React with Svelte
* Try Tailwind again (I'm still not convinced)
### <subheadText> Done
* ~~React Three Fiber~~ I tried and it's rubbish.
* Replace Webpack with Vite.
* Try Tauri.
* Make a Rust webserver

---

## <subheadText> Project Structure

The theory is to support 3 different renderers, Babylon (3D), Three (3D) and Canvas (2D).  The main focus is on Babylon, I've been back and forth on this, I started on Babylon, then tried Three and now have gone back to Babylon.

The files for the different renderers are in `client/src/components`.  The React UI layer is also in here

## <subheadText> Build and run

### <subheadText> Dev build and server

For the easy peasy Vite dev server just run 
```
npm run dev
```
### <subheadText> Node Server

For the Node.js server that doesn't do anything other than serve the assets (yet)
```
npm run build-svr
npm run build
npm start
```
For Node server development you can also use;
```
npm run build-svr
npm run watch-svr
```
This will start watching the files for the server and initalise a server restart when they are changed.

---

## <rustyText> The Rust webserver experiment
I've been playing with [Rust](https://www.rust-lang.org/) a bit so wanted to try this.  Assuming you have the Rust tools installed, this server can be run directly from the root dir using.  The "app" has a bunch to test code as I was using it as an experimental playground, the webserver part is handled by [Actix](https://actix.rs/). 
```
npm run rust
```

## <rustyText> Tauri Standalone (Electron replacement)

I also added support for standalone builds similar to Electron but using [Tauri](https://tauri.app/) instead.

This can be built with the following command
```
npm run tauri build
```
This assumes the assets have already been built with one of the earlier frontend build commands as it bundles the content of the ```./client/public``` folder.  I've only tested this on Windows.  The resulting executable will be located at ```.\voyager-3\src-tauri\target\release\voyager-3.exe```

<style>
headText{
  color:#aa22ff;
  font-weight: 600;
}

subheadText{
  color:#aa77ff;
}

rustyText{
  color:#ff4000;
}
</style>