import * as THREE from 'three';
import { Group, Mesh, BoxBufferGeometry, MeshLambertMaterial } from 'three';

class Plate extends Group {
    constructor(x, y, z) {
        // Call parent Group() constructor
        super();

        this.name = 'plate';

        // const plate = THREE.Group();
        const main = new THREE.Mesh(
            new THREE.BoxBufferGeometry(50, 50, 1),
            // new THREE.MeshLambertMaterial(0x7ec022)
            new THREE.MeshLambertMaterial({color: 0xFFFFFF})
        );
        main.position.z = x;
        main.position.y = y;
        main.position.x = z;
        main.castShadow = true;
        main.receiveShadow = true;
        this.add(main);
        return this;
    }
}

export default Plate;
