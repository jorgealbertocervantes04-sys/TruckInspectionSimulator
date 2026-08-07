import * as THREE from 'three';
import { Wheel } from './Wheel.js';

export class Truck {

    constructor(scene) {

        this.scene = scene;

        this.root = new THREE.Group();

        this.root.name = 'TRACTOCAMION';

        this.scene.add(this.root);

        this.parts = {};

        this.createMaterials();

        this.build();
    }


    createMaterials() {

        this.paint = new THREE.MeshStandardMaterial({
            color: 0xc9470b,
            roughness: 0.28,
            metalness: 0.4
        });

        this.paintDark = new THREE.MeshStandardMaterial({
            color: 0x8e3008,
            roughness: 0.35,
            metalness: 0.35
        });

        this.black = new THREE.MeshStandardMaterial({
            color: 0x0c0d0f,
            roughness: 0.88,
            metalness: 0.05
        });

        this.glass = new THREE.MeshStandardMaterial({
            color: 0x142a3b,
            roughness: 0.12,
            metalness: 0.35
        });

        this.chrome = new THREE.MeshStandardMaterial({
            color: 0xc5c9cc,
            roughness: 0.18,
            metalness: 0.92
        });

        this.steel = new THREE.MeshStandardMaterial({
            color: 0x555b62,
            roughness: 0.48,
            metalness: 0.75
        });

        this.trailer = new THREE.MeshStandardMaterial({
            color: 0xd8d6ce,
            roughness: 0.52,
            metalness: 0.12
        });

        this.red = new THREE.MeshStandardMaterial({
            color: 0x8e1616,
            emissive: 0x5d0808,
            emissiveIntensity: 1.1
        });

        this.yellow = new THREE.MeshStandardMaterial({
            color: 0xffdf78,
            emissive: 0xff9d00,
            emissiveIntensity: 1.3
        });
    }


    addBox(
        name,
        width,
        height,
        depth,
        material,
        x,
        y,
        z
    ) {

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            material
        );

        mesh.name = name;

        mesh.position.set(
            x,
            y,
            z
        );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.root.add(mesh);

        this.parts[name] = mesh;

        return mesh;
    }


    build() {

        this.createChassis();

        this.createCab();

        this.createTrailer();

        this.createWheels();
    }


    createChassis() {

        this.addBox(
            'CHASIS',
            10,
            0.32,
            1.65,
            this.black,
            -0.4,
            1.05,
            0
        );


        this.addBox(
            'QUINTA_RUEDA',
            1.55,
            0.22,
            1.55,
            this.steel,
            -1.75,
            1.35,
            0
        );


        const tankLeft = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.42,
                0.42,
                2.0,
                24
            ),
            this.chrome
        );

        tankLeft.rotation.z = Math.PI / 2;

        tankLeft.position.set(
            -2.65,
            0.78,
            1.18
        );

        tankLeft.castShadow = true;

        this.root.add(tankLeft);


        const tankRight = tankLeft.clone();

        tankRight.position.z = -1.18;

        this.root.add(tankRight);
    }


    createCab() {

        /*
         * CABINA INFERIOR
         */

        this.addBox(
            'CABINA_BASE',
            3.35,
            1.45,
            2.18,
            this.paint,
            -5.25,
            1.95,
            0
        );


        /*
         * CABINA SUPERIOR
         */

        this.addBox(
            'CABINA_SUPERIOR',
            2.85,
            1.65,
            2.06,
            this.paint,
            -5.05,
            3.35,
            0
        );


        /*
         * TECHO
         */

        this.addBox(
            'TECHO',
            3.02,
            0.18,
            2.16,
            this.paint,
            -5.05,
            4.22,
            0
        );


        /*
         * PARABRISAS
         */

        this.addBox(
            'PARABRISAS',
            0.08,
            0.92,
            1.72,
            this.glass,
            -6.52,
            3.42,
            0
        );


        /*
         * VENTANA LATERAL IZQUIERDA
         */

        this.addBox(
            'VENTANA_IZQUIERDA',
            1.30,
            0.78,
            0.07,
            this.glass,
            -5.05,
            3.42,
            1.05
        );


        /*
         * VENTANA LATERAL DERECHA
         */

        this.addBox(
            'VENTANA_DERECHA',
            1.30,
            0.78,
            0.07,
            this.glass,
            -5.05,
            3.42,
            -1.05
        );


        /*
         * PUERTAS
         */

        this.addBox(
            'PUERTA_IZQUIERDA',
            1.60,
            1.15,
            0.07,
            this.paint,
            -4.72,
            2.25,
            1.10
        );


        this.addBox(
            'PUERTA_DERECHA',
            1.60,
            1.15,
            0.07,
            this.paint,
            -4.72,
            2.25,
            -1.10
        );


        /*
         * COFRE / FRENTE
         */

        this.addBox(
            'FRENTE',
            0.55,
            1.25,
            2.20,
            this.paintDark,
            -6.70,
            1.95,
            0
        );


        /*
         * PARRILLA
         */

        this.addBox(
            'PARRILLA',
            0.10,
            0.75,
            1.35,
            this.black,
            -6.99,
            2.08,
            0
        );


        /*
         * DEFENSA
         */

        this.addBox(
            'DEFENSA',
            0.35,
            0.40,
            2.38,
            this.chrome,
            -7.05,
            1.28,
            0
        );


        /*
         * FAROS
         */

        this.addBox(
            'FARO_IZQUIERDO',
            0.10,
            0.32,
            0.46,
            this.yellow,
            -7.12,
            1.70,
            0.72
        );


        this.addBox(
            'FARO_DERECHO',
            0.10,
            0.32,
            0.46,
            this.yellow,
            -7.12,
            1.70,
            -0.72
        );


        /*
         * ESPEJOS
         */

        this.addBox(
            'ESPEJO_IZQUIERDO',
            0.12,
            0.52,
            0.48,
            this.glass,
            -5.95,
            3.55,
            1.43
        );


        this.addBox(
            'ESPEJO_DERECHO',
            0.12,
            0.52,
            0.48,
            this.glass,
            -5.95,
            3.55,
            -1.43
        );


        /*
         * ESCAPE
         */

        const exhaust = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.14,
                0.14,
                2.8,
                20
            ),
            this.chrome
        );

        exhaust.position.set(
            -3.55,
            2.55,
            1.35
        );

        exhaust.castShadow = true;

        this.root.add(exhaust);
    }


    createTrailer() {

        this.addBox(
            'REMOLQUE',
            11.8,
            3.25,
            2.55,
            this.trailer,
            7.15,
            2.65,
            0
        );


        this.addBox(
            'FRANJA_NARANJA',
            11.85,
            0.16,
            2.58,
            this.paint,
            7.15,
            1.48,
            0
        );


        /*
         * ESTRUCTURA TRASERA
         */

        this.addBox(
            'MARCO_TRASERO',
            0.16,
            3.2,
            2.60,
            this.steel,
            13.12,
            2.65,
            0
        );


        /*
         * PUERTAS
         */

        this.addBox(
            'PUERTA_TRASERA_IZQUIERDA',
            0.12,
            3.0,
            1.22,
            this.trailer,
            13.20,
            2.65,
            0.63
        );


        this.addBox(
            'PUERTA_TRASERA_DERECHA',
            0.12,
            3.0,
            1.22,
            this.trailer,
            13.20,
            2.65,
            -0.63
        );


        /*
         * LUCES TRASERAS
         */

        this.addBox(
            'LUZ_TRASERA_IZQUIERDA',
            0.14,
            0.38,
            0.38,
            this.red,
            13.30,
            1.52,
            0.98
        );


        this.addBox(
            'LUZ_TRASERA_DERECHA',
            0.14,
            0.38,
            0.38,
            this.red,
            13.30,
            1.52,
            -0.98
        );
    }


    createWheel(
        x,
        z,
        name
    ) {

        const wheel = new Wheel({
            name: name,
            radius: 0.72,
            width: 0.52
        });


        wheel.setPosition(
            x,
            0.78,
            z
        );


        this.root.add(
            wheel.getObject()
        );


        this.parts[name] =
            wheel.getObject();


        return wheel;
    }


    createWheels() {

        /*
         * EJE DELANTERO
         */

        this.createWheel(
            -5.25,
            1.20,
            'LLANTA_DELANTERA_IZQUIERDA'
        );

        this.createWheel(
            -5.25,
            -1.20,
            'LLANTA_DELANTERA_DERECHA'
        );


        /*
         * TANDEM DEL TRACTOR
         */

        this.createWheel(
            -1.35,
            1.20,
            'LLANTA_TRACTOR_1_IZQUIERDA'
        );

        this.createWheel(
            -1.35,
            -1.20,
            'LLANTA_TRACTOR_1_DERECHA'
        );


        this.createWheel(
            0.10,
            1.20,
            'LLANTA_TRACTOR_2_IZQUIERDA'
        );

        this.createWheel(
            0.10,
            -1.20,
            'LLANTA_TRACTOR_2_DERECHA'
        );


        /*
         * TANDEM DEL REMOLQUE
         */

        this.createWheel(
            7.80,
            1.20,
            'LLANTA_REMOLQUE_1_IZQUIERDA'
        );

        this.createWheel(
            7.80,
            -1.20,
            'LLANTA_REMOLQUE_1_DERECHA'
        );


        this.createWheel(
            9.20,
            1.20,
            'LLANTA_REMOLQUE_2_IZQUIERDA'
        );

        this.createWheel(
            9.20,
            -1.20,
            'LLANTA_REMOLQUE_2_DERECHA'
        );
    }
}