---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Renderizado y Scene Three js 


````ad-info
title: Index
collapse: 
```toc
```

````

## 1-  Crear área de renderizado 3d
#### 1.1.1-  Crear una instancia
Crear una instancia de `THREE.WebGL1Renderer`, que es un tipo de renderizador que usa WebGL 1.0 para mostrar la escena 3D. Guardar la instancia en una constante llamada `renderer`
```
const renderer = new THREE.WebGL1Renderer();
```
#### 1.1.2-  Asignar contenedor 
- Creamos el contenedor a usar, o usamos **window** si usamos toda la ventana
```
const container = document.querySelector("#container");
// o
const container = document.getElementById("container");
```
-  Agregamos la instancia **renderer** al contenedor. 
```
container.appendChild(renderer.domElement);
//
document.body.appendChild(renderer.domElement);
```
#### 1.1.3-  Ajustar tamaño de área
-   Ajustar el tamaño del renderizador al ancho y alto del contenedor que se desea. 
- `innerWidth, innerHeight` hace que el renderizador ocupe todo el espacio disponible en la pantalla.
- `clientWidth, clientHeight` ajusta al tamaño del contenedor
```
renderer.setSize(window.innerWidth, window.innerHeight);
//
renderer.setSize(container.clientWidth, container.clientHeight);
```

## 2-  Clase Scene
-   La clase Scene permite configurar qué y dónde se va a renderizar con three.js.
-   Es donde se colocan los objetos, las luces y las cámaras.
### 2.1-  Crear instancia
-   Crear una instancia de `THREE.Scene`, que es el contenedor principal donde se agregan todos los elementos 3D que se quieren mostrar. Guardar la instancia en una constante llamada `scene`.
```
const scene = new THREE.Scene();
```

### 2.2-  Configurar scene
 La escena tiene propiedades como el fondo, la niebla, los helpers, etc.

#### 2.2.1-  Agregar  Ejes cartesianos
```js
const size = 10; 
const axesHelper = new THREE.AxesHelper( size ); 
scene.add( axesHelper );
```
#### 2.2.2-  Agregar cuadricula
```js
const size = 10; 
const divisions = 10; c
onst gridHelper = new THREE.GridHelper( size, divisions ); 
scene.add( gridHelper );
```
#### 2.2.3-  Agregar Niebla
- Niebla con gradiente linear
```js
const color = 0xcccccc,
	near = 0,
	far = 200;

scene.fog = new THREE.Fog(color, near, far);
```
- Niebla con gradiente exponencial
```js
const color = 0xcccccc,
	density = 0.002;

scene.fog = new THREE.FogExp2( color, density );
```
#### 2.2.4-  Agregar background
Para poner un fondo a toda la escena, se puede usar la propiedad `background` de la escena. Esta propiedad acepta diferentes tipos de valores, como un color, una textura o un cubo de textura.
- |   Para poner un **fondo de color sólido**, se puede usar un objeto `THREE.Color` o un valor hexadecimal. Por ejemplo:

```js
const color = 0xffffff
scene.background = new THREE.Color(color); // blanco
// o
scene.background = color; // blanco
```

- | Para poner un **fondo de textura,** se puede usar un objeto `THREE.Texture` o un `THREE.TextureLoader` para cargar una imagen. Por ejemplo:

```js
const texture = new THREE.TextureLoader().load("image.jpg");
scene.background = texture;
```


- |  Para poner un** fondo de cubo de textura,** se puede usar un objeto `THREE.CubeTexture` o un `THREE.CubeTextureLoader` para cargar seis imágenes que representen las caras de un cubo. Por ejemplo:

```js
const cubeTexture = new THREE.CubeTextureLoader().load([
  "px.jpg",
  "nx.jpg",
  "py.jpg",
  "ny.jpg",
  "pz.jpg",
  "nz.jpg",
]);
scene.background = cubeTexture;
```

## 3-  Activar renderizado de sombras
Es necesario poder configurar las sombras en el renderizado para que estas se puedan mostrar. [Esto se hace con la siguiente línea de código](https://programmerclick.com/article/93281428047/)[1](https://programmerclick.com/article/93281428047/): ^5f44c6
```
// Activar el renderizado de sombras
renderer.shadowMap.enabled = true;
```
Al activar el renderizado de sombras, se le indica al renderizador que genere un mapa de sombras para cada luz que pueda proyectar sombras. Un mapa de sombras es una imagen que almacena la información de la distancia entre la luz y los objetos de la escena. El renderizador usa este mapa para determinar qué zonas están iluminadas y qué zonas están en sombra.



<hr class="finale">

![[bat-logo-black.png|150]]



