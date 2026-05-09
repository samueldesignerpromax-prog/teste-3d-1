// script.js

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

import { FBXLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/FBXLoader.js?module';


// CENA
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x222222);


// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0,5,15);


// RENDER
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


// LUZ
const light = new THREE.DirectionalLight(
  0xffffff,
  5
);

light.position.set(5,10,5);

scene.add(light);


// LUZ AMBIENTE
const ambient = new THREE.AmbientLight(
  0xffffff,
  3
);

scene.add(ambient);


// CHÃO
const floor = new THREE.Mesh(

  new THREE.PlaneGeometry(50,50),

  new THREE.MeshStandardMaterial({
    color:0x555555
  })

);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);


// EIXOS
scene.add(
  new THREE.AxesHelper(5)
);


// LOADER
const loader = new FBXLoader();

let personagem;
let mixer;


// CARREGAR PERSONAGEM
loader.load(

  './personagem.fbx',

  (fbx)=>{

    console.log('FBX carregado');

    personagem = fbx;


    // ESCALA
    personagem.scale.set(
      0.001,
      0.001,
      0.001
    );


    // POSIÇÃO
    personagem.position.set(
      0,
      0,
      0
    );


    // ROTAÇÃO
    personagem.rotation.y = 1.5;


    // MATERIAL
    personagem.traverse((child)=>{

      if(child.isMesh){

        child.material =
          new THREE.MeshStandardMaterial({
            color:0xffffff
          });

      }

    });


    // ADICIONAR
    scene.add(personagem);


    // ANIMAÇÃO
    mixer = new THREE.AnimationMixer(
      personagem
    );

    if(fbx.animations.length > 0){

      const action =
        mixer.clipAction(
          fbx.animations[0]
        );

      action.play();

    }

  },

  undefined,

  (error)=>{

    console.log(error);

  }

);


// TECLADO
document.addEventListener(
  'keydown',
  (e)=>{

    if(!personagem) return;


    if(e.key === 'ArrowRight'){

      personagem.position.x += 0.3;

    }


    if(e.key === 'ArrowLeft'){

      personagem.position.x -= 0.3;

    }


    if(e.key === 'ArrowUp'){

      personagem.position.z -= 0.3;

    }


    if(e.key === 'ArrowDown'){

      personagem.position.z += 0.3;

    }

  }
);


// CLOCK
const clock = new THREE.Clock();


// LOOP
function animate(){

  requestAnimationFrame(animate);

  if(mixer){

    mixer.update(
      clock.getDelta()
    );

  }

  renderer.render(
    scene,
    camera
  );

}

animate();


// RESIZE
window.addEventListener(
  'resize',
  ()=>{

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);
