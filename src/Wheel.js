import * as THREE from 'three';

export class Wheel {

    constructor(options = {}) {

        this.name = options.name || 'WHEEL';

        this.radius = options.radius || 0.72;

        this.width = options.width || 0.52;

        this.group = new THREE.Group();

        this.group.name = this.name;

        this.createMaterials();

        this.build();
    }


    // =====================================================
    // MATERIALES
    // =====================================================

    createMaterials() {

        this.tireMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x090a0b,
                roughness: 0.92,
                metalness: 0.02
            });


        this.treadMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x111214,
                roughness: 0.96,
                metalness: 0.01
            });


        this.rimMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x969ba1,
                roughness: 0.28,
                metalness: 0.88
            });


        this.rimDarkMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x25282d,
                roughness: 0.42,
                metalness: 0.72
            });


        this.chromeMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xc7ccd0,
                roughness: 0.18,
                metalness: 0.95
            });


        this.boltMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xaeb4ba,
                roughness: 0.22,
                metalness: 0.92
            });
    }


    // =====================================================
    // CONSTRUCCIÓN
    // =====================================================

    build() {

        this.createTire();

        this.createSidewalls();

        this.createRim();

        this.createHub();

        this.createBolts();
    }


    // =====================================================
    // NEUMÁTICO
    // =====================================================

    createTire() {

        const geometry =
            new THREE.TorusGeometry(
                this.radius * 0.75,
                this.radius * 0.245,
                12,
                32
            );


        const tire =
            new THREE.Mesh(
                geometry,
                this.tireMaterial
            );


        /*
         * El torus queda alrededor del eje Z.
         *
         * La rueda completa tendrá su cara
         * mirando hacia +Z / -Z.
         */

        tire.castShadow = true;

        tire.receiveShadow = true;

        tire.name =
            `${this.name}_TIRE`;


        this.group.add(tire);
    }


    // =====================================================
    // COSTADOS DEL NEUMÁTICO
    // =====================================================

    createSidewalls() {

        const sideRadius =
            this.radius * 0.505;


        const sideDepth =
            this.width * 0.18;


        const positions = [
            -this.width * 0.38,
             this.width * 0.38
        ];


        positions.forEach((z, index) => {

            const side =
                new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        sideRadius,
                        sideRadius,
                        sideDepth,
                        20
                    ),
                    this.treadMaterial
                );


            side.rotation.x =
                Math.PI / 2;


            side.position.z = z;


            side.scale.y = 0.94;


            side.castShadow = true;

            side.receiveShadow = true;


            side.name =
                `${this.name}_SIDEWALL_${index}`;


            this.group.add(side);
        });
    }


    // =====================================================
    // RIN
    // =====================================================

    createRim() {

        const rim =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    this.radius * 0.405,
                    this.radius * 0.405,
                    this.width * 0.58,
                    20
                ),
                this.rimMaterial
            );


        rim.rotation.x =
            Math.PI / 2;


        rim.position.z =
            this.width * 0.10;


        rim.castShadow = true;

        rim.receiveShadow = true;


        rim.name =
            `${this.name}_RIM`;


        this.group.add(rim);


        // Centro oscuro

        const center =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    this.radius * 0.27,
                    this.radius * 0.27,
                    this.width * 0.64,
                    20
                ),
                this.rimDarkMaterial
            );


        center.rotation.x =
            Math.PI / 2;


        center.position.z =
            this.width * 0.20;


        this.group.add(center);
    }


    // =====================================================
    // CUBO CENTRAL
    // =====================================================

    createHub() {

        const hub =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    this.radius * 0.115,
                    this.radius * 0.115,
                    this.width * 0.72,
                    16
                ),
                this.chromeMaterial
            );


        hub.rotation.x =
            Math.PI / 2;


        hub.position.z =
            this.width * 0.27;


        hub.castShadow = true;


        this.group.add(hub);
    }


    // =====================================================
    // BIRLOS
    // =====================================================

    createBolts() {

        const boltCount = 10;

        const boltDistance =
            this.radius * 0.285;


        const boltRadius =
            this.radius * 0.038;


        for (
            let i = 0;
            i < boltCount;
            i++
        ) {

            const angle =
                (i / boltCount) *
                Math.PI *
                2;


            const bolt =
                new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        boltRadius,
                        boltRadius,
                        this.width * 0.10,
                        8
                    ),
                    this.boltMaterial
                );


            bolt.rotation.x =
                Math.PI / 2;


            bolt.position.x =
                Math.cos(angle) *
                boltDistance;


            bolt.position.y =
                Math.sin(angle) *
                boltDistance;


            bolt.position.z =
                this.width * 0.43;


            bolt.castShadow = true;


            this.group.add(bolt);
        }
    }


    // =====================================================
    // POSICIÓN
    // =====================================================

    setPosition(x, y, z) {

        this.group.position.set(
            x,
            y,
            z
        );

        return this;
    }


    // =====================================================
    // ROTACIÓN
    // =====================================================

    setRotation(x, y, z) {

        this.group.rotation.set(
            x,
            y,
            z
        );

        return this;
    }


    // =====================================================
    // ESCALA
    // =====================================================

    setScale(scale) {

        this.group.scale.setScalar(
            scale
        );

        return this;
    }


    // =====================================================
    // OBJETO THREE.JS
    // =====================================================

    getObject() {

        return this.group;
    }
}