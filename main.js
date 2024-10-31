// Импорт библиотек Three.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/MTLLoader.js";

// Создание сцены
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000); 

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Загрузка 3D модели
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

mtlLoader.load('models/pizza/materials.mtl', (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load('models/pizza/model_New Qlone_20241029_192058124.obj', (object) => {
        object.scale.set(0.025, 0.025, 0.025); 
        object.position.y = 6;

        scene.add(object);
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.error(error);
    });
});


// Добавление освещения
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Установка позиции камеры
camera.position.set(10, 11, 15); 


// Управление камерой
const controls = new OrbitControls(camera, renderer.domElement);

// Анимация
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // только если вы используете динамические камеры
    renderer.render(scene, camera);
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Запуск анимации
animate();

