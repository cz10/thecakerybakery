/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, OrthographicCamera, Vector3, Group } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { SeedScene } from 'scenes';
import { Plate, Strawberry } from 'objects';

// Initialize core ThreeJS components
const scene = new SeedScene(window.innerWidth, window.innerHeight);
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 960;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    150 // far plane
  );
camera.position.set(0, 0, 0.5);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
// const controls = new OrbitControls(camera, canvas);
let group = new Group();
scene.add( group );
let objects = [];
let curr_plate = new Plate(0, -90, -250);
scene.add(curr_plate);
objects.push(curr_plate);
curr_plate = new Plate(0, -90, -150);
scene.add(curr_plate);
objects.push(curr_plate);
let strawberry = new Strawberry(0, -90, -100);
scene.add(strawberry);
objects.push(strawberry);
const controls = new DragControls(objects, camera, renderer.domElement);
controls.addEventListener( 'dragstart', function ( event ) {
	event.object.material.emissive.set( 0xaaaaaa );
} );

controls.addEventListener( 'dragend', function ( event ) {
	event.object.material.emissive.set( 0x000000 );
    console.log(event.object.position.x);
    console.log(event.object.position.y);
    console.log(event.object);
    console.log(event.object.parent.name);
} );

// controls.enableDamping = true;
// controls.enablePan = false;
// controls.minZoom = 4;
// controls.maxZoom = 100;
// controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    // controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
