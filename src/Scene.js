import * as THREE from "three";

export class Scene3D {

    constructor() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x1b1e24);

        this.camera = new THREE.PerspectiveCamera(

            60,

            window.innerWidth / window.innerHeight,

            0.1,

            1000

        );

        this.camera.position.set(8,6,10);

        this.renderer = new THREE.WebGLRenderer({

            antialias:true

        });

    }

    init(){

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.shadowMap.enabled=true;

        document.body.appendChild(

            this.renderer.domElement

        );

        this.createLights();

        this.createGround();

        this.animate();

        window.addEventListener(

            "resize",

            ()=>this.resize()

        );

    }

    createLights(){

        const ambient=

        new THREE.AmbientLight(

            0xffffff,

            0.5

        );

        this.scene.add(

            ambient

        );

        const sun=

        new THREE.DirectionalLight(

            0xffffff,

            2

        );

        sun.position.set(

            10,

            20,

            10

        );

        sun.castShadow=true;

        this.scene.add(

            sun

        );

    }

    createGround(){

        const geometry=

        new THREE.PlaneGeometry(

            100,

            100

        );

        const material=

        new THREE.MeshStandardMaterial({

            color:0x40444f,

            roughness:0.95

        });

        const ground=

        new THREE.Mesh(

            geometry,

            material

        );

        ground.rotation.x=

        -Math.PI/2;

        ground.receiveShadow=true;

        this.scene.add(

            ground

        );

    }

    animate=()=>{

        requestAnimationFrame(

            this.animate

        );

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    resize(){

        this.camera.aspect=

        window.innerWidth/

        window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

}