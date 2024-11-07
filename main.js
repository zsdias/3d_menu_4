import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/MTLLoader.js";

// Создание сцены
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / 400, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Включаем антисальяцию
renderer.setSize(window.innerWidth, 400); // Устанавливаем размеры канваса
document.getElementById("container3D").appendChild(renderer.domElement); // Добавляем канвас в контейнер

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('models/pizza/texture.jpg', (texture) => {
    texture.minFilter = THREE.LinearFilter;  // Для более четкой текстуры при увеличении
    texture.magFilter = THREE.LinearFilter;
});

// Загружаем модель
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

mtlLoader.load('models/pizza/materials.mtl', (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load('models/pizza/model_New Qlone_20241029_192058124.obj', (object) => {
        // Применяем текстуру к материалу
        object.traverse((child) => {
            if (child.isMesh) {
                child.material.map = texture; // Применяем текстуру
                child.material.needsUpdate = true; // Обновляем материал
            }
        });

        object.scale.set(1, 1, 1); // Масштабируем модель в нормальный размер

        // Создаем Bounding Box для нахождения центра модели
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());

        // Устанавливаем позицию модели в центр
        object.position.sub(center); // Сдвигаем модель так, чтобы её центр совпадал с (0, 0, 0)

        // Поднимаем модель до середины контейнера
        const containerHeight = 400; // Высота контейнера в пикселях
        object.position.y = containerHeight / 1.25; // Устанавливаем Y позицию в половину высоты контейнера

        scene.add(object);
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.error(error);
    });
});

// Добавление освещения
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Яркость увеличена
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Увеличена яркость
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Установка позиции камеры
camera.position.set(0, 200, 400); // Устанавливаем позицию камеры дальше от модели
camera.lookAt(0, 0, 0); // Камера смотрит на центр модели

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
    const container = document.getElementById("container3D");
    const width = container.clientWidth; // Получаем ширину контейнера
    const height = 400; // Высота остается 400 пикселей

    camera.aspect = width / height; // Обновляем аспект камеры
    camera.updateProjectionMatrix();
    renderer.setSize(width, height); // Устанавливаем размеры канваса
});

// Запуск анимации
animate();
