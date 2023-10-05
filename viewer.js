import * as THREE from './libraries/three/build/three.module.js';
import { GLTFLoader } from './libraries/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './libraries/three/examples/jsm/controls/OrbitControls.js';


// Create renderer
const canvas = document.querySelector('#viewer');
const canvasContainer = document.querySelector('#viewer-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight);

// Create scene
const scene = new THREE.Scene();

// Create camera
var fov = 75;
const aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;  
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Create light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3);
scene.add(ambientLight);

// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(345, 22, -300);
camera.rotateX(0);
controls.update();



// Import the gltf file
const gltfLoader = new GLTFLoader();
const url = './resources/apollo_interior-medium_resolution-gltf/apollo_interior-medium_resolution.gltf';
gltfLoader.load(url, (gltf) => {
	const root = gltf.scene;
	scene.add(root);
})


// Handle zoom buttons
const zoomRate = 10;

const zoomInBtn = document.getElementById("zoom-in");
zoomInBtn.addEventListener("click", function (e) {
	if (fov > zoomRate) {
		fov -= zoomRate;
		console.log(fov);
		camera.fov = fov;
		camera.updateProjectionMatrix();
	}
})

const zoomOutBtn = document.getElementById("zoom-out");
zoomOutBtn.addEventListener("click", function (e) {
	fov += zoomRate;
	console.log(fov);
	camera.fov = fov;
	camera.updateProjectionMatrix();
})



// Render scene and begin animating
renderer.render(scene, camera);
requestAnimationFrame(animate);



function animate() {
	// Requests to the browser that you want to animate using the animate function (making this recursive)
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render(scene, camera);

}



// Handle window resizing
window.onresize = function () {
	camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight);
}




