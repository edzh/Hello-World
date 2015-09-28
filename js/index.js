/* global THREE */
/* global CANNON */
'use strict';
var scene, camera, renderer, sphere, controls, box, ground, world,
    boxPhys, mass, boxBody, spherePhys, sphereBody, groundPhys, groundBody;
const keys = [];
const velocity = new CANNON.Vec3();

function initCannon() {
  world = new CANNON.World();
  world.gravity.set(0, 0, -20);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  boxPhys = new CANNON.Box(new CANNON.Vec3(256,256,512));
  // mass = 1;
  boxBody = new CANNON.Body({
    mass: 0
  });

  spherePhys = new CANNON.Sphere(40);
  sphereBody = new CANNON.Body({
    mass: 150
  });

  groundPhys = new CANNON.Plane();
  groundBody = new CANNON.Body({
    mass: 0,
    shape: groundPhys
  });


  sphereBody.position.set(0,0,40);
  boxBody.position.set(400,400,300);
  sphereBody.addShape(spherePhys);
  boxBody.addShape(boxPhys);
  world.addBody(groundBody);
  world.addBody(boxBody);
  world.addBody(sphereBody);
}

function initThree() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, 700);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
  directionalLight.position.set(50, 50, 400);
  const light = new THREE.AmbientLight( 0xaaaaaa);

  const cirMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    side: THREE.Frontside
  });
  const groundMat = new THREE.MeshPhongMaterial({
    color: 0x663300,
    side: THREE.Frontside
  });

  const circleGeometry = new THREE.IcosahedronGeometry(40, 2);
  sphere = new THREE.Mesh( circleGeometry, cirMaterial);

  const boxGeometry = new THREE.BoxGeometry(256,256,512);
  box = new THREE.Mesh(boxGeometry, cirMaterial);

  const groundGeo = new THREE.PlaneGeometry(1024, 1024);
  ground = new THREE.Mesh(groundGeo, groundMat);

  scene.add(box);
  scene.add(sphere);
  scene.add(directionalLight);
  scene.add(light);
  scene.add(ground);


  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  sphere.position.set(0,0,40);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x0000ff, 0.3);
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  const speed = player.speed;
  if (keys[87]) {
    velocity.y += speed;
  }
  if (keys[83]) {
    velocity.y -= speed;
  }
  if (keys[68]) {
    velocity.x += speed;
  }
  if (keys[65]) {
    velocity.x -= speed;
  }
  if (keys[32]) {
    sphereBody.position.z = 40;
  }
  updatePhys();

  //sphere movement
  sphereBody.position.vadd(velocity, sphereBody.position);
  velocity.mult(0.9, velocity);
  renderer.render( scene, camera );
}

function updatePhys() {
    world.step(1/60);

    box.position.copy(boxBody.position);
    box.quaternion.copy(boxBody.quaternion);

    sphere.position.copy(sphereBody.position);
    sphere.quaternion.copy(sphereBody.quaternion);


}

document.addEventListener('keydown', function(event) {
  keys[event.keyCode] = true;
  if (event.keyCode === 82) {
    sphere.position.set(0, 0, 0);
    velocity.set(0, 0, 0);
    controls.reset();
  }
});

document.addEventListener('keyup', function(event) {
  keys[event.keyCode] = false;
});

initThree();
initCannon();
animate();

