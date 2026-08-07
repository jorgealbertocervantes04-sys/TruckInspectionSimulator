import * as THREE from 'three';
import { Truck } from './Truck.js';

export class App {

    constructor() {

        this.scene = new THREE.Scene();

        this.scene.background =
            new THREE.Color(0x111419);

        this.camera =
            new THREE.PerspectiveCamera(
                45,
                window.innerWidth /
                window.innerHeight,
                0.1,
                1000
            );

        this.camera.position.set(
            -14,
            6,
            14
        );

        this.renderer =
            new THREE.WebGLRenderer({
                antialias: true
            });

        this.controls = null;

        this.clock =
            new THREE.Clock();
        this.truck = null;
    }

    createTruck() {
        this.truck =
            new Truck(
                this.scene
            );
    }

    start() {

        this.setupRenderer();

        this.setupCamera();

        this.setupLighting();

        this.createEnvironment();

     this.createTruck();

        this.setupEvents();

        this.animate();

    }

    setupRenderer() {

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

        this.renderer.shadowMap.enabled =
            true;

        this.renderer.shadowMap.type =
            THREE.PCFSoftShadowMap;

        this.renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        this.renderer.toneMapping =
            THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure =
            1.1;

        document
            .getElementById('app')
            .appendChild(
                this.renderer.domElement
            );

    }

    setupCamera() {

        this.camera.position.set(
            10,
            5.5,
            13
        );

    }

    setupLighting() {

        const hemisphere =
            new THREE.HemisphereLight(
                0xdde7ff,
                0x252931,
                1.8
            );

        this.scene.add(
            hemisphere
        );


        const sun =
            new THREE.DirectionalLight(
                0xfff3df,
                3.2
            );

        sun.position.set(
            10,
            18,
            8
        );

        sun.castShadow = true;

        sun.shadow.mapSize.width =
            2048;

        sun.shadow.mapSize.height =
            2048;

        sun.shadow.camera.near =
            0.5;

        sun.shadow.camera.far =
            80;

        sun.shadow.camera.left =
            -30;

        sun.shadow.camera.right =
            30;

        sun.shadow.camera.top =
            30;

        sun.shadow.camera.bottom =
            -30;

        this.scene.add(
            sun
        );


        const fill =
            new THREE.DirectionalLight(
                0x7c96ff,
                0.7
            );

        fill.position.set(
            -12,
            7,
            -15
        );

        this.scene.add(
            fill
        );

    }

    createEnvironment() {

        this.createGround();

        this.createParkingLines();

        this.createBackdrop();

    }

    createGround() {

        const geometry =
            new THREE.PlaneGeometry(
                120,
                120
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x252a31,
                roughness: 0.92,
                metalness: 0.05
            });

        const ground =
            new THREE.Mesh(
                geometry,
                material
            );

        ground.rotation.x =
            -Math.PI / 2;

        ground.receiveShadow = true;

        this.scene.add(
            ground
        );

    }

    createParkingLines() {

        const material =
            new THREE.MeshBasicMaterial({
                color: 0xb8b8ad
            });


        for (
            let x = -30;
            x <= 30;
            x += 10
        ) {

            const line =
                new THREE.Mesh(
                    new THREE.PlaneGeometry(
                        0.08,
                        70
                    ),
                    material
                );

            line.rotation.x =
                -Math.PI / 2;

            line.position.set(
                x,
                0.012,
                0
            );

            this.scene.add(
                line
            );

        }


        const centerLine =
            new THREE.Mesh(
                new THREE.PlaneGeometry(
                    70,
                    0.08
                ),
                material
            );

        centerLine.rotation.x =
            -Math.PI / 2;

        centerLine.position.y =
            0.014;

        this.scene.add(
            centerLine
        );

    }

    createBackdrop() {

        const geometry =
            new THREE.PlaneGeometry(
                120,
                40
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0x15181d
            });

        const wall =
            new THREE.Mesh(
                geometry,
                material
            );

        wall.position.set(
            0,
            20,
            -35
        );

        this.scene.add(
            wall
        );

    }

   
    setupEvents() {

        this.controls =
            new OrbitControls(
                this.camera,
                this.renderer.domElement
            );

        this.controls.enableDamping =
            true;

        this.controls.dampingFactor =
            0.06;

        this.controls.enablePan =
            false;

        this.controls.minDistance =
            5;

        this.controls.maxDistance =
            35;

        this.controls.minPolarAngle =
            0.35;

        this.controls.maxPolarAngle =
            Math.PI / 2.05;

        this.controls.target.set(
            0,
            1,
            0
        );

        this.controls.update();


        window.addEventListener(
            'resize',
            () => this.resize()
        );

    }

    animate() {

        requestAnimationFrame(
            () => this.animate()
        );

        const elapsed =
            this.clock.getElapsedTime();


    

        if (this.controls) {

            this.controls.update();

        }


        this.renderer.render(
            this.scene,
            this.camera
        );

    }

    resize() {

        this.camera.aspect =
            window.innerWidth /
            window.innerHeight;

        this.camera.updateProjectionMatrix();


        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

}