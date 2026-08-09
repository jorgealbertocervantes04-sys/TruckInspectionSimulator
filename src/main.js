import * as THREE from 'three';

const app = document.getElementById('app');

if (!app) {
    throw new Error('No se encontró #app');
}

app.innerHTML = '';


// ============================================================
// ESCENA
// ============================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x10161d);

scene.fog = new THREE.Fog(
    0x10161d,
    45,
    120
);


// ============================================================
// CÁMARA
// ============================================================

const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    300
);

camera.position.set(
    18,
    7,
    20
);


// ============================================================
// RENDER
// ============================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.15;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFShadowMap;

app.appendChild(
    renderer.domElement
);


// ============================================================
// LUCES
// ============================================================

const skyLight =
    new THREE.HemisphereLight(
        0xdcecff,
        0x20252b,
        2.4
    );

scene.add(skyLight);


const sun =
    new THREE.DirectionalLight(
        0xfff2dc,
        4
    );

sun.position.set(
    -20,
    28,
    18
);

sun.castShadow = true;

sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

sun.shadow.camera.near = 1;
sun.shadow.camera.far = 100;

sun.shadow.camera.left = -40;
sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40;
sun.shadow.camera.bottom = -40;

scene.add(sun);


const fill =
    new THREE.DirectionalLight(
        0x7da9d8,
        1.2
    );

fill.position.set(
    20,
    10,
    -20
);

scene.add(fill);


// ============================================================
// PISO
// ============================================================

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x30353a,
        roughness: 0.82,
        metalness: 0.04
    });

const floor =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            150,
            150
        ),
        floorMaterial
    );

floor.rotation.x =
    -Math.PI / 2;

floor.receiveShadow = true;

scene.add(floor);


// ============================================================
// MATERIALES
// ============================================================

const paint =
    new THREE.MeshStandardMaterial({
        color: 0xb93612,
        roughness: 0.25,
        metalness: 0.55
    });

const paintDark =
    new THREE.MeshStandardMaterial({
        color: 0x6d1c0a,
        roughness: 0.32,
        metalness: 0.42
    });

const black =
    new THREE.MeshStandardMaterial({
        color: 0x050607,
        roughness: 0.82,
        metalness: 0.05
    });

const tireMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x020303,
        roughness: 0.98
    });

const chrome =
    new THREE.MeshStandardMaterial({
        color: 0xbfc5ca,
        roughness: 0.15,
        metalness: 0.98
    });

const aluminum =
    new THREE.MeshStandardMaterial({
        color: 0x858c91,
        roughness: 0.28,
        metalness: 0.9
    });

const glass =
    new THREE.MeshStandardMaterial({
        color: 0x102d3e,
        roughness: 0.06,
        metalness: 0.55
    });

const trailerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xd1d3d2,
        roughness: 0.45,
        metalness: 0.15
    });

const darkGlass =
    new THREE.MeshStandardMaterial({
        color: 0x061018,
        roughness: 0.08,
        metalness: 0.6
    });

const headlight =
    new THREE.MeshStandardMaterial({
        color: 0xffffe8,
        emissive: 0xffd86a,
        emissiveIntensity: 4
    });

const amber =
    new THREE.MeshStandardMaterial({
        color: 0xff6a00,
        emissive: 0xff3000,
        emissiveIntensity: 2.5
    });

const redLight =
    new THREE.MeshStandardMaterial({
        color: 0xff1010,
        emissive: 0xaa0000,
        emissiveIntensity: 2.5
    });


// ============================================================
// GRUPO PRINCIPAL
// ============================================================

const truck =
    new THREE.Group();

scene.add(truck);


// ============================================================
// FUNCIONES
// ============================================================

function cube(
    w,
    h,
    d,
    material,
    x,
    y,
    z
) {

    const mesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                w,
                h,
                d
            ),
            material
        );

    mesh.position.set(
        x,
        y,
        z
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    truck.add(mesh);

    return mesh;
}


function cylinder(
    radius,
    depth,
    material,
    x,
    y,
    z,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0
) {

    const mesh =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                radius,
                radius,
                depth,
                32
            ),
            material
        );

    mesh.position.set(
        x,
        y,
        z
    );

    mesh.rotation.set(
        rotationX,
        rotationY,
        rotationZ
    );

    mesh.castShadow = true;

    truck.add(mesh);

    return mesh;
}


// ============================================================
// CHASIS
// ============================================================

cube(
    14,
    0.38,
    1.85,
    black,
    -0.2,
    1.2,
    0
);


// Largueros

cube(
    13,
    0.22,
    0.28,
    aluminum,
    -0.2,
    1.48,
    0.72
);

cube(
    13,
    0.22,
    0.28,
    aluminum,
    -0.2,
    1.48,
    -0.72
);


// ============================================================
// CABINA MODERNA
// ============================================================

// Parte baja

cube(
    3.9,
    0.85,
    2.7,
    paintDark,
    -6.15,
    1.72,
    0
);


// Cuerpo principal

cube(
    3.5,
    2.55,
    2.58,
    paint,
    -6.25,
    3.25,
    0
);


// Parte frontal inclinada visual

cube(
    0.72,
    1.7,
    2.62,
    paint,
    -8.05,
    2.65,
    0
);


// Techo

cube(
    3.7,
    0.2,
    2.65,
    paint,
    -6.25,
    4.58,
    0
);


// ============================================================
// PARABRISAS
// ============================================================

cube(
    0.055,
    1.25,
    1.0,
    glass,
    -8.18,
    3.65,
    0.55
);

cube(
    0.055,
    1.25,
    1.0,
    glass,
    -8.18,
    3.65,
    -0.55
);


// Pilar central

cube(
    0.08,
    1.32,
    0.08,
    black,
    -8.22,
    3.65,
    0
);


// ============================================================
// VENTANAS LATERALES
// ============================================================

cube(
    1.4,
    1.05,
    0.06,
    darkGlass,
    -6.45,
    3.55,
    1.31
);

cube(
    1.4,
    1.05,
    0.06,
    darkGlass,
    -6.45,
    3.55,
    -1.31
);


// Marcos inferiores

cube(
    1.45,
    0.07,
    0.08,
    black,
    -6.45,
    2.98,
    1.35
);

cube(
    1.45,
    0.07,
    0.08,
    black,
    -6.45,
    2.98,
    -1.35
);


// ============================================================
// PARRILLA GRANDE
// ============================================================

cube(
    0.12,
    1.25,
    1.9,
    chrome,
    -8.5,
    2.35,
    0
);

cube(
    0.08,
    0.98,
    1.62,
    black,
    -8.58,
    2.35,
    0
);


// Barras horizontales

for (
    let z = -0.62;
    z <= 0.62;
    z += 0.25
) {

    cube(
        0.045,
        0.055,
        1.5,
        chrome,
        -8.64,
        2.35,
        z
    );
}


// ============================================================
// DEFENSA
// ============================================================

cube(
    0.48,
    0.42,
    2.9,
    chrome,
    -8.75,
    1.05,
    0
);


// ============================================================
// FAROS MODERNOS
// ============================================================

function lightUnit(z) {

    cube(
        0.08,
        0.4,
        0.62,
        black,
        -8.72,
        1.7,
        z
    );

    cube(
        0.055,
        0.28,
        0.44,
        headlight,
        -8.77,
        1.7,
        z
    );

    cube(
        0.055,
        0.12,
        0.22,
        amber,
        -8.78,
        1.38,
        z
    );
}

lightUnit(0.8);
lightUnit(-0.8);


// ============================================================
// ESPEJOS
// ============================================================

function mirror(z) {

    cube(
        0.7,
        0.055,
        0.055,
        chrome,
        -7.45,
        3.35,
        z
    );

    cube(
        0.16,
        0.55,
        0.5,
        black,
        -7.05,
        3.35,
        z
    );

    cube(
        0.035,
        0.37,
        0.32,
        glass,
        -6.96,
        3.35,
        z
    );
}

mirror(1.55);
mirror(-1.55);


// ============================================================
// MANIJAS
// ============================================================

cube(
    0.35,
    0.06,
    0.05,
    chrome,
    -5.75,
    2.65,
    1.32
);

cube(
    0.35,
    0.06,
    0.05,
    chrome,
    -5.75,
    2.65,
    -1.32
);


// ============================================================
// TANQUES
// ============================================================

cylinder(
    0.5,
    2.7,
    chrome,
    -3.0,
    1.62,
    1.18,
    0,
    0,
    Math.PI / 2
);


// Soportes del tanque

cube(
    0.18,
    0.7,
    1.05,
    black,
    -3.75,
    1.6,
    1.18
);

cube(
    0.18,
    0.7,
    1.05,
    black,
    -2.25,
    1.6,
    1.18
);


// ============================================================
// ESCAPES
// ============================================================

function exhaust(z) {

    cylinder(
        0.17,
        3.2,
        chrome,
        -4.25,
        3.0,
        z
    );

    cylinder(
        0.21,
        0.18,
        black,
        -4.25,
        4.65,
        z
    );
}

exhaust(1.05);
exhaust(-1.05);


// ============================================================
// QUINTA RUEDA
// ============================================================

cylinder(
    1.05,
    0.22,
    black,
    1.3,
    1.48,
    0,
    Math.PI / 2
);


// ============================================================
// REMOLQUE
// ============================================================

cube(
    12.2,
    3.85,
    2.78,
    trailerMaterial,
    7.0,
    3.3,
    0
);


// Techo

cube(
    12.35,
    0.18,
    2.9,
    aluminum,
    7,
    5.28,
    0
);


// Parte inferior

cube(
    12.3,
    0.16,
    2.9,
    aluminum,
    7,
    1.36,
    0
);


// ============================================================
// PANELES LATERALES
// ============================================================

for (
    let x = 1.25;
    x <= 12.75;
    x += 0.85
) {

    cube(
        0.035,
        3.55,
        0.035,
        aluminum,
        x,
        3.3,
        1.405
    );
}


// ============================================================
// PUERTAS TRASERAS
// ============================================================

cube(
    0.12,
    3.55,
    1.32,
    trailerMaterial,
    13.15,
    3.3,
    0.68
);

cube(
    0.12,
    3.55,
    1.32,
    trailerMaterial,
    13.15,
    3.3,
    -0.68
);


// Marco central

cube(
    0.15,
    3.65,
    0.12,
    aluminum,
    13.23,
    3.3,
    0
);


// ============================================================
// LUCES TRASERAS
// ============================================================

cube(
    0.08,
    0.3,
    0.38,
    redLight,
    13.25,
    1.8,
    0.78
);

cube(
    0.08,
    0.3,
    0.38,
    redLight,
    13.25,
    1.8,
    -0.78
);


// ============================================================
// RUEDAS
// ============================================================

function createWheel(x, z) {

    const group =
        new THREE.Group();

    group.position.set(
        x,
        0.86,
        z
    );


    // Neumático

    const tire =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.8,
                0.8,
                0.56,
                40
            ),
            tireMaterial
        );

    tire.rotation.x =
        Math.PI / 2;

    tire.castShadow = true;

    group.add(tire);


    // Rin

    const rim =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.45,
                0.45,
                0.59,
                32
            ),
            chrome
        );

    rim.rotation.x =
        Math.PI / 2;

    group.add(rim);


    // Centro

    const hub =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.15,
                0.15,
                0.63,
                24
            ),
            aluminum
        );

    hub.rotation.x =
        Math.PI / 2;

    group.add(hub);


    // Birlos

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const angle =
            (Math.PI * 2 * i) / 8;

        const bolt =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.045,
                    0.045,
                    0.64,
                    12
                ),
                chrome
            );

        bolt.rotation.x =
            Math.PI / 2;

        bolt.position.x =
            Math.cos(angle) * 0.28;

        bolt.position.y =
            Math.sin(angle) * 0.28;

        group.add(bolt);
    }


    truck.add(group);
}


// Tractor

createWheel(-6.5, 1.42);
createWheel(-6.5, -1.42);

createWheel(-3.0, 1.42);
createWheel(-3.0, -1.42);

createWheel(-1.5, 1.42);
createWheel(-1.5, -1.42);


// Trailer

createWheel(6.0, 1.47);
createWheel(6.0, -1.47);

createWheel(7.55, 1.47);
createWheel(7.55, -1.47);


// ============================================================
// GUARDABARROS
// ============================================================

function mudguard(x, z) {

    cube(
        2.5,
        0.18,
        0.32,
        black,
        x,
        1.55,
        z
    );
}

mudguard(-2.2, 1.48);
mudguard(-2.2, -1.48);

mudguard(6.75, 1.53);
mudguard(6.75, -1.53);

mudguard(8.0, 1.53);
mudguard(8.0, -1.53);


// ============================================================
// INTERACCIÓN DE CÁMARA
// ============================================================

let dragging = false;

let lastX = 0;
let lastY = 0;

let rotation = 0.55;

let distance = 30;

let cameraHeight = 7.5;


renderer.domElement.style.cursor = 'grab';

renderer.domElement.style.touchAction = 'none';


renderer.domElement.addEventListener(
    'pointerdown',
    (event) => {

        dragging = true;

        lastX =
            event.clientX;

        lastY =
            event.clientY;

        renderer.domElement.style.cursor =
            'grabbing';
    }
);


renderer.domElement.addEventListener(
    'pointermove',
    (event) => {

        if (!dragging) {
            return;
        }

        const dx =
            event.clientX - lastX;

        const dy =
            event.clientY - lastY;


        rotation -=
            dx * 0.006;


        cameraHeight -=
            dy * 0.025;


        cameraHeight =
            THREE.MathUtils.clamp(
                cameraHeight,
                3.5,
                14
            );


        lastX =
            event.clientX;

        lastY =
            event.clientY;
    }
);


renderer.domElement.addEventListener(
    'pointerup',
    () => {

        dragging = false;

        renderer.domElement.style.cursor =
            'grab';
    }
);


renderer.domElement.addEventListener(
    'pointerleave',
    () => {

        dragging = false;

        renderer.domElement.style.cursor =
            'grab';
    }
);


renderer.domElement.addEventListener(
    'wheel',
    (event) => {

        event.preventDefault();

        distance +=
            event.deltaY * 0.018;

        distance =
            THREE.MathUtils.clamp(
                distance,
                12,
                55
            );
    },
    {
        passive: false
    }
);


// ============================================================
// CÁMARA
// ============================================================

function updateCamera() {

    camera.position.x =
        Math.cos(rotation) *
        distance;

    camera.position.z =
        Math.sin(rotation) *
        distance;

    camera.position.y =
        cameraHeight;

    camera.lookAt(
        0,
        2.5,
        0
    );
}


// ============================================================
// ANIMACIÓN
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );

    updateCamera();

    renderer.render(
        scene,
        camera
    );
}

animate();


// ============================================================
// RESIZE
// ============================================================

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