---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Helpers 
````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Los helpers son objetos que se usan para visualizar o facilitar el uso de otros objetos de la escena, como luces, cámaras, ejes, planos, etc. Three.js ofrece varios tipos de helpers que se pueden usar para depurar o mejorar la escena.
````

## 1-  Visualizar sistema de coordenadas u orientación de objetos
#### 1.1.1-  AxesHelper
Es un helper que muestra los ejes cartesianos (x,y,z) en rojo, verde y azul respectivamente. Se usa para visualizar el sistema de coordenadas o la orientación de los objetos.
```js
const size = 5;

const axes = new THREE.AxesHelper( size );
scene.add(axes);
```

#### 1.1.2-  GridHelper
Es un helper que muestra una cuadrícula en el plano xz. Se usa para visualizar las coordenadas o las medidas del espacio
```js
const size = 10,
	divisions = 10, //Divisiones por lado
	color1 = 0xcccccc, //Color principal de las lineas
	color2 = 0xffffff; //Color secundario de lineas

const grid = new THREE.GridHelper(size,divisions,color1,color2)
scene.add(grid);
```

#### 1.1.3-  PolarGridHelper
Es un helper que muestra una cuadrícula polar en el plano xz. Se usa para visualizar las coordenadas o las medidas del espacio en coordenadas polares.
```js
const radius = 10,//radio máx de cuadrícula
	radials = 10, //numero de lineas radiales
	circles = 0xcccccc, //Número de circulos concentricos
	color1 = 0xcccccc,//Color principal de las lineas
	color2 = 0xffffff; //Color secundario de lineas

const polar = new THREE.PolarGridHelper(radius,radials,circles,color1,color2);
scene.add(polar);
```
## 2-  Visualizar el volumen o limites de los objetos
#### 2.1.1-  BoxHelper
Es un helper que muestra una caja alineada con los ejes que envuelve a otro objeto. Se usa para visualizar el volumen o los límites de los objetos.
```js
const box = boxMesh,// objeto al que se aplica el helper
	color = 0xffffff; //color de helper

const boxHelper = new THREE.BoxHelper(box,color)
scene.add(boxHelper)
````

#### 2.1.2-  Box3Helper
Es un helper que muestra una caja alineada con los ejes que envuelve a una región del espacio definida por una instancia de Box3. Se usa para visualizar regiones arbitrarias del espacio.
```js
const box = boxMesh,// objeto al que se aplica el helper
	color = 0xffffff; //color de helper

const box3Helper = new THREE.Box3Helper(box, color)
scene.add(box3Helper)
````

#### 2.1.3-  Planehelper
 Es un helper que muestra una representación visual de un plano definido por una instancia de Plane. Se usa para visualizar planos arbitrarios del espacio
```js
const plane = planeMesh,
	  size = 10,
	  color = 0xffffff; //color de helper

const planeHelper = new THREE.PlaneHelper(plane,size,color)
scene.add(planeHelper)
````

## 3-  Visualizar posición, orientación y el ángulo de visión de las cámaras
#### 3.1.1-  CameraHelper
Es un helper que muestra una representación visual de una cámara y su frustum (el volumen del espacio que puede ver la cámara). Se usa para visualizar la posición, la orientación y el ángulo de visión de las cámaras.
```js
const camera = camera

const cameraHelper = new THREE.CameraHelper(camera)
scene.add(cameraHelper)
````



## 4-  Visualizar posición, orientación y parámetros de las luces
#### 4.1.1-  DirectionalLightHelper
Es un helper que muestra una representación visual de una luz direccional y su dirección. Se usa para visualizar la posición, la orientación y el ángulo de las luces direccionales.
```js
const light = directionalLightObject,
	  size = 10,
	  color = 0xffffff; //color de helper

const directionalHelper = new THREE.DirectionalLightHelper(light,size,color)
scene.add(directionalHelper)
````

#### 4.1.2-  HemisphereLightHelper
 Es un helper que muestra una representación visual de una luz hemisférica y sus colores. Se usa para visualizar la posición y los colores de las luces hemisféricas.
```js
const light = hemisphereLightObject,
	  size = 10,
	  color = 0xffffff; //color de helper

const hemisphereHelper = new THREE.HemisphereLightHelper(light,size,color)
scene.add(hemisphereHelper)
````

#### 4.1.3-  PointLightHelper
Es un helper que muestra una representación visual de una luz puntual y su distancia máxima. Se usa para visualizar la posición y la distancia de las luces puntuales.
```js
const light = pointLightObject,
	  size = 10,
	  color = 0xffffff; //color de helper

const pointHelper = new THREE.PointLightHelper(light,size,color)
scene.add(pointHelper)
````

#### 4.1.4-  SpotLightHelper
Es un helper que muestra una representación visual de una luz focal y su dirección, ángulo y distancia máxima. Se usa para visualizar la posición, la orientación y los parámetros de las luces focales.
```js
const light = spotLightHelper,
	  color = 0xffffff; //color de helper

const spotHelper = new THREE.SpotLightHelper(light,color);
scene.add(spotHelper);
````



## 5-  Visualizar estructura ósea o articulaciones de objetos animados
#### 5.1.1-  SkeletonHelper
Es un helper que muestra una representación visual del esqueleto (la jerarquía ósea) asociado a otro objeto. Se usa para visualizar la estructura ósea o las articulaciones de los objetos animados.
```js
const object = objectMesh,

const skeletonHelper = new THREE.SkeletonHelper(object);
scene.add(skeletonHelper);
````

## 6-  Visualizar vectores o fuerzas
#### 6.1.1-  ArrowHelper
Es un helper que muestra una flecha que representa una dirección y una longitud. Se usa para visualizar vectores o fuerzas.
```js file:"👾ArrowHelper" hl:error:
new THREE.ArrowHelper(dir,origin,length,color)
```

<hr class="finale">

![[bat-logo-black.png|150]]



