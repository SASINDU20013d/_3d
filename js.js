// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f1); // Light gray background

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add a hemisphere light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

// Add a directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(0, 200, 100);
dirLight.castShadow = true;
scene.add(dirLight);

// Additional ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

let model;
const loader = new THREE.GLTFLoader();
loader.load('3d.glb', function(gltf) {
  model = gltf.scene;
  scene.add(model);

  // Initial animation settings
  model.position.set(0, -5, 0); // Start below the scene
  animate();
}, undefined, function(error) {
  console.error(error);
});

// Set the camera position
camera.position.z = 3;

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

// Get the audio element and play button
const backgroundMusic = document.getElementById('background-music');
const playButton = document.getElementById('play-button');

// Play background music on button click
playButton.addEventListener('click', function() {
  backgroundMusic.play();
  playButton.style.display = 'none'; // Hide the button after playing
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Animate the model's position
  if (model) {
    model.position.y += 0.05; // Move the model up
    if (model.position.y > 0) { // Stop at the desired position
      model.position.y = 0;
    }
  }

  controls.update(); // Update controls in the animation loop
  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', function () {
  var audioPlayer = document.getElementById('audioPlayer');
  var playButton = document.getElementById('playButton');

  playButton.addEventListener('click', function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playButton.textContent = 'Pause Song';
    } else {
      audioPlayer.pause();
      playButton.textContent = 'Play Song';
    }
  });
});
// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Animate the model's position (initial rise)
  if (model && model.position.y < 0) {
    model.position.y += 0.01; // Move the model up
  } else {
    // Model has reached the top, start rotation
    model.rotation.y += 0.09; // Rotate the model around the y-axis
  }

  controls.update();
  renderer.render(scene, camera);
}
