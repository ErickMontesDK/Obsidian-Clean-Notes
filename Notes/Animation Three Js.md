---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Animation Three Js 
````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
La animación es el proceso de crear movimiento y cambio en los objetos de la escena, como la posición, la rotación, la escala, el color, la forma, etc. Three.js tiene un sistema de animación que te permite crear y controlar animaciones de forma fácil y flexible.
````
## 1-  Conceptos básicos

El sistema de animación de three.js se basa en los siguientes conceptos:
#### 1.1.1-  **KeyframeTrack**
Contiene un array de valores y tiempos que definen cómo cambia una propiedad específica a lo largo del tiempo. Por ejemplo, puedes tener una KeyframeTrack que anime la posición x de un objeto desde 0 a 10 en 5 segundos.
```js file:"👾agregar KeyframeTrack" hl:6 error:
const propiedadToAnimate = '.position[x]',
	times = [0, 1],//Segundos de animación, pueden haber >=1 
	values = [0,2], //El nuevo valor a asignar a su correspondiente segundo. Dabe haber misma cantidad que times
	interpolacion = THREE:InterpolateSmooth //Como debe ser el movimiento entre keyframes
	
KeyframeTrack( propiedarToAnimate, times, values, interpolacion )

// Crear una pista para animar la posición x del cubo con cuatro keyframes
var positionTrack = new THREE.KeyframeTrack('.position[x]', [0, 0.5, 1, 1.5], [0, 2, -2, 0], THREE.InterpolateSmooth);
```

#### 1.1.2-  **AnimationClip**
Un objeto que representa una animación completa. Contiene un array de pistas ([[#1 1 1- KeyframeTrack]]) que definen qué propiedades se animan y cómo cambian a lo largo del tiempo. 
```js file:"👾agregar AnimationClip" hl:6,7 error:
const nameForClip = "animationExample",
	  duration = 5, //Tiempo en seg
	  tracks = [positionTrack, colorTrack], //KeyframeTracks
	  blendMode = THREE.NormalAnimationBlendMode; //Como se combinan dos o mas animaciones 

const clip = AnimationClip( nameForClip, duration, tracks)
clip.blenMode = blendMode

// Crear una AnimationClip con las tres pistas
var clip = new THREE.AnimationClip('clip', -1, [positionTrack,
rotationTrack,
colorTrack]);
```

Donde: 
	- **NormalAnimationBlendMode**: El resultado final es la suma de los valores de cada acción multiplicados por su peso, donde su peso es la influencia que tiene cada acción
	- **AdditiveAnimationBlendMode**:  Es el resultado final es la suma de los valores de cada acción sin tener en cuenta su peso. Este modo es adecuado para algunas animaciones especiales, como la deformación, el sonido, la iluminación, etc.
Para asignar un peso a un keyframe se usa: 
```
action.setEffectiveWeight(0.5);
```
Donde el peso va de 0 a 1

#### 1.1.3-  **AnimationMixer**
El AnimationMixer es un objeto que controla la reproducción de las AnimationClip. Puedes crear uno o varios AnimationMixer para cada escena y añadirles las AnimationClip que quieras reproducir. El AnimationMixer se encarga de actualizar las propiedades de los objetos según las AnimationClip y los tiempos de reproducción.
- | Para crear un AnimationMixer, puedes usar el constructor `new THREE.AnimationMixer(root)` donde root es el objeto raíz de la escena o el objeto que quieras animar. Por ejemplo:
	```
	var mixer = new THREE.AnimationMixer(cube);
	```
- | Para añadir una AnimationClip al AnimationMixer, puedes usar el método `mixer.clipAction(clip)` donde clip es el objeto AnimationClip que quieres reproducir.
	```
	// Añadir la AnimationClip al AnimationMixer
	var action = mixer.clipAction(clip);
	
	// Reproducir la AnimationClip
	action.play();
	```


#### 1.1.4-  **AnimationAction**
un objeto que representa una instancia de una AnimationClip en un AnimationMixer. Contiene información sobre el estado de reproducción de la AnimationClip, como el tiempo actual, la velocidad, el bucle, el peso, etc. Puedes usar el AnimationAction para controlar cómo se reproduce la AnimationClip, como pausarla, reanudarla, detenerla, mezclarla con otras, etc.

## 2-  Animation Loop
El animation loop es un bucle que se ejecuta continuamente y que se encarga de renderizar la escena y actualizar la animación en cada frame. El animation loop es necesario para crear una ilusión de movimiento y cambio en los objetos de la escena.

### 2.1-  Para multiples renderizadores en una página
Si quieres agregar multiples elementos, se hace de la siguiente forma

- | Crear una función que se encargue de renderizar la escena y actualizar la animación en cada frame. Esta función debe solicitar el próximo frame usando el método `requestAnimationFrame`
	```
	//Solicitar el próximo frame
	requestAnimationFrame(render);
	```
- | Obtener el tiempo transcurrido desde el último frame usando un objeto `THREE.Clock`
	```
	// Obtener el tiempo transcurrido desde el último frame
	  var delta = clock.getDelta();
	```
- | Actualizar el estado del AnimationMixer usando el método `mixer.update(delta)`
	```
	// Actualizar el estado del AnimationMixer
	  mixer.update(delta);
	```
- | Renderizar la escena usando el método `renderer.render(scene, camera)`. Por ejemplo
	```
	// Renderizar la escena
	  renderer.render(scene, camera);
	```
- | Llamar  a la función de animación
	```
	// Llamar a la función de renderizado
	render();
	```

#### 2.1.1-  Ejemplo 
```js file:"👾Ejemplo de función de animación"hl:error:
// Crear una función para renderizar la escena
function render() {

  // Solicitar el próximo frame
  requestAnimationFrame(render);

  // Obtener el tiempo transcurrido desde el último frame
  var delta = clock.getDelta();

  // Actualizar el estado del AnimationMixer
  mixer.update(delta);

  // Renderizar la escena
  renderer.render(scene, camera);

}

render();
```


### 2.2-  Para un solo renderizado 
[El método renderer.setAnimationLoop(animate) permite ejecutar la función de animación de forma continua y sincronizada con el refresco de la pantalla](https://www.youtube.com/watch?v=B-E3lhbsLYE)[3](https://www.youtube.com/watch?v=B-E3lhbsLYE). De esta forma se logra una animación fluida y eficiente. El método recibe como parámetro la función de animación que se desea ejecutar.

- | Crear una función de animación. Es crear una función simple
- || Renderizar la escena dentro de la función{}
	```
	function animate() {
		//aquí va el código de animacióm
	
		// Renderizar la escena
		renderer.render(scene, camera);
	}
	```
- | Ejecutar la función de animación con el método setAnimationLoop
	```
	renderer.setAnimationLoop(animate)
	```
	

### 2.3-  Diferencias entre métodos
A diferencia del método [[#2 1- Para multiples renderizadores en una página | requestAnimationFrame]], este método loop utiliza el método `renderer.setAnimationLoop(animate)`. Las diferencias entre una y otra son
-  | El método `renderer.setAnimationLoop(animate)` se encarga de llamar a la función `animate` en cada frame, por lo que no es necesario hacerlo manualmente dentro de la función.
- ||  El método `renderer.setAnimationLoop(animate)` se encarga de pasar el tiempo actual en milisegundos como parámetro a la función `animate`, por lo que no es necesario crear un objeto `THREE.Clock` para obtener el tiempo transcurrido.
- |  El método `renderer.setAnimationLoop(animate)` se encarga de pausar el bucle de animación cuando la pestaña del navegador no está activa, por lo que se ahorra recursos y batería.

La desventaja de usar el método `renderer.setAnimationLoop(animate)` es que solo se puede usar un bucle de animación por renderizador, mientras que con el método `requestAnimationFrame` se pueden usar varios bucles de animación con diferentes renderizadores.
<hr class="finale">

![[bat-logo-black.png|150]]



