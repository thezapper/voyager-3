# Voyager-3
## Exploring space without travelling billions of miles.

A personal project to play around with 3D web development using [Three.js](https://threejs.org/) and [Babylon.js](https://www.babylonjs.com) and demonstrate some of the more amazing facts of space.

## To Do
* React Three Fiber
*
*
*

## Build and run
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

## The Rust webserver
The Rust server can be run directly from this project using
```
npm run rust
```