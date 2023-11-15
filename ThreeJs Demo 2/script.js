// import * as THREE from 'https://threejs.org/build/three.module.js';
// import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 100
camera.position.y = 50;

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const backgroundColor = 0xf1f1f1;
scene.background = new THREE.Color(backgroundColor);



// Load the human model with walking animation
const loader = new GLTFLoader();
let mixer;
const MODEL_PATH = "/gman.glb";
let model;

loader.load(
    MODEL_PATH,
    (gltf) => {
        model = gltf.scene;
        mixer = new THREE.AnimationMixer(model);

        // Assuming the first animation in the model is the walking animation
        const clip = gltf.animations[0];
        const action = mixer.clipAction(clip);
        action.play();

        scene.add(model);
    }
);
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 100, 0);
scene.add(hemiLight);

// Animation
const animate = function () {
    requestAnimationFrame(animate);

    // Update the animation mixer
    if (mixer) {
        mixer.update(0.01);

    }

    renderer.render(scene, camera);
};



// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

animate();
