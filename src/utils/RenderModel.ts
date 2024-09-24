import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const RenderModel = (container: HTMLElement, urlModel: string) => {
  let width = container!.clientWidth;
  let height = container!.clientHeight;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8fafc);

  const camera = new THREE.PerspectiveCamera(40, width / height, 1, 5000);
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  const hlight = new THREE.AmbientLight(0x404040, 50);
  scene.add(hlight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 18;
  controls.maxDistance = 20;
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = 1.5;
  controls.autoRotate = true;

  controls.target = new THREE.Vector3(0, 1, 0);
  controls.update();

  container?.appendChild(renderer.domElement);

  const loader = new GLTFLoader().setPath(urlModel);
  loader.load(
    '/scene.gltf',
    (gltf) => {
      const mesh = gltf.scene;

      mesh.position.set(1, -2.5, 1);
      mesh.scale.set(4, 4, 4);
      scene.add(mesh);
    },
    (xhr) => {
      console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
      console.error(error);
    },
  );

  window.addEventListener('resize', () => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  return {
    animate,
  };
};
