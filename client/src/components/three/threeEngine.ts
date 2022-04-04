import * as THREE from 'three';

import { planet } from '../..';

export class threeEngine 
{
    renderer : THREE.WebGLRenderer;
    scene : THREE.Scene;
    cam1 : THREE.PerspectiveCamera;
    canvas: HTMLCanvasElement;
    raycast: THREE.Raycaster;

    updateList : THREE.Mesh[];
    onSelectCallback: (name:string)=>void;

    constructor(canvas: HTMLCanvasElement) 
    {
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.canvas = canvas;
        let aspect = canvas.width / canvas.height;
        const fov = 60;
        const near = 0.1;
        const far = 5;
        this.cam1 = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.cam1.position.setZ(4);
        this.cam1.position.setX(4);

        this.scene = new THREE.Scene();
        this.raycast = new THREE.Raycaster();;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(-1, 2, 4);
        this.scene.add(light);

        requestAnimationFrame(this.render);
        canvas.addEventListener('click', this.onMouseClick);
    }

    onSelect(planetName: string)
    {
        this.onSelectCallback(planetName);
    }

    setPlanet(name: string)
    {
        // first reset selection
        this.scene.children.forEach ( el => {
            if (el.type == "Mesh")
            {
                if (el.name === name)
                {
                    el.userData.selected = true;
                }
                else
                {
                    el.userData.selected = false;
                    el.position.y = 0.0;
                }
            }
        });
    }

    onMouseClick = (evt:MouseEvent) =>
    {
        let point = new THREE.Vector2;
        point.x = (evt.clientX / this.canvas.width) * 2 - 1;
        point.y = -(evt.clientY / this.canvas.height) * 2 + 1;

        this.raycast.setFromCamera( point, this.cam1 );

        // calculate objects intersecting the picking ray
        const intersects = this.raycast.intersectObjects( this.scene.children );

        // // first reset selection
        // this.scene.children.forEach ( el => {
        //     if (el.type == "Mesh")
        //     {
        //         el.userData.selected = false;
        //         el.position.y = 0.0;
        //     }
        // });

        // nothing selected
        if (intersects.length == 0)
        {
            this.onSelect('none');
        }
        else
        {
            // highlight the selected option
            for ( let i = 0; i < intersects.length; i ++ ) 
            {
                let obj = intersects[i].object as THREE.Mesh;
                //obj.userData.selected = true;
                this.onSelect(obj.name);
            }
        }
    }

    init(planets: planet[], selectCallback:(name:string)=>void)
    {

        console.log("Init Renderer");
        console.log(planets);

        this.onSelectCallback = selectCallback;

        const geometry = new THREE.IcosahedronGeometry(1, 2);
        let xOffset = 0;
        planets.forEach( (el, idx) =>
            {
                let sphere = new THREE.Mesh(geometry, new THREE.MeshToonMaterial({color: 0xff00ff}));

                sphere.userData.scl = el.radius / 100000;
                sphere.name = el.name;
                sphere.translateX( xOffset + (el.radius/ 100000));
                xOffset += (2 * (el.radius / 100000)) + 0.5;
                
                this.scene.add(sphere);
        });

    }

    updatePlanets(time:number)
    {
        this.scene.children.forEach ( el => {
            if (el.type == "Mesh")
            {
                el.scale.x = el.scale.y = el.scale.z = el.userData.scl;
                
                if (el.userData.selected === true)
                {
                    el.rotation.x = time;
                }
            }
        });
    }

    render = (time) => {
        time *= 0.001;  // convert time to seconds
       
        this.updatePlanets(time);
       
        this.renderer.render(this.scene, this.cam1);
       
        requestAnimationFrame(this.render);
      }

}