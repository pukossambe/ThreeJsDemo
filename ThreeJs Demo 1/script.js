// create scene, camera and renderer
function init() {
    let scene = new THREE.Scene();
    let aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    // Load image texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/texture/image.png'); // Change path accordingly

    // Create material with texture
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create cube with geometry and material
    const cube = new THREE.Mesh(cubeGeometry, material);
    scene.add(cube);

    camera.position.z = 3;

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

}

init()



