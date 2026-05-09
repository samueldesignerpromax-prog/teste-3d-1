import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js?module';


// CENA
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);


// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;


// RENDER
const renderer = new THREE.WebGLRenderer();

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(
  renderer.domElement
);


// LUZ
const light = new THREE.HemisphereLight(
  0xffffff,
  0x444444,
  5
);

scene.add(light);


// TESTE CUBO
const cube = new THREE.Mesh(

  new THREE.BoxGeometry(),

  new THREE.MeshBasicMaterial({
    color:0x00ff00
  })

);

cube.position.x = -2;

scene.add(cube);


// LOADER
const loader = new GLTFLoader();

loader.load(

  './personagem.glb',

  (gltf)=>{

    console.log('GLB FUNCIONOU');

    const model = gltf.scene;

    model.scale.set(1,1,1);

    model.position.set(0,0,0);

    scene.add(model);

  },

  undefined,

  (error)=>{

    console.log('ERRO GLB');

    console.log(error);

  }

);


// LOOP
function animate(){

  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;

  cube.rotation.y += 0.01;

  renderer.render(
    scene,
    camera
  );

}

animate();
