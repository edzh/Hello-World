'use strict';
/*  global THREE  */
let scene;
let camera;
let renderer;
let circle;
const keys = [];
const velocity = new THREE.Vector3();

function init() {
  // scene = new THREE.Scene();

  // camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );
  // camera.position.z = 1000;

  // geometry = new THREE.BoxGeometry( 200, 200, 200 );
  // geometry = new THREE.BoxGeometry( 200, 200, 200 );
  // material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
  // const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  // directionalLight.position.set( 300, 300, 0 );
  // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
  // scene.add( light );
  // scene.add( directionalLight );

  // mesh = new THREE.Mesh( geometry, material );
  // mesh1 = new THREE.Mesh(geometry, material);
  // scene.add( mesh );
  // scene.add(mesh1);
  // mesh1.position.set(100, 20, 30);

  // renderer = new THREE.WebGLRenderer({
  //     antialias: true
  // });
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // controls = new THREE.OrbitControls( camera, renderer.domElement );
  // document.body.appendChild( renderer.domElement );
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, 700);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set(0, 300, 0);
  const light = new THREE.AmbientLight( 0xaaaaaa);

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });

  const circleGeometry = new THREE.CircleGeometry(64, 32);
  circle = new THREE.Mesh( circleGeometry, material);

  scene.add(circle);
  scene.add(directionalLight);
  scene.add(light);
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x0000ff, 0.3);
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  const speed = 3;
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

  circle.position.add(velocity);
  velocity.multiplyScalar(0.9);
  renderer.render( scene, camera );
}

document.addEventListener('keydown', function(event) {
  keys[event.keyCode] = true;
});

document.addEventListener('keyup', function(event) {
  keys[event.keyCode] = false;
});

init();
animate();

