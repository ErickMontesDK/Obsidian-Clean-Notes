---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Camera Three js 


````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
La cámara es el elemento que define cómo se ve la escena desde un punto de vista determinado. Hay diferentes tipos de cámaras en Three.js
````

## 1-  Tipos de camera
### 1.1-  PerspectiveCamera
Simula el modo en que los ojos humanos ven el mundo, con una perspectiva que hace que los objetos cercanos se vean más grandes y los lejanos más pequeños. [Esta cámara acepta cuatro argumentos: el campo de visión, el aspecto, el plano cercano y el plano lejano](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[1](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[2](https://threejs.org/docs/api/en/cameras/Camera.html), donde: 
- **Campo de vision**: Es el ángulo que abarca la cámara desde su posición hasta los bordes de la escena. Se mide en grados y determina cuánto se puede ver de la escena. 
	- Un campo de visión pequeño muestra una escena más estrecha y con más detalle, mientras que un campo de visión grande muestra una escena más amplia y con menos detalle. 
	- Un campo de visión de 45 grados muestra una escena como si se viera a través de una lente normal, mientras que un campo de visión de 90 grados muestra una escena como si se viera a través de una lente gran angular.
- **Aspecto**: Es el ratio entre el ancho y el alto de la cámara. Determina la forma de la escena y evita que se distorsione al cambiar el tamaño de la ventana. El aspecto debe coincidir con el ratio del elemento donde se muestra la escena
```js file:"👾PerspectiveCamera" hl:error:
const campoVision = 75,
	aspecto = window.innerWidth / window.innerHeight,
	near = 0.1,
	far = 1000

const camera = new THREE.PerspectiveCamera(campoVision, aspecto, near, far);

```

### 1.2-  OrthographicCamera 
Es un tipo de cámara que muestra los objetos sin perspectiva, es decir, con el mismo tamaño independientemente de la distancia a la cámara. Esto puede ser útil para crear efectos como mapas o juegos en 2D. [Esta cámara acepta seis argumentos: el lado izquierdo, el lado derecho, el lado superior, el lado inferior, el plano cercano y el plano lejano](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[1](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)
```js file:"👾OrthographicCamera" hl:error:
const camera = new THREE.OrthographicCamera(
  -10, // lado izquierdo
  10, // lado derecho
  10, // lado superior
  -10, // lado inferior
  0.1, // plano cercano
  1000 // plano lejano
);

```

### 1.3-  StereoCamera
Es un tipo de cámara que genera dos imágenes ligeramente desplazadas para crear un efecto estereoscópico o 3D. Esto puede ser útil para crear experiencias de realidad virtual o aumentada. [Esta cámara no acepta argumentos, sino que se basa en una cámara principal para obtener sus parámetros](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[1](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[5](https://stackoverflow.com/questions/14061380/how-to-change-the-type-of-camera-in-three-js).
```js file:"👾StereoCamera" hl:error:
const camera = new THREE.StereoCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.update(cameraMain); // cameraMain es una PerspectiveCamera o una OrthographicCamera

```

### 1.4-  CubeCamera
Es un tipo de cámara que genera una textura de cubo desde seis cámaras ortográficas que apuntan a cada dirección del espacio. Esto puede ser útil para crear reflejos o refracciones en los objetos 3D. [Esta cámara acepta tres argumentos: el plano cercano, el plano lejano y la resolución del cubo](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[1](https://www.script-tutorials.com/webgl-with-three-js-lesson-9/)[4](https://blog.cjgammon.com/threejs-lights-cameras/)
```js file:"👾CubeCamera" hl:error:
const camera = new THREE.CubeCamera(
  0.1, // plano cercano
  1000, // plano lejano
  256 // resolución del cubo
);

```

## 2-  Configurar camera

### 2.1-  position
Es una propiedad que define la posición de la cámara en el espacio 3D
```js file:position 
camera.position.set(0, 10, 20); // posiciona la cámara en x = 0, y = 10, z = 20
// o
camera.position.x = 0; // posiciona la cámara en x = 0
camera.position.y = 10; // posiciona la cámara en y = 10
camera.position.z = 20; // posiciona la cámara en z = 20
```

### 2.2-  rotation
Es una propiedad que define la rotación de la cámara en el espacio 3D
```js file:rotation
// rota la cámara en x = 0, y = pi/2, z = 0 radianes
camera.rotation.set(0, Math.PI / 2, 0); 
// o
camera.rotation.x = 0; // rota la cámara en x = 0 radianes
camera.rotation.y = Math.PI / 2; // rota la cámara en y = pi/2 radianes
camera.rotation.z = 0; // rota la cámara en z = 0 radianes

```
#### 2.2.1-  lookAt
Es un método que orienta la cámara hacia un punto específico en el espacio 3D
```js file:"👾lookAt" hl:error:
camera.lookAt(0, 0, 0); 
// orienta la cámara hacia el origen (x = 0, y = 0, z = 0)
```

### 2.3-  updateProjectionMatrix
Es un método que actualiza la matriz de proyección de la cámara según sus propiedades actuales. Esto es necesario cuando se cambia alguna propiedad de la cámara que afecte a su proyección, como el campo de visión o el aspecto.
```js file:"👾updateProjectionMatrix" hl:error:
// cambia el aspecto de la cámara según el tamaño de la ventana
camera.aspect = window.innerWidth / window.innerHeight; 
// actualiza la matriz de proyección para reflejar el cambio
camera.updateProjectionMatrix(); 
```

## 3-  Visualizar posición, orientación y el ángulo de visión de las cámaras
![[Helpers#3- Visualizar posición orientación y el ángulo de visión de las cámaras]]


<hr class="finale">

![[bat-logo-black.png|150]]



