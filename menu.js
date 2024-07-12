import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* ------- NAVBAR STYLE START ------- */
const navbar = document.querySelector('#NavBar');
let top = navbar.offsetTop;
function stickynavbar() {
    if (window.scrollY >= top) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}
window.addEventListener('scroll', stickynavbar);
/* ------- NAVBAR STYLE END ------- */

const modelSettings = [
    { path: './coffee_shop_cup.glb', scale: 2, position: { x: 0, y: -1.7, z: 0 }, cameraPosition: { x: 0, y: 0, z: 3 } },
    { path: './cafe_latte_with_art.glb', scale: 3.2, position: { x: 0, y: -1.0, z: 0 }, cameraPosition: { x: 0, y: 3, z: 4 } },
    { path: './boba_tea.glb', scale: 1.0, position: { x: 0, y: -1.2, z: 0 }, cameraPosition: { x: 0, y: 0, z: 6 } },
    { path: './fries.glb', scale: 3.0, position: { x: 0, y: -1.5, z: 0 }, cameraPosition: { x: 5, y: 5, z: 4 } },
    { path: './italian_salad.glb', scale: 8, position: { x: 0, y: 1.3, z: 0 }, cameraPosition: { x: 0, y: 2, z: 2.5 } },
    { path: './fizz_drinks.glb', scale: 2.0, position: { x: 0, y: -10.4, z: 0 }, cameraPosition: { x: 90, y: 20, z: 18.5 } },
    { path: './wine_bottle.glb', scale: 1.8, position: { x: 0, y: -1.6, z: 0 }, cameraPosition: { x: 0, y: 5, z: 10.5 } }
];

const headings = [
    'Coffee',
    'Specialty Drinks',
    'Boba',
    'Hot Bites',
    'Sandwiches & Salads',
    'Seasonal Menu',
    'Beer/Wine'
];

const menus = [
    [
        { name: 'LATTE', price: '$4.75(H)/$5.25(C)' },
        { name: 'CORTADO', price: '$4.25(H)/$4.75(C)' },
        { name: 'DRIP COFFEE', price: 'Small: $3(H)/$3.50(C)\nMedium: $3.50(H)\nLarge: $4(H)/$4.25(C)' },
        { name: 'CAFE AU LAIT', price: '$3.25(H)' },
        { name: 'CAPPUCINO', price: '$4.50(H)' },
        { name: 'MOCHA', price: '$5.75(H)/$6.25(C)' },
        { name: 'RED EYE', price: '$4.50(H)/$4.75(C)' },
        { name: 'AMERICANO', price: '$3.75(H)/$4.25(C)' },
    ],
    [
        { name: 'MATCHA LATTE', price: '$5.25(H)/$5.75(C)' },
        { name: 'HOT CHOCOLATE', price: '$4.50(H)\nS\'mores: $5.50' },
        { name: 'NUTELLA LATTE', price: '$5.75(H)/$6.25(C)' },
        { name: 'CHAI', price: '$5.00(H)/$5.50(C)' },
        { name: 'DIRTY CHAI', price: '$6.25(H)/$6.75(C)' },
        { name: 'LAVENDAR LATTE', price: '$5.75(H)/$6.25(C)' },
        { name: 'ROSE LATTE', price: '$5.75(H)/$6.25(C)' },
        { name: 'BROWN SUGAR LATTE', price: '$5.75(H)/$6.25(C)' },
        { name: 'BUMBLEBEE LATTE', price: '$6.25(H)/$6.75(C)' },
    ],
    [
        { name: 'THE OG', price: 'Medium: $4.25\nLarge: $5.25\nHot: $5.25\n_Classic milk tea_' },
        { name: 'BROWN SUGAR BOBA', price: 'Medium: $4.75\nLarge: $5.75\nHot: $5.75\n_Caffeine free_' },
        { name: 'TARO BOBA', price: 'Medium: $4.25\nLarge: $5.25\nHot: $5.25\n_Caffeine free, dairy free_' },
        { name: 'COCONUT BOBA', price: 'Medium: $4.25\nLarge: $5.25\nHot: $5.25\n_Caffeine free, dairy free_' },
        { name: 'FRUIT GREEN/BLACK TEA', price: 'Medium: $4.25\nLarge: $5.25\n_Comes in a variety of flavors: mango/strawberry/passionfruit/peach/green apple/lychee/kiwi. Feel free to mix and match!_' },
        { name: 'FRUIT BLACK TEA', price: 'Medium: $4.25\nLarge: $5.25\n_Comes in a variety of flavors: peach/strawberry. Feel free to mix and match!_' },
        { name: 'JASMINE MILK TEA', price: 'Medium: $4.25\nLarge: $5.25\nHot: $5.25\n_Dairy free_' },
        { name: 'WINTERMELON MILK TEA', price: 'Medium: $4.25\nLarge: $5.25\nHot: $5.25\n_Dairy free_' },
        { name: 'TOPPINGS', price: '+$0.50\n_Tapioca pearls, lychee jelly, mixed jelly, grass jelly, pop strawberry, pop passionfruit, mango stars_' },
    ],
    [
        { name: 'CHICKEN POPPERS', price: '$6.00' },
        { name: 'MOZZ STICKS', price: '$7.00' },
        { name: 'PIGS IN A BLANKET', price: '$7.00' },
        { name: 'TATER TOTS', price: '$5.00' },
        { name: 'CHICKEN TENDERS', price: '$8.00' },
        { name: 'ONION RINGS', price: '$5.00' },
        { name: 'FRIES', price: '$5.00' },
        { name: 'SWEET POTATO FRIES', price: '$6.00' },
    ],
    [
        { name: 'BEYOND BUSSIN SANDWICH', price: '$15.00\n_SHEEEESH Our new VEGAN sandwich highlighting the beyond burger and our house-made vegan chipotle aioli alongside lettuce, onion and avocado. Comes with a side of our house made chipotle aioli and chips_' },
        { name: 'SPICY CHICKEN SANDWICH', price: '$13.00\n_Spicy mayo, grilled chicken, crispy bacon and avocado on Italian herb focaccia. Comes with chips_' },
        { name: 'ITALIAN PANINI', price: '$11.00\n_Prosciutto, pesto, and mozzarella in between herb focaccia and pressed til golden brown and crispy (pesto contains pine nuts). Comes with chips_' },
        { name: 'TUNA MELT', price: '$11.00\n_House-made tuna salad with American cheese on Italian herb focaccia pressed to perfection (can be spicy on request). Comes with chips_' },
        { name: 'ZESTO CHICKEN SANDWICH', price: '$13.00\n_Basil pesto, grilled chicken, fresh mozzarella and lemon zest on Italian herb focaccia (pesto contains pine nuts). Comes with chips_' },
        { name: 'TURKEY CLUB', price: '$11.00\n_Roast turkey, lettuce, tomato, crispy bacon and American cheese on sourdough. Comes with chips_' },
        { name: 'GRILLED CHEESE', price: '$6.50\n_Comes with chips +bacon/tomato/turkey: $1.50_' },
        { name: 'MIXED GREEN SALAD', price: '$6.50\n_w/tomato, vegan +smoked salmon: $5.00 +boiled egg: $1.00 +avocado: $1.50_' },
        { name: 'COBB SALAD', price: '$10.00\n_Romaine lettuce, bacon, egg, chicken, tomato, and avocado tossed with ranch_' },
        { name: 'PIZZA PANINI', price: '$11.00\n_Pepperoni, fresh mozzarella, marinara and olive oil on Italian herb focaccia and pressed to perfection! Comes with chips_' },
        { name: 'SMOKED SALMON TARTINE', price: '$11.00\n_Lemon zest infused cream cheese on toasted heritage wheat. Piled high with smoked salmon and topped with pickled red onion. Comes with a side salad_' },
        { name: 'AVOCADO TOAST', price: '$10.00\n_Avocado mashed with salt, pepper, lemon juice and olive oil on toasted heritage wheat. Comes with a side salad +egg: $1_' },
    ],
    [
        { name: 'Pina Colada', price: '$4.75 (M) 5.75 (L)\n_Our coconut boba with pineapple flavor!_' },
        { name: 'MATCHA LEMONADE', price: 'Medium: $5.00\nLarge: $6.00\n_Our freshly squeezed lemonade with a balance of an earthy shot of matcha_' },
        { name: 'YUZU-ADE', price: 'Large: $5.25\n_Popular in South Korea, Yuzu-Ade is a carbonated drink with yuzu marmalade. Yuzu is a citrus with a tart and fragrant flavor of orange and grapefruit._' },
        { name: 'FRESHLY SQUEEZED LEMONADE', price: 'Medium: $4.00\nLarge: $5.00\n_Real lemons with our signature recipe = amazing lemonade_' },
        { name: 'MATCHA LAVENDER OAT', price: '$6.50\n_Lavender infused into our oatmilk steamed over a matcha shot._' },
        { name: 'Berry Lavendar Lemonade', price: 'Medium: $5.25\nLarge: $6.25\n_Made with real bourbon and definitely the drink we\'re most excited for this fall._' },
        { name: 'Citrus Boba (Grapefruit or Orange)', price: 'Large: $6.00\n_Made with real fruit juice and fruit slices!_' },
        { name: 'ROTATING BEER/WINE PROGRAM', price: '_Check out our beer and wine at the front of our store! We\'re constantly rotating out product from local breweries!_' },
    ],
    [
        { name: 'Babe Rose', price: '' },
        { name: 'Archer Roose White/Red', price: '' },
        { name: 'Kona Lager', price: '' },
        { name: 'Blue Point', price: '' },
        { name: 'Juneshine', price: '' },
        { name: 'Lunar Hard Seltzers', price: '' },
        { name: 'Allagash White', price: '' },
        { name: 'Doc Cider', price: '' },
        { name: 'Stella Artois', price: '' },
        { name: 'Shocktop', price: '' },
        { name: 'Finback', price: '' },
        { name: 'Three\'s Brewery', price: '' },
        { name: 'Rotating menu of beers from local breweries!', price: '_Tall silver cans on our counter_' },
    ]
];


const prevButton = document.querySelector('span#prev');
const nextButton = document.querySelector('span#next');
const h2Heading = document.querySelector('h2');
const canvas = document.querySelector('canvas');
const menuLeft = document.getElementById('menu-left');
const menuRight = document.getElementById('menu-right');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(650, 400);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();
let currentModelIndex = 0;
let currentModel;

function loadModel(index) {
    controls.reset();

    const settings = modelSettings[index];

    // set camera position based on model settings
    camera.position.set(settings.cameraPosition.x, settings.cameraPosition.y, settings.cameraPosition.z);
    camera.lookAt(0, 0, 0);

    loader.load(
        settings.path,
        function (gltf) {
            if (currentModel) {
                scene.remove(currentModel);
            }
            currentModel = gltf.scene;

          
            currentModel.scale.set(settings.scale, settings.scale, settings.scale);
            currentModel.position.set(settings.position.x, settings.position.y, settings.position.z);

            scene.add(currentModel);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
}

function updateHeading(index) {
    h2Heading.textContent = headings[index];
}
function updateMenu(index) {
    const menu = menus[index];
    const leftMenuItems = menu.slice(0, Math.ceil(menu.length / 2));
    const rightMenuItems = menu.slice(Math.ceil(menu.length / 2));

    function formatMenuItem(item) {
        return item.replace(/_(.*?)_/g, '<br><em style="color: rgba(148,185,115,0.7);">$1</em>');
    }

    menuLeft.innerHTML = leftMenuItems.map(item => 
        `<h3>${item.name}</h3><p style="font-family: 'Lato', sans-serif; color: rgb(148,185,115);">${formatMenuItem(item.price)}</p>`
    ).join('');

    menuRight.innerHTML = rightMenuItems.map(item => 
        `<h3>${item.name}</h3><p style="font-family: 'Lato', sans-serif; color: rgb(148,185,115);">${formatMenuItem(item.price)}</p>`
    ).join('');
}




function handleResize() {
    if (window.innerWidth <= 767) {
        const scaleRatio = 0.5; 
        renderer.setSize(window.innerWidth * scaleRatio, window.innerHeight * scaleRatio);
    } else {
        renderer.setSize(650, 400);
    }
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function init() {
    loadModel(currentModelIndex);
    updateHeading(currentModelIndex);
    updateMenu(currentModelIndex);

    camera.position.z = 4;

    const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', handleResize);

    prevButton.addEventListener('click', function () {
        currentModelIndex = (currentModelIndex - 1 + modelSettings.length) % modelSettings.length;
        loadModel(currentModelIndex);
        updateHeading(currentModelIndex);
        updateMenu(currentModelIndex);
    });

    nextButton.addEventListener('click', function () {
        currentModelIndex = (currentModelIndex + 1) % modelSettings.length;
        loadModel(currentModelIndex);
        updateHeading(currentModelIndex);
        updateMenu(currentModelIndex);
    });

    handleResize(); 
}

// Add Lights
const ambientLight = new THREE.AmbientLight(0x404040, 5); 
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3); 
directionalLight1.position.set(5, 5, 5).normalize();
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight2.position.set(-5, 5, 5).normalize();
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight3.position.set(5, -5, 5).normalize();
scene.add(directionalLight3);

init();
