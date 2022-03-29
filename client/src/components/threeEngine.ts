import * as THREE from 'three';

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);

export class threeEngine 
{
    renderer : THREE.WebGLRenderer;
    scene : THREE.Scene;
    cam1 : THREE.PerspectiveCamera;

    constructor(canvas: HTMLCanvasElement) 
    {
        this.renderer = new THREE.WebGLRenderer({ canvas });

        const fov = 60;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        this.cam1 = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.cam1.position.setZ(4);

        this.scene = new THREE.Scene();

        this.scene.add(cube);

        //this.renderer.render(this.scene, this.cam1);
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(-1, 2, 4);
        this.scene.add(light);

        requestAnimationFrame(this.render);
    }

    render = (time) => {
        time *= 0.001;  // convert time to seconds
       
        cube.rotation.x = time;
        cube.rotation.y = time;
       
        this.renderer.render(this.scene, this.cam1);
       
        requestAnimationFrame(this.render);
      }

    tick() {

    }

}