---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Dat.gui 
````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Dat.gui
````

## 1-  Instalación
Para usar dat.GUI en Three.js, hay que instalar la librería y sus definiciones de tipos usando npm. Por ejemplo:

```bash
npm install dat.gui --save-dev
npm install @types/dat.gui@0.7.7 --save-dev
```

Luego, hay que importar la librería en el script donde se usa Three.js. Por ejemplo:

```javascript
import { GUI } from 'dat.gui';
```

## 2-  Uso
#### 2.1.1-  Crear una instancia de la clase GUI y añadirla al documento HTML
Se crea una instancia del GUI y se asigna al elemento del renderizado

```js
// Crear una instancia de la clase GUI
const gui = new GUI();
// Añadir la instancia al documento HTML
document.body.appendChild(gui.domElement);
```

#### 2.1.2-  Crear carpetas 
Se crean carpetas o grupos dentro de la instancia de GUI para agrupar los controles por categorías. 
Para crear una carpeta, se usa el método `addFolder(name)`, donde `name` es una cadena que indica el nombre de la carpeta. Por ejemplo:

```javascript
// Crear una carpeta para los controles del cubo
const cubeFolder = gui.addFolder('Cube');
// Crear una carpeta para los controles de la cámara
const cameraFolder = gui.addFolder('Camera');
```

#### 2.1.3-  Asignar controles
Añadir controles a las carpetas para modificar las propiedades de los objetos o ejecutar funciones. Por ejemplo: 
```js
	const options = {
		sphereColor:'#ffea00',
		wireframe: true,
		speed:0.01,
		angle: 0.2,
		penumbra: 0.5,
		intensity:0.5
	};
```

Se selecciona el folder, se le agrega `.add` más la propiedad que se va a modificar. Hay 3 formas de asignar estos cambios.
- | Agregar un rango: Se asigna un valor minimo y máximo al final
	```
	cameraFolder.add(options, 'z', 0, 10);
	```
- || Activar o desactivar: Se crea una función para cambiar un valor entre un valor booleano 
	```
	folder.add(options, 'wireframe').onChange(function(e){
	    sphere.material.wireframe(e);
	});
	```
- | Agregar un color: Cuando se va a modificar un color se usa esta sintexis especial para tener un pick color
	```
	folder.addColor(options, 'sphereColor').onChange(function(e){
	    sphere.material.color.set(e);
	});
	```



<hr class="finale">

![[bat-logo-black.png|150]]



