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

    createMaterials() {

        this.tireMaterial = new THREE.MeshStandardMaterial({
            color: 0x08090a,
            roughness: 0.92,
            metalness: 0.02
        });

        this.rimMaterial = new THREE.MeshStandardMaterial({
            color: 0x858b91,
            roughness: 0.28,
            metalness: 0.88
        });

        this.rimDarkMaterial = new THREE.MeshStandardMaterial({
            color: 0x30343a,
            roughness: 0.4,
            metalness: 0.75
        });

        this.chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0xc8cdd1,
            roughness: 0.16,
            metalness: 0.95
        });

        this.boltMaterial = new THREE.MeshStandardMaterial({
            color: 0xb5babf,
            roughness: 0.22,
            metalness: 0.92
        });
    }

    build() {

        this.createTire();
        this.createRim();
        this.createHub();
        this.createBolts();
    }

    createTire() {

        /*
         * El Torus ya tiene su eje central sobre Z.
         * Por eso NO debemos rotarlo.
         */

        const tire = new THREE.Mesh(
            new THREE.TorusGeometry(
                this.radius * 0.78,
                this.radius * 0.22,
                18,
                48
            ),
            this.tireMaterial
        );

        tire.name = `${this.name}_TIRE`;

        tire.castShadow = true;
        tire.receiveShadow = true;

        this.group.add(tire);
    }

    createRim() {

        const rim = new THREE.Mesh(
            new THREE.CylinderGeometry(
                this.radius * 0.43,
                this.radius * 0.43,
                this.width * 0.55,
                32
            ),
            this.rimMaterial
        );


        rim.rotation.x = Math.PI / 2;

        rim.castShadow = true;

        rim.name = `${this.name}_RIM`;

        this.group.add(rim);


        const center = new THREE.Mesh(
            new THREE.CylinderGeometry(
                this.radius * 0.29,
                this.radius * 0.29,
                this.width * 0.60,
                32
            ),
            this.rimDarkMaterial
        );

        center.rotation.x = Math.PI / 2;

        this.group.add(center);


        const disc = new THREE.Mesh(
            new THREE.CylinderGeometry(
                this.radius * 0.20,
                this.radius * 0.20,
                this.width * 0.64,
                24
            ),
            this.chromeMaterial
        );

        disc.rotation.x = Math.PI / 2;

        this.group.add(disc);
    }

    createHub() {

        const hub = new THREE.Mesh(
            new THREE.CylinderGeometry(
                this.radius * 0.105,
                this.radius * 0.105,
                this.width * 0.72,
                24
            ),
            this.chromeMaterial
        );

        hub.rotation.x = Math.PI / 2;

        hub.castShadow = true;

        this.group.add(hub);
    }

    createBolts() {

        const boltRadius = this.radius * 0.043;
        const boltDistance = this.radius * 0.285;

        const boltCount = 10;

        for (let i = 0; i < boltCount; i++) {

            const angle =
                (i / boltCount) * Math.PI * 2;

            const bolt = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    boltRadius,
                    boltRadius,
                    this.width * 0.12,
                    8
                ),
                this.boltMaterial
            );

            bolt.rotation.x = Math.PI / 2;

            bolt.position.x =
                Math.cos(angle) * boltDistance;

            bolt.position.y =
                Math.sin(angle) * boltDistance;

            bolt.position.z =
                this.width * 0.34;

            this.group.add(bolt);
        }
    }

    setPosition(x, y, z) {

        this.group.position.set(
            x,
            y,
            z
        );

        return this;
    }

    setRotation(x, y, z) {

        this.group.rotation.set(
            x,
            y,
            z
        );

        return this;
    }

    setScale(scale) {

        this.group.scale.setScalar(scale);

        return this;
    }

    getObject() {

        return this.group;
    }
}