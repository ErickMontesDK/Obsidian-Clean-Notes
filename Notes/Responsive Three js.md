---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Responsive Three JS

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El renderizado responsivo se refiere a la capacidad de adaptar la escena 3D al tamaño y la proporción de la ventana del navegador, de forma que se mantenga la calidad y la coherencia de la imagen. Para hacer el renderizado responsivo en Three.js, hay que hacer lo siguiente:
````

## 1-  Crear responsive

#### 1.1.1-  Crear una función que se ejecute cuando la ventana cambie de tamaño
Creamos la función y agregamos un evento que detecte cuando hay un cambio de tamaño
```js file:"👾funcion y evento" hl:error:
// Función que se ejecuta cuando cambia el tamaño de la ventana
function onWindowResize() {
	//código de función...
}

// Añadir un escuchador de eventos para detectar cuando cambia el tamaño de la ventana
window.addEventListener('resize', onWindowResize);
```


#### 1.1.2-  Ajustar el aspecto y el tamaño de la cámara
Ajustar el aspecto y el tamaño de la cámara según el tamaño del canvas. La cámara es el objeto que determina cómo se ve la escena 3D desde un punto de vista.

```js file:"👾funcion y evento" hl:3,5,7error:
function onWindowResize() {
// Obtener las referencias al canvas, la cámara y el renderizador
  const canvas = renderer.domElement;
  // Ajustar el aspecto y el tamaño de la cámara
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //Actualizar el aspecto de camara
  camera.updateProjectionMatrix();

 //resto del código...
}

window.addEventListener('resize', onWindowResize);
```

#### 1.1.3-  Ajustar el tamaño del renderizador 
Ajustar el tamaño del renderizador según el tamaño del canvas. El renderizador es el objeto que se encarga de dibujar la escena 3D en el canvas. Para que el renderizador tenga el mismo tamaño que el canvas, se puede usar el método 
```
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
```

```js hl:8 error:
function onWindowResize() {
  const canvas = renderer.domElement;

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  
  // Ajustar el tamaño del renderizador
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

window.addEventListener('resize', onWindowResize);
```


<hr class="finale">

![[bat-logo-black.png|150]]



