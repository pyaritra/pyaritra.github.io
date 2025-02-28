var camera, scene, renderer, smokeParticles = [], smokeTexture, clock;

init();
animate();

function init() {
	// Create camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 300;

	// Create scene
	scene = new THREE.Scene();

	// Create renderer
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Add canvas to body
	document.body.appendChild( renderer.domElement );

	// Create smoke particles
	smokeTexture = new THREE.TextureLoader().load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png' );
	var smokeMaterial = new THREE.MeshLambertMaterial( { color: 0x00c2ff, map: smokeTexture, transparent: true } );
	var smokeGeo = new THREE.PlaneGeometry( 300, 300 );
	for ( var p = 0; p < 150; p++ ) {
		var particle = new THREE.Mesh( smokeGeo, smokeMaterial );
		particle.position.set( Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100 );
		particle.rotation.z = Math.random() * 360;
		scene.add( particle );
		smokeParticles.push( particle );
	}

	// Create light
	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( -1, 0, 1 );
	scene.add( light );

	// Set up clock
	clock = new THREE.Clock();
}

function animate() {
	// Call animate function again
	requestAnimationFrame( animate );

	// Update smoke particles
	var delta = clock.getDelta();
	smokeParticles.forEach( function (particle) {
		particle.rotation.z += delta * 0.2;
	});

	// Render scene
	renderer.render( scene, camera );
}
