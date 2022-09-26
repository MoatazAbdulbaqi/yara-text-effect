import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Canvas
const canvas = document.querySelector('#webgl');

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// Texture
const textureLoader = new THREE.TextureLoader();
// const matcap = new textureLoader.load('./textures/matcaps/3.png');
const matcap = new textureLoader.load('./textures/elc-bg.jpg');
const matcap2 = new textureLoader.load('./textures/8.png');

const material = new THREE.MeshMatcapMaterial({
	matcap,
	side: THREE.DoubleSide,
});
const material2 = new THREE.MeshMatcapMaterial({ matcap: matcap2 });

// Font Loader
const fontLoader = new THREE.FontLoader();

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
	const textGeometry = new THREE.TextBufferGeometry('Yara Almoussa', {
		font: font,
		size: 0.7,
		height: 0.2,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 4,
	});
	const text = new THREE.Mesh(textGeometry, material);
	textGeometry.center();
	scene.add(text);
});

const dounatGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
for (let i = 0; i < 500; i++) {
	const dounat = new THREE.Mesh(dounatGeometry, material2);
	dounat.position.x = (Math.random() - 0.5) * 25;
	dounat.position.y = (Math.random() - 0.5) * 25;
	dounat.position.z = (Math.random() - 0.5) * 25;
	dounat.rotation.x = Math.random() * Math.PI;
	dounat.rotation.y = Math.random() * Math.PI;
	const scale = Math.random();
	dounat.scale.set(scale, scale, scale);
	scene.add(dounat);
}

// Camera
let aspect = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.z = 4;
scene.add(camera);

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	aspect = sizes.width / sizes.height;
	camera.aspect = aspect;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		canvas.requestFullscreen();
	}
});


// Conrtols

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 12;
controls.minDistance = 1.5;
controls.update();
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const clock = new THREE.Clock();

const tick = () => {
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
