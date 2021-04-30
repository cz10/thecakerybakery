import * as THREE from 'three';
import { Group, Mesh, BoxBufferGeometry, MeshLambertMaterial, TextureLoader, Sprite, SpriteMaterial, Vector3 } from 'three';

class Plate extends Group {
    constructor(x, y, z, width, height) {
        // Call parent Group() constructor
        super();

        this.name = 'plate';

        // const image = require('../../scenes/plate_cropped.png');
        // console.log(image);
        // const map = new THREE.TextureLoader().load(image);
        const map = new THREE.TextureLoader().load( 'https://lh4.googleusercontent.com/wjNg8xx-jiOfgIxxcnmLV2lZbw5tkwbyRsZ7bIQ4cDQjlxBA0BtpEz6ZRs3Oz33eRQp-Pqc_Tvfypxw7dN3VRCVW_zJXpLKmR1THbOE' );
        const material = new THREE.SpriteMaterial( { map: map } );
        material.emissive = 0xaaaaaa;
        const sprite = new THREE.Sprite( material );
        sprite.scale.set( width * 0.12, height * 0.06, 1 );
        sprite.position.z = 0; 
        sprite.position.x = x; 
        sprite.position.y = y;
        // console.log(sprite.geometry.boundingBox);
        // sprite.geometry.computeBoundingBox();
        this.add( sprite );

        // const plate = THREE.Group();

        // const main = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(1, 1, 1),
        //     new THREE.MeshLambertMaterial({color: 0xFFFFFF})
        // );
        // main.position.z = z;
        // main.position.y = y;
        // main.position.x = x;
        // main.castShadow = true;
        // main.receiveShadow = true;
        // this.add(main);
        return this;
    }

    update(timeStamp, stepSize, width) {
        console.log(width / 2);
        if (this.children[0].position.x >= width / 3) {
            this.children[0].position.set(-width / 3, this.children[0].position.y, this.children[0].position.z);
        }
        else {
            this.children[0].position.set(this.children[0].position.x + stepSize, this.children[0].position.y, this.children[0].position.z);
        }
        console.log(this.children[0].position.x);
    }
}

export default Plate;
