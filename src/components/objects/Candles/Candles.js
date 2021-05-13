import * as THREE from 'three';
import { Group} from 'three';

class Candles extends Group {
    constructor(x, y, width, height) {
        // Call parent Group() constructor
        super();

        this.name = 'candles';
        this.type = 'topping';

        const map = new THREE.TextureLoader().load( 'src/assets/ingredients/toppings/candles.png' );
        map.minFilter = THREE.NearestMipmapNearestFilter;
        map.magFilter = THREE.NearestFilter;
        const material = new THREE.SpriteMaterial( { map: map } );
        material.emissive = 0xaaaaaa;
        const sprite = new THREE.Sprite( material );
        sprite.scale.set( width * 0.04, height * 0.065, 1 );
        sprite.position.z = 0; 
        sprite.position.x = x; 
        sprite.position.y = y;
        this.add( sprite );
        return this;
    }
    update(timeStamp, stepSize, width) {
        if (this.children[0].position.x >= width / 3) {
            this.children[0].position.set(-width / 3, this.children[0].position.y, this.children[0].position.z);
        }
        else {
            this.children[0].position.set(this.children[0].position.x + stepSize, this.children[0].position.y, this.children[0].position.z);
        }
    }
}

export default Candles;
