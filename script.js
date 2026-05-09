import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js?module';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0,2,5);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(
  renderer.domElement
);


// luz
const light = new THREE.DirectionalLight(
  0xffffff,
  5
);

light.position.set(5,10,5);

scene.add(light);

scene.add(
  new THREE.AmbientLight(
    0xffffff,
    2
  )
);


// chão
const floor = new THREE.Mesh(

  new THREE.PlaneGeometry(50,50),

  new THREE.MeshStandardMaterial({
    color:0x555555
  })

);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);


let personagem;
let mixer;

const loader = new GLTFLoader();

loader.load(

  './personagem.glb',

  (gltf)=>{

    personagem = gltf.scene;

    personagem.scale.set(1,1,1);

    scene.add(personagem);

    mixer = new THREE.AnimationMixer(
      personagem
    );

    if(gltf.animations.length > 0){

      const action =
        mixer.clipAction(
          gltf.animations[0]
        );

      action.play();

    }

  }

);


// movimento
document.addEventListener(
  'keydown',
  (e)=>{

    if(!personagem) return;

    if(e.key === 'ArrowRight'){
      personagem.position.x += 0.1;
    }

    if(e.key === 'ArrowLeft'){
      personagem.position.x -= 0.1;
    }

    if(e.key === 'ArrowUp'){
      personagem.position.z -= 0.1;
    }

    if(e.key === 'ArrowDown'){
      personagem.position.z += 0.1;
    }

  }
);


const clock = new THREE.Clock();

function animate(){

  requestAnimationFrame(animate);

  if(mixer){

    mixer.update(
      clock.getDelta()
    );

  }

  renderer.render(scene,camera);

}

animate();
