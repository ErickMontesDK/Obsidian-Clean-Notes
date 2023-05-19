---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Iluminación Three js

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
La iluminación es un aspecto fundamental para lograr escenas realistas y atractivas. Three.js ofrece varios tipos de luces que se pueden usar para iluminar los objetos 3D de la escena.
````

## 1-  Tipos de luces
#### 1.1.1-  AmbientLight
Es una luz que ilumina todos los objetos de la escena por igual, sin crear sombras ni reflejos. Se usa para simular la luz ambiental o difusa que proviene de todas las direcciones.
```js file:"👾title" hl:4 error:
const color = 0x333333,
	  intensity = 0.7;
	  
const ambientLight = new THREE.AmbientLight( color, intensity );
scene.add(ambientLight);
```
#### 1.1.2-  DirectionalLight
 Es una luz que ilumina todos los objetos de la escena con la misma intensidad y dirección, como si fuera el sol. Se usa para simular la luz directa o paralela que proviene de una fuente lejana.
 Se puede ajustar la posición, la orientación y el ángulo de la luz con las propiedades `position`, `target` y `angle`. Esta luz puede crear sombras si se activa la propiedad `castShadow`.
```js file:"👾directionalLight" hl:4 error:
const color = 0x333333,
	  intensity = 0.7;
	  
const directionalLight = new THREE.DirectionalLight( color, intensity );
scene.add(directionalLight);
```
#### 1.1.3-  SpotLight
Es una luz que ilumina los objetos de la escena con una intensidad y dirección variables, como si fuera un foco. Se usa para simular la luz puntual o cónica que proviene de una fuente cercana.
Al igual que DirectionalLight, se puede ajustar la posición, la orientación y el ángulo de la luz con las propiedades `position`, `target` y `angle`. Esta luz también puede crear sombras si se activa la propiedad `castShadow`.
```js file:"👾 spotLight" hl:8 error:
const color = 0x333333,
	  intensity = 0.7,
	  distance = 50,
	  angle = 0.3,
	  penumbra = 0.8,
	  decay = 2;
	  
const spotlight new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);

scene.add(spotlight);
```

#### 1.1.4-  PointLight
Es una luz que ilumina los objetos de la escena con una intensidad variable según la distancia, como si fuera una bombilla. Se usa para simular la luz radial o esférica que proviene de una fuente puntual.
A diferencia de las otras luces, esta luz no tiene dirección ni ángulo, solo posición. Esta luz también puede crear sombras si se activa la propiedad `castShadow`.
```js file:"👾 spotLight" hl:8 error:
const color = 0x333333,
	  intensity = 0.7,
	  distance = 50,
	  decay = 2;
	  
const pointlight new THREE.PointLight(color, intensity, distance, decay);

scene.add(pointlight);
```

## 2-  Configurar luz para sombras
Para que las sombras se proyecten, hay que usar un tipo de luz que pueda generarlas. No todas las luces pueden hacerlo. [Los tipos de luces que pueden proyectar sombras son: DirectionalLight, PointLight y SpotLight](https://programmerclick.com/article/93281428047/)[1](https://programmerclick.com/article/93281428047/). Para cada tipo, hay que hacer lo siguiente:
- | Hay que activar la propiedad `castShadow` 
	```
	directionalLight.castShadow = true;
	```
- || ** Para directionalLight:** Configurar los parámetros de la cámara ortográfica que se usa para calcular el mapa de sombras con las propiedades `shadow.camera.left`, `shadow.camera.right`, `shadow.camera.top`, `shadow.camera.bottom`, `shadow.camera.near` y `shadow.camera.far`.
	```
	// Configurar los parámetros de la cámara ortográfica
	directionalLight.shadow.camera.left = -12;
	directionalLight.shadow.camera.right = 12;
	directionalLight.shadow.camera.top = 12;
	directionalLight.shadow.camera.bottom = -12;
	directionalLight.shadow.camera.near = 20;
	directionalLight.shadow.camera.far = 200;
	```
- | **Para spotlight y pointlight:** También hay que activar la propiedad `castShadow` y configurar los parámetros de la cámara en perspectiva que se usa para calcular el mapa de sombras con las propiedades `shadow.camera.near` y `shadow.camera.far`
	```
	// Configurar los parámetros de la cámara en perspectiva
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 200;
	```

## 3-  Visualizar posición, orientación y parámetros de las luces
![[Helpers#4- Visualizar posición orientación y parámetros de las luces]]


<hr class="finale">

![[bat-logo-black.png|150]]



