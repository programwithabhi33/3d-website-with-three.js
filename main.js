import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

renderer.setPixelRatio(2);

const gridHelper = new THREE.GridHelper(200,50);
const background_image = new THREE.TextureLoader().load("frame.png");
scene.background = background_image;
const my_logo = new THREE.TextureLoader().load("my_name_logo.png");
const my_logo_mesh = new THREE.Mesh(new THREE.BoxGeometry(33,33,12),new THREE.MeshBasicMaterial({map:my_logo,roughnes:0.3}));
my_logo_mesh.position.set(3,3,0.4)
scene.add(my_logo_mesh)
scene.add(gridHelper)
const light = new THREE.AmbientLight( 0xffffff ,1,10); // soft white light
light.intensity = 2.3;
scene.add( light );


const loader = new GLTFLoader();
loader.load( 'scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
loader.roughnes = 0.8;

console.log("getting the scene")
console.log(scene.getObjectByName("scene"));

camera.position.z = 4;

function animate() {
  requestAnimationFrame(animate);

    controls.update();
    // console.log(loader);
    // my_logo_mesh.position.x += 0.01;
    // my_logo_mesh.position.y += 0.01;

  renderer.render(scene, camera);
}

animate();

const t1 = gsap.timeline({defaults:{duration:1}});
t1.fromTo(loader.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});