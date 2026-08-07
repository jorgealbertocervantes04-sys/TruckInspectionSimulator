import * as THREE from 'three';
import { Truck } from './Truck.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x15181f);


// CÁMARA

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200
);

camera.position.set(-14, 6, 14);

camera.lookAt(2, 2, 0);


// RENDERER

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(1);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = false;

document.body.appendChild(
    renderer.domElement
);


// ILUMINACIÓN

const ambientLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x303540,
        2
    );

scene.add(ambientLight);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

sun.position.set(
    -10,
    20,
    15
);

scene.add(sun);


// PISO

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x292d34,
        roughness: 0.9,
        metalness: 0.05
    });

const floor =
    new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        floorMaterial
    );

floor.rotation.x = -Math.PI / 2;

floor.position.y = 0;

scene.add(floor);


// TRACTOCAMIÓN

const truck = new Truck(scene);


// ANIMACIÓN

function animate() {

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );
}

animate();


// RESIZE

window.addEventListener(
    'resize',
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);