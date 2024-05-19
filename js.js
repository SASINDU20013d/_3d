document.getElementById('changeTextButton').addEventListener('click', function() {
  document.getElementById('title').textContent = 'Text Changed!';
});

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add a light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 200, 0);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 200, 100);
scene.add(directionalLight);

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load('3d.glb', function(gltf) {
  scene.add(gltf.scene);
  animate();
}, undefined, function(error) {
  console.error(error);
});

// Set the camera position
camera.position.z = 5;

// Resize function to adjust the scene when the window is resized
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor
controls.screenSpacePanning = false; // Disables panning in screen space

// Resize function to adjust the scene when the window is resized
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.update(); // Update controls
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls in the animation loop
  renderer.render(scene, camera);
}
// Play background music
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.play();
