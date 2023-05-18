---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Objetos Three js 

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract

````

## 1-  Insertar objeto
Para insertar un objeto, se tienen que hacer 3 pasos por lo menos. 
- Crear la geometría
- Asignar el material
- Agregar a scene
### 1.1-  Tipos de geometria
La estructura básica para crear el mesh de una figura es 
```
const geometry = new THREE. ---
//Donde asignamos la figura con sus parametros, que son los siguientes
```
Los tipos de figuras son:
-   **BoxGeometry**:
    -   `.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);`
-   **SphereGeometry**:
    -   `.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);`
-   **CylinderGeometry**:
    -   `.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);`
-   **TorusGeometry**:
    -   `.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments, arc);`
-   **PlaneGeometry**:
    -   `.PlaneGeometry(width, height, widthSegments, heightSegments);`
-   **CircleGeometry**:
    -   `.CircleGeometry(radius, segments, thetaStart, thetaLength);`
-   **DodecahedronGeometry**:
    -   `.DodecahedronGeometry(radius, detail);`
-   **WireframeGeometry**:
    -   `.WireframeGeometry(geometry);`

### 1.2-  Asignar Material
Hay varios tipos de materiales que puedes agregar a una figura en three js, como **MeshBasicMaterial**, **MeshPhongMaterial**, **MeshLambertMaterial**, etc. Cada uno tiene diferentes propiedades y efectos sobre la apariencia de la figura


-   **MeshBasicMaterial**: Es un material que no es afectado por las luces. Solo tiene un color o una textura que se aplica a la figura. 
	- `new THREE.MeshBasicMaterial({color:0xffffff})`
-   **MeshLambertMaterial**: Es un material que es afectado por las luces difusas. Tiene un aspecto mate y no refleja la luz especular. 
	- `new THREE.MeshLambertMaterial({color:0xff0000})`
-   **MeshPhongMaterial**: Es un material que es afectado por las luces difusas y especulares. Tiene un aspecto brillante y refleja la luz especular. 
	- `new THREE.MeshPhongMaterial({color:0x00ff00, shininess:100})`
-   **MeshStandardMaterial**: Es un material que es afectado por las luces difusas y especulares. Tiene un aspecto realista y se basa en el modelo de iluminación física. 
	- `new THREE.MeshStandardMaterial({color:0x0000ff, metalness:0.5, roughness:0.5})`
-   **MeshToonMaterial**: Es un material que es afectado por las luces difusas y especulares. Tiene un aspecto de dibujo animado y usa un mapa de gradiente para crear sombras. 
	- `new THREE.MeshToonMaterial({color:0xffff00, gradientMap:gradientTexture})`
- **MeshDepthMaterial**: Es un material que muestra la profundidad de los objetos en la escena. Los objetos más cercanos a la cámara son más blancos y los más lejanos son más negros. 
	- `new THREE.MeshDepthMaterial()`
-   **MeshNormalMaterial**: Es un material que muestra la dirección de las normales de los objetos en la escena. Las normales son vectores perpendiculares a las superficies que indican cómo se refleja la luz. 
	- `new THREE.MeshNormalMaterial()`

### 1.3-  Crear el objeto con mesh y material
Asignado la forma y un material, se asigna el material a la mesh y se agregan a scene
```js
const object = new THREE.Mesh(geometry, material); // crea un object con la geometría y el material

scene.add(object); //Se agrega a scene
```

## 2-  Modificar propiedades
Una vez que el objeto esta en scene, puedes modificar sus propiedades de la siguiente forma:

#### 2.1.1-  orientación, posición, tamaño
Para cambiar la posición, la escala, la rotación o el cuaternión de un objeto, puedes acceder a esas propiedades directamente y asignarles nuevos valores.
-   **position**: puedes usar las propiedades `x`, `y` y `z` de la propiedad `position`. Por ejemplo, si quieres mover un objeto 5 unidades hacia la derecha, puedes hacer: 
	- `objeto.position.x += 5;`.
-   **scale**: puedes usar las propiedades `x`, `y` y `z` de la propiedad `scale`. Por ejemplo, si quieres hacer un objeto dos veces más grande, puedes hacer: 
	- `objeto.scale.set(2, 2, 2);`.
-   **rotation**: puedes usar las propiedades `x`, `y` y `z` de la propiedad `rotation`. Estas propiedades representan los ángulos de Euler en radianes. Por ejemplo, si quieres rotar un objeto 90 grados alrededor del eje Y, puedes hacer: 
	- `objeto.rotation.y = Math.PI / 2;`.
-   **quaternion**: puedes usar las propiedades `x`, `y`, `z` y `w` de la propiedad `quaternion`. Los cuaterniones son una forma alternativa de representar la orientación de un objeto sin sufrir el problema del bloqueo del cardán. Por ejemplo, si quieres rotar un objeto 45 grados alrededor del eje Z, puedes hacer: 
	- `objeto.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 4);`

#### 2.1.2-  Propiedades de material
 Cada tipo de material tiene sus propias características y parámetros que puedes modificar.
 Al modificar, especificas el objeto a usar, seguido de material y despues la propiedad, como:

```
 objeto.material.property...
```

Algunas de las propiedades comunes que tienen todos los materiales son:

-   `color`: el color del material. Puedes usar un número hexadecimal o una cadena de CSS para asignarlo. Por ejemplo: 
	- `material.color.set(0xff0000);` o `material.color.set('red');`.
-   `opacity`: la opacidad del material. Un valor de 0 significa totalmente transparente y un valor de 1 significa totalmente opaco. Por ejemplo: 
	- `material.opacity = 0.5;`.
-   `transparent`: un booleano que indica si el material es transparente o no. Si es verdadero, se tendrá en cuenta la opacidad del material. Por ejemplo:
	- `material.transparent = true;`.
-   `visible`: un booleano que indica si el material es visible o no. Si es falso, el material no se renderizará. Por ejemplo: 
	- `material.visible = false;`.
-   `wireframe`: un booleano que indica si el material se renderiza como un alambre o no. Si es verdadero, solo se mostrarán las aristas de la geometría. Por ejemplo: 
	- `material.wireframe = true;`.

Algunas de las propiedades específicas que tienen algunos tipos de materiales son:

-   `map`: el mapa de textura del material. Puedes usar un objeto Texture para asignarlo. Por ejemplo: 
	- `material.map = textureLoader.load(monoga);`.
-   `envMap`: el mapa de entorno del material. Puedes usar un objeto CubeTexture o Texture para asignarlo. Este mapa se usa para simular reflejos o refracciones en el material. Por ejemplo: 
	- `material.envMap = cubeTextureLoader.load([angel,angel, monoga,monoga,monoga, monoga]);`.
-   `emissive`: el color emisivo del material. Este color se suma al color del material para simular que el material emite luz propia. Por ejemplo: 
	- `material.emissive.set(0x00ff00);`.
-   `shininess`: el brillo del material. Solo se aplica a los materiales Phong y Toon. Este valor determina el tamaño y la intensidad del resplandor especular en el material. Por ejemplo: 
	- `material.shininess = 100;`.



<hr class="finale">

![[bat-logo-black.png|150]]



