import * as THREE from 'three';
import { Wheel } from './Wheel.js';

export class Truck {

    constructor(scene) {

        this.scene = scene;

        this.group = new THREE.Group();

        this.group.name = 'TRACTOCAMION';

        this.scene.add(this.group);

        this.createMaterials();

        this.buildCab();

        this.buildChassis();

        this.buildFuelTanks();

        this.buildExhaust();

        this.buildFifthWheel();

        this.buildTrailer();

        this.buildWheels();

        this.buildLights();

        this.buildMirrors();

        this.buildDetails();
    }


    // =========================================================
    // MATERIALES
    // =========================================================

    createMaterials() {

        this.paint = new THREE.MeshStandardMaterial({
            color: 0xc94f0c,
            roughness: 0.34,
            metalness: 0.42
        });

        this.paintDark = new THREE.MeshStandardMaterial({
            color: 0x8d3509,
            roughness: 0.4,
            metalness: 0.35
        });

        this.paintBlack = new THREE.MeshStandardMaterial({
            color: 0x111214,
            roughness: 0.52,
            metalness: 0.25
        });

        this.glass = new THREE.MeshStandardMaterial({
            color: 0x172833,
            roughness: 0.12,
            metalness: 0.72,
            transparent: true,
            opacity: 0.86
        });

        this.chrome = new THREE.MeshStandardMaterial({
            color: 0xbfc4c9,
            roughness: 0.18,
            metalness: 0.95
        });

        this.steel = new THREE.MeshStandardMaterial({
            color: 0x4d535b,
            roughness: 0.55,
            metalness: 0.82
        });

        this.darkSteel = new THREE.MeshStandardMaterial({
            color: 0x25292e,
            roughness: 0.6,
            metalness: 0.72
        });

        this.rubber = new THREE.MeshStandardMaterial({
            color: 0x08090a,
            roughness: 0.95,
            metalness: 0.01
        });

        this.trailer = new THREE.MeshStandardMaterial({
            color: 0xd8d5cb,
            roughness: 0.52,
            metalness: 0.12
        });

        this.trailerDark = new THREE.MeshStandardMaterial({
            color: 0xaaa79f,
            roughness: 0.58,
            metalness: 0.16
        });

        this.orange = new THREE.MeshStandardMaterial({
            color: 0xe8590c,
            roughness: 0.38,
            metalness: 0.32
        });

        this.yellow = new THREE.MeshStandardMaterial({
            color: 0xf2bd32,
            emissive: 0x5c3905,
            emissiveIntensity: 0.35
        });

        this.redLight = new THREE.MeshStandardMaterial({
            color: 0xa91f1b,
            emissive: 0x6e0907,
            emissiveIntensity: 0.8
        });

        this.whiteLight = new THREE.MeshStandardMaterial({
            color: 0xfff1bd,
            emissive: 0xffc94a,
            emissiveIntensity: 1.0
        });
    }


    // =========================================================
    // HELPERS
    // =========================================================

    box(
        width,
        height,
        depth,
        material,
        x,
        y,
        z,
        bevel = 0
    ) {

        let geometry;

        if (bevel > 0) {

            geometry =
                new THREE.BoxGeometry(
                    width,
                    height,
                    depth,
                    2,
                    2,
                    2
                );

        } else {

            geometry =
                new THREE.BoxGeometry(
                    width,
                    height,
                    depth
                );
        }

        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        mesh.position.set(
            x,
            y,
            z
        );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

        return mesh;
    }


    cylinder(
        radiusTop,
        radiusBottom,
        height,
        material,
        x,
        y,
        z,
        radialSegments = 20,
        rotationX = 0,
        rotationY = 0,
        rotationZ = 0
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                radiusTop,
                radiusBottom,
                height,
                radialSegments
            );

        const mesh =
            new THREE.Mesh(
                geometry,
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
        mesh.receiveShadow = true;

        this.group.add(mesh);

        return mesh;
    }


    // =========================================================
    // CABINA
    // =========================================================

    buildCab() {

        // Parte inferior de la cabina
        this.box(
            2.65,
            1.35,
            2.25,
            this.paint,
            -10.0,
            1.42,
            0
        );


        // Cabina superior
        this.box(
            2.45,
            1.55,
            2.15,
            this.paint,
            -10.0,
            2.68,
            0
        );


        // Techo
        this.box(
            2.52,
            0.18,
            2.22,
            this.paintDark,
            -10.0,
            3.48,
            0
        );


        // Cofre delantero
        this.box(
            1.35,
            0.88,
            2.12,
            this.paintDark,
            -11.05,
            1.42,
            0
        );


        // Capó superior
        this.box(
            1.20,
            0.22,
            2.04,
            this.paint,
            -11.08,
            1.90,
            0
        );


        // Frente negro
        this.box(
            0.12,
            0.72,
            1.95,
            this.paintBlack,
            -11.73,
            1.42,
            0
        );


        // Parrilla
        this.box(
            0.055,
            0.47,
            1.35,
            this.darkSteel,
            -11.80,
            1.43,
            0
        );


        // Barras horizontales de parrilla
        for (
            let i = -2;
            i <= 2;
            i++
        ) {

            this.box(
                0.075,
                0.055,
                1.45,
                this.chrome,
                -11.84,
                1.43 + i * 0.10,
                0
            );
        }


        // Defensa
        this.box(
            0.32,
            0.38,
            2.30,
            this.chrome,
            -11.92,
            0.72,
            0
        );


        // Parte negra inferior
        this.box(
            0.16,
            0.28,
            2.22,
            this.paintBlack,
            -11.96,
            0.52,
            0
        );


        // =====================================================
        // PARABRISAS
        // =====================================================

        this.box(
            0.06,
            0.70,
            0.91,
            this.glass,
            -11.23,
            2.73,
            0.52
        );

        this.box(
            0.06,
            0.70,
            0.91,
            this.glass,
            -11.23,
            2.73,
            -0.52
        );


        // Marco central del parabrisas
        this.box(
            0.08,
            0.77,
            0.07,
            this.paintBlack,
            -11.27,
            2.73,
            0
        );


        // Marco inferior
        this.box(
            0.08,
            0.08,
            1.95,
            this.paintDark,
            -11.28,
            2.31,
            0
        );


        // =====================================================
        // VENTANAS LATERALES
        // =====================================================

        this.box(
            0.92,
            0.62,
            0.06,
            this.glass,
            -9.75,
            2.70,
            1.08
        );

        this.box(
            0.92,
            0.62,
            0.06,
            this.glass,
            -9.75,
            2.70,
            -1.08
        );


        // Marcos laterales
        this.box(
            0.96,
            0.055,
            0.08,
            this.paintBlack,
            -9.75,
            2.38,
            1.10
        );

        this.box(
            0.96,
            0.055,
            0.08,
            this.paintBlack,
            -9.75,
            3.02,
            1.10
        );


        // =====================================================
        // PUERTAS
        // =====================================================

        this.box(
            0.95,
            0.95,
            0.045,
            this.paintDark,
            -9.72,
            1.55,
            1.14
        );

        this.box(
            0.95,
            0.95,
            0.045,
            this.paintDark,
            -9.72,
            1.55,
            -1.14
        );


        // Manijas
        this.box(
            0.18,
            0.045,
            0.05,
            this.chrome,
            -9.35,
            1.90,
            1.17
        );

        this.box(
            0.18,
            0.045,
            0.05,
            this.chrome,
            -9.35,
            1.90,
            -1.17
        );
    }


    // =========================================================
    // CHASIS
    // =========================================================

    buildChassis() {

        // Largueros
        this.box(
            15.0,
            0.24,
            0.22,
            this.darkSteel,
            0.5,
            0.72,
            0.78
        );

        this.box(
            15.0,
            0.24,
            0.22,
            this.darkSteel,
            0.5,
            0.72,
            -0.78
        );


        // Travesaños
        for (
            let x = -7.0;
            x <= 9.0;
            x += 2.0
        ) {

            this.box(
                0.20,
                0.20,
                1.65,
                this.steel,
                x,
                0.72,
                0
            );
        }
    }


    // =========================================================
    // TANQUES DE COMBUSTIBLE
    // =========================================================

    buildFuelTanks() {

        for (
            const z of [1.28, -1.28]
        ) {

            const tank =
                this.cylinder(
                    0.42,
                    0.42,
                    1.55,
                    this.chrome,
                    -6.15,
                    0.88,
                    z,
                    24,
                    0,
                    0,
                    Math.PI / 2
                );

            tank.name =
                'TANQUE_COMBUSTIBLE';
        }


        // Escaleras
        for (
            const z of [1.49, -1.49]
        ) {

            for (
                let y = 0.45;
                y < 1.35;
                y += 0.28
            ) {

                this.box(
                    0.10,
                    0.08,
                    0.20,
                    this.darkSteel,
                    -5.50,
                    y,
                    z
                );
            }
        }
    }


    // =========================================================
    // ESCAPE
    // =========================================================

    buildExhaust() {

        for (
            const z of [1.12, -1.12]
        ) {

            this.cylinder(
                0.13,
                0.16,
                1.95,
                this.chrome,
                -8.45,
                2.35,
                z,
                18
            );


            this.cylinder(
                0.18,
                0.13,
                0.16,
                this.chrome,
                -8.45,
                3.35,
                z,
                18
            );
        }
    }


    // =========================================================
    // QUINTA RUEDA
    // =========================================================

    buildFifthWheel() {

        const plate =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.82,
                    0.82,
                    0.18,
                    32
                ),
                this.steel
            );

        plate.position.set(
            -2.35,
            0.98,
            0
        );

        plate.rotation.x =
            Math.PI / 2;

        plate.castShadow = true;

        this.group.add(plate);


        // Guías laterales
        this.box(
            0.72,
            0.18,
            0.16,
            this.steel,
            -2.35,
            1.08,
            0.52
        );

        this.box(
            0.72,
            0.18,
            0.16,
            this.steel,
            -2.35,
            1.08,
            -0.52
        );


        // King pin
        this.cylinder(
            0.17,
            0.17,
            0.35,
            this.chrome,
            -2.35,
            1.12,
            0,
            18
        );
    }


    // =========================================================
    // REMOLQUE
    // =========================================================

    buildTrailer() {

        // Caja principal
        this.box(
            13.0,
            2.70,
            2.42,
            this.trailer,
            5.0,
            2.20,
            0
        );


        // Techo
        this.box(
            13.08,
            0.16,
            2.48,
            this.trailerDark,
            5.0,
            3.62,
            0
        );


        // Piso
        this.box(
            13.1,
            0.18,
            2.50,
            this.darkSteel,
            5.0,
            0.82,
            0
        );


        // Banda naranja
        this.box(
            12.7,
            0.18,
            0.035,
            this.orange,
            5.0,
            1.25,
            1.225
        );

        this.box(
            12.7,
            0.18,
            0.035,
            this.orange,
            5.0,
            1.25,
            -1.225
        );


        // Postes verticales
        for (
            let x = -1.0;
            x <= 11.0;
            x += 2
        ) {

            this.box(
                0.06,
                2.55,
                0.06,
                this.trailerDark,
                x,
                2.20,
                1.225
            );

            this.box(
                0.06,
                2.55,
                0.06,
                this.trailerDark,
                x,
                2.20,
                -1.225
            );
        }


        // =====================================================
        // PUERTAS TRASERAS
        // =====================================================

        this.box(
            0.10,
            2.65,
            1.17,
            this.trailerDark,
            11.55,
            2.20,
            0.62
        );

        this.box(
            0.10,
            2.65,
            1.17,
            this.trailerDark,
            11.55,
            2.20,
            -0.62
        );


        // Bisagras
        for (
            let y = 1.20;
            y <= 3.20;
            y += 0.65
        ) {

            this.cylinder(
                0.07,
                0.07,
                0.16,
                this.chrome,
                11.63,
                y,
                1.22,
                12,
                0,
                Math.PI / 2
            );

            this.cylinder(
                0.07,
                0.07,
                0.16,
                this.chrome,
                11.63,
                y,
                -1.22,
                12,
                0,
                Math.PI / 2
            );
        }


        // Barra trasera
        this.box(
            0.20,
            0.20,
            2.55,
            this.chrome,
            11.72,
            0.62,
            0
        );


        // Guardabarros traseros
        this.box(
            2.5,
            0.14,
            0.22,
            this.darkSteel,
            7.65,
            1.08,
            1.35
        );

        this.box(
            2.5,
            0.14,
            0.22,
            this.darkSteel,
            7.65,
            1.08,
            -1.35
        );
    }


    // =========================================================
    // RUEDAS
    // =========================================================

    buildWheels() {

        const wheelPositions = [

            // Tractor delantero
            [-9.45, 0.72, 1.22],
            [-9.45, 0.72, -1.22],

            // Tractor tandem
            [-5.05, 0.72, 1.22],
            [-5.05, 0.72, -1.22],

            [-3.95, 0.72, 1.22],
            [-3.95, 0.72, -1.22],

            // Remolque
            [7.15, 0.72, 1.22],
            [7.15, 0.72, -1.22],

            [8.25, 0.72, 1.22],
            [8.25, 0.72, -1.22]
        ];


        wheelPositions.forEach(
            (position, index) => {

                const wheel =
                    new Wheel({
                        name:
                            `RUEDA_${index + 1}`,
                        radius: 0.72,
                        width: 0.56
                    });


                wheel.setPosition(
                    position[0],
                    position[1],
                    position[2]
                );


                /*
                 * Las ruedas están orientadas
                 * longitudinalmente sobre Z.
                 *
                 * No agregamos rotación adicional
                 * para conservar la orientación
                 * correcta del Wheel.js.
                 */

                this.group.add(
                    wheel.getObject()
                );
            }
        );
    }


    // =========================================================
    // LUCES
    // =========================================================

    buildLights() {

        // Faros delanteros

        this.box(
            0.08,
            0.27,
            0.42,
            this.whiteLight,
            -11.87,
            1.16,
            0.72
        );

        this.box(
            0.08,
            0.27,
            0.42,
            this.whiteLight,
            -11.87,
            1.16,
            -0.72
        );


        // Direccionales

        this.box(
            0.07,
            0.16,
            0.28,
            this.yellow,
            -11.88,
            0.94,
            0.91
        );

        this.box(
            0.07,
            0.16,
            0.28,
            this.yellow,
            -11.88,
            0.94,
            -0.91
        );


        // Luces laterales del remolque

        for (
            let x = -0.5;
            x <= 10.5;
            x += 2.2
        ) {

            this.box(
                0.20,
                0.10,
                0.045,
                this.yellow,
                x,
                1.25,
                1.25
            );

            this.box(
                0.20,
                0.10,
                0.045,
                this.yellow,
                x,
                1.25,
                -1.25
            );
        }


        // Luces traseras

        this.box(
            0.08,
            0.34,
            0.32,
            this.redLight,
            11.78,
            1.10,
            0.88
        );

        this.box(
            0.08,
            0.34,
            0.32,
            this.redLight,
            11.78,
            1.10,
            -0.88
        );


        // Luz central superior
        this.box(
            0.08,
            0.20,
            0.42,
            this.redLight,
            11.78,
            3.30,
            0
        );
    }


    // =========================================================
    // ESPEJOS
    // =========================================================

    buildMirrors() {

        for (
            const z of [1.28, -1.28]
        ) {

            // brazo
            this.box(
                0.65,
                0.06,
                0.06,
                this.darkSteel,
                -10.90,
                2.50,
                z
            );


            // carcasa
            this.box(
                0.18,
                0.40,
                0.12,
                this.paintBlack,
                -11.18,
                2.48,
                z
            );


            // cristal
            this.box(
                0.025,
                0.26,
                0.09,
                this.glass,
                -11.28,
                2.48,
                z
            );
        }
    }


    // =========================================================
    // DETALLES ADICIONALES
    // =========================================================

    buildDetails() {

        // Logo frontal
        this.box(
            0.04,
            0.22,
            0.52,
            this.chrome,
            -11.88,
            1.68,
            0
        );


        // Estribos
        for (
            const z of [1.12, -1.12]
        ) {

            this.box(
                0.55,
                0.12,
                0.42,
                this.darkSteel,
                -10.15,
                0.62,
                z
            );
        }


        // Guardabarros delanteros
        this.box(
            0.90,
            0.12,
            0.20,
            this.paintBlack,
            -9.45,
            1.22,
            1.30
        );

        this.box(
            0.90,
            0.12,
            0.20,
            this.paintBlack,
            -9.45,
            1.22,
            -1.30
        );


        // Conectores de aire
        this.cylinder(
            0.08,
            0.08,
            0.65,
            this.rubber,
            -1.65,
            1.10,
            0.58,
            12,
            0,
            0,
            Math.PI / 2
        );

        this.cylinder(
            0.08,
            0.08,
            0.65,
            this.rubber,
            -1.65,
            1.10,
            -0.58,
            12,
            0,
            0,
            Math.PI / 2
        );


        // Reflectantes laterales

        const reflective =
            new THREE.MeshStandardMaterial({
                color: 0xf2bd32,
                emissive: 0x7a4d08,
                emissiveIntensity: 0.35,
                roughness: 0.25,
                metalness: 0.2
            });


        for (
            let x = -0.2;
            x < 10.5;
            x += 1.8
        ) {

            this.box(
                0.75,
                0.045,
                0.025,
                reflective,
                x,
                0.62,
                1.245
            );
        }
    }
}