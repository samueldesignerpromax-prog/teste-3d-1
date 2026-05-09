// script.js

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias:true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// LUZ
const light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(5,10,5);

scene.add(light);

// CHÃO
const floorGeometry = new THREE.PlaneGeometry(50,50);

const floorMaterial = new THREE.MeshStandardMaterial({
  color:0x555555
});

const floor = new THREE.Mesh(
  floorGeometry,
  floorMaterial
);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);

// PERSONAGEM
const loader = new FBXLoader();

let personagem;
let mixer;

loader.load(
  'Combinação de joelhada voadora.fbx',

  (fbx) => {

    personagem = fbx;

    personagem.scale.set(0.01,0.01,0.01);

    personagem.position.y = 0;

    scene.add(personagem);

    // animação
    mixer = new THREE.AnimationMixer(personagem);

    const action = mixer.clipAction(
      fbx.animations[0]
    );

    action.play();

  },

  undefined,

  (error) => {
    console.log(error);
  }
);

// câmera
camera.position.set(0,3,8);

// movimento
document.addEventListener('keydown',(e)=>{

  if(!personagem) return;

  if(e.key === 'ArrowRight'){
    personagem.position.x += 0.2;
  }

  if(e.key === 'ArrowLeft'){
    personagem.position.x -= 0.2;
  }

  if(e.key === 'ArrowUp'){
    personagem.position.z -= 0.2;
  }

  if(e.key === 'ArrowDown'){
    personagem.position.z += 0.2;
  }

});

// relógio
const clock = new THREE.Clock();

// animação
function animate(){

  requestAnimationFrame(animate);

  if(mixer){
    mixer.update(clock.getDelta());
  }

  renderer.render(scene,camera);

}

animate();

// resize
window.addEventListener('resize',()=>{

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});
