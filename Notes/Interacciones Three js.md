---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Interacciones Three js 

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
 Las interacciones son acciones que se pueden realizar con el ratón, el teclado o la pantalla táctil para modificar o afectar a la escena o a los objetos que contiene. Three.js ofrece varias formas de implementar interacciones usando eventos, controles, raycasting o librerías externas.
````

## 1-  Eventos
Los eventos son notificaciones que se producen cuando ocurre algo en la escena o en el navegador, como mover el ratón, hacer clic, presionar una tecla, cambiar el tamaño de la ventana, etc. Three.js usa el sistema de eventos nativo de JavaScript para detectar y manejar estos eventos. Para usar los eventos, hay que hacer lo siguiente:
#### 1.1.1-  Crear una función 
Crear una función que se encargue de realizar alguna acción cuando se produzca el evento. 
Por ejemplo:
```js file:"👾 función acción" hl:error:
// Función que cambia el color de un objeto al azar
function changeColor(event) {
	  // Obtener el objeto al que se le aplica el evento
	  const object = event.target;
	  // Generar un color al azar
	  const color = Math.random() * 0xffffff;
	  // Cambiar el color del material del objeto
	  object.material.color.setHex(color);
}
```

#### 1.1.2-  Agregar listener
Añadir un escuchador de eventos al objeto o al elemento que se quiere interactuar. El escuchador de eventos es una función que se encarga de detectar cuando se produce el evento y llamar a la función correspondiente.
```js file:"👾 agregar listener" hl:4 error:
const eventType = 'click', 
	callback = changeColor; //la función de animación
	
addEventListener(eventType,callback)

// Añadir un escuchador de eventos al objeto box para detectar cuando se hace clic sobre él
box.addEventListener("click",changeColor);
```

#### 1.1.3-  borrar listener
Remover el escuchador de eventos cuando ya no se necesite.
```js file:"👾 agregar listener" hl:4 error:
const eventType = 'click', 
	callback = changeColor; //la función de animación
	
removeEventListener(eventType,callback)

// Remover el escuchador de eventos al objeto box
box.removeEventListener("click",changeColor);
```

## 2-  Controles
Los controles son objetos que permiten manipular la cámara o la escena usando el ratón, el teclado o la pantalla táctil. Three.js ofrece varios tipos de controles que se pueden usar para crear diferentes efectos de navegación o interacción.

#### 2.1.1-  importar script
Importar el script correspondiente al tipo de control que se quiere usar.
Los scripts de los controles se encuentran en la carpeta `examples/js/controls` del repositorio de Three.js
```js file:"👾importar script"hl:error:
<!-- Importar el script del control OrbitControls -->
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
```

#### 2.1.2-  Crear instancia del control
Crear una instancia del control y asociarlo a la cámara y al elemento del DOM donde se renderiza la escena. Por ejemplo

```js file:"👾instanciar control"hl:error:
// Crear una instancia del control OrbitControls
const controls = new THREE.OrbitControls(camera,renderer.domElement);
```

#### 2.1.3-  Configurar propiedades del control
Configurar las propiedades del control según las necesidades. Cada tipo de control tiene sus propias propiedades que determinan su comportamiento y sus límites.

```js file:"👾configurar propiedades"hl:error:
// Configurar las propiedades del control OrbitControls
controls.enableZoom = true; // Permitir hacer zoom con la rueda del ratón
controls.enablePan = false; // No permitir desplazar la cámara con el botón derecho del ratón
controls.minDistance = 10; // Establecer la distancia mínima a la que puede acercarse la cámara al centro
controls.maxDistance = 100; // Establecer la distancia máxima a la que puede alejarse la cámara del centro
controls.minPolarAngle = Math.PI / 4; // Establecer el ángulo mínimo vertical a partir del cual puede rotar la cámara
controls.maxPolarAngle = Math.PI / 2; // Establecer el ángulo máximo vertical hasta el cual puede rotar la cámara
```
#### 2.1.4-  Actualizar 
-   Actualizar el control en cada ciclo de renderizado. Para que el control funcione correctamente, hay que llamar al método `update()` en cada ciclo de renderizado. Por ejemplo:
```js file:"👾Actualizar el control" hl:6 error:
// Función que se encarga de renderizar la escena
function animate() {
  // Solicitar al navegador que ejecute esta función en cada ciclo de renderizado
  requestAnimationFrame(animate);
  // Actualizar el control
  controls.update();
  // Renderizar la escena con la cámara
  renderer.render(scene,camera);
}
```

## 3-  Raycasting
El raycasting es una técnica que consiste en lanzar un rayo desde un punto en una dirección y detectar qué objetos intersecta ese rayo. Three.js ofrece una clase llamada Raycaster que permite implementar esta técnica para crear interacciones con los objetos de la escena usando el ratón o la pantalla táctil.

#### 3.1.1-  Crear instancia Raycaster
Crear una instancia del Raycaster y dos vectores para almacenar las coordenadas del ratón o del toque y las coordenadas normalizadas para el rayo. Por ejemplo:
```js file:"👾 crear instancia y vectores" hl:error:
// Crear una instancia del Raycaster
const raycaster = new THREE.Raycaster();

// Crear un vector para almacenar las coordenadas del ratón o del toque
const mouse = new THREE.Vector2();

// Crear un vector para almacenar las coordenadas normalizadas para el rayo
const vector = new THREE.Vector2();
```

#### 3.1.2-  Actualizar coordenadas del ratón
-   Crear una función que se encargue de actualizar las coordenadas del ratón o del toque cuando se mueve sobre el elemento del DOM donde se renderiza la escena. 
- Esta función debe obtener las coordenadas relativas al elemento y convertirlas a un rango entre -1 y 1, donde (-1,-1) es la esquina inferior izquierda y (1,1) es la esquina superior derecha. Por ejemplo:
```js file:"👾 actualizar coordenadas" hl:error:
// Función que actualiza las coordenadas del ratón o del toque
function onMouseMove(event) {
	// Obtener las coordenadas relativas al elemento del DOM
	mouse.x = event.clientX - renderer.domElement.offsetLeft;
	mouse.y = event.clientY - renderer.domElement.offsetTop;
	
	// Convertir las coordenadas a un rango entre -1 y 1
	vector.x = (mouse.x / renderer.domElement.width) * 2 - 1;
	vector.y = -(mouse.y / renderer.domElement.height) * 2 + 1;
}
```

#### 3.1.3-  Agregar listener al tocar el renderizado
Añadir un escuchador de eventos al elemento del DOM para detectar cuando se mueve el ratón o se toca la pantalla sobre él y llamar a la función correspondiente.
```js file:"👾agregar listener"hl:error:
// Añadir un escuchador de eventos al elemento del DOM para detectar cuando se mueve el ratón sobre él
const evento = "mousemove", //nombre del evento
	  funcion = onMouseMove, //la función que se ejecutará
	  useCapture = false; //Indica si el evento se captura o se propaga
	  
renderer.domElement.addEventListener(evento, funcion, useCapture);
```

#### 3.1.4-  Función que detecta intersecciones
Crear una función que se encargue de lanzar el rayo desde la cámara hacia las coordenadas normalizadas y detectar qué objetos intersecta.

- | **Crear vector: ** El vector va desde un punto 3d (en este caso el mouse) y detecta que objetos intersecta
```js
vector, //representa las coordenadas del ratón en el espacio normalizado 
camera; //instancia de clase THREE.Camera que representa

//Lanzar el rayo de la camara hacia las coordenadas normalizadas
raycaster.setFromCamera( vector, camera );
```
- || **Almacenar elementos intersectados:**  Obtener un arreglo de objetos que intersectan con el rayo del raycaster.
```js
const objects = scene.children; //todos los objetos en scene

// Detectar los objetos intersectados
const intersects = raycaster.intersectObjects(objects);
```

```js file:"Ejemplo de función completa" fold
// Función que lanza el rayo y detecta los objetos intersectados
function raycast() {
  // Lanzar el rayo desde la cámara hacia las coordenadas normalizadas
  raycaster.setFromCamera(vector,camera);
  // Detectar los objetos intersectados (se asume que hay un array llamado objects con todos los objetos de la escena)
  const intersects = raycaster.intersectObjects(objects);
  // Si hay algún objeto intersectado
  if (intersects.length > 0) {
    // Obtener el primer objeto intersectado (el más cercano a la cámara)
    const object = intersects[0].object;
    // Cambiar su color a rojo
    object.material.color.set(0xff0000);
    // Escalarlo al doble de su tamaño original
    object.scale.set(2,2,2);
    // Desplazarlo en el eje z una unidad hacia adelante
    object.position.z += 1;
  }
}

```

- | **Agregar listener :**Añadir otro escuchador de eventos al elemento del DOM para detectar cuando se hace clic o se toca sobre él y llamar a la función correspondiente.
```
// Añadir un escuchador de eventos al elemento del DOM para detectar cuando se hace clic sobre él
renderer.domElement.addEventListener("click",raycast,false);
```


<hr class="finale">

![[bat-logo-black.png|150]]



