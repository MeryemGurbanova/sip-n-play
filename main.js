import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

/* ------- NAVBAR STYLE START ------- */
const navbar = document.querySelector('#NavBar');
let top = navbar.offsetTop;
function stickynavbar() {
  if (window.scrollY >= top) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}
window.addEventListener('scroll', stickynavbar);
/* ------- NAVBAR STYLE END ------- */

/* ------- CANVAS STYLE START ------- */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvasContainer = document.querySelector('#canvas-container');
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), alpha: true });

renderer.setClearColor(new THREE.Color(0xffffff));
renderer.setSize(650, 400);

canvasContainer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();

// Add Lights
const ambientLight = new THREE.AmbientLight(0x404040, 5); 
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight1.position.set(5, 5, 5).normalize();
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight2.position.set(-5, 5, 5).normalize();
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight3.position.set(5, -5, 5).normalize();
scene.add(directionalLight3);

// Load character
let shiba;
loader.load(
  './floating_castle.glb', 
  function (gltf) {
    shiba = gltf.scene;
   
    shiba.position.set(0, 0, 0); 
    scene.add(shiba);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Camera starting position
camera.position.z = 0.4;
camera.position.y = 0.2;
camera.position.x = 0.8;

// Animation
function animate() {
  requestAnimationFrame(animate);


  if (shiba) {
    shiba.rotation.y += 0.01;
  }

  controls.update(); // Update orbit controls
  renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
/* ------- CANVAS STYLE END ------- */
