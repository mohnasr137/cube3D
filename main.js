import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import WebGL from "three/addons/capabilities/WebGL.js";

if (WebGL.isWebGL2Available()) {
  // const loader = new GLTFLoader();

  const width = window.innerWidth;
  const height = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);
  renderer.setSize(width, height);
  camera.position.z = 3;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;

  const geometry = new THREE.IcosahedronGeometry(1, 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const frame = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, frame);
  mesh.scale.setScalar(1.001);
  cube.add(mesh);

  const ligth = new THREE.HemisphereLight("red", "blue");
  scene.add(ligth);

  function animate(t = 0) {
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
  }
  renderer.setAnimationLoop(animate);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById("container").appendChild(warning);
}
