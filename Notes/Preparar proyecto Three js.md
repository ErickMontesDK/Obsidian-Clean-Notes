---
banner: "![[3d-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Preparar proyecto Three.js

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract

````

## 1-  Instalar dependencias

#### 1.1.1-  Parcel
Parcel es un empaquetador de aplicaciones web que ofrece un rendimiento rápido y no requiere configuración. Puedes instalarlo globalmente usando yarn o npm
```
npm install -g parcel-bundler
```
Para iniciar el servidor de desarrollo de parcel, solo tienes que apuntarlo a tu archivo HTML donde estará el proyecto 
```
parcel index.html
```
Esto iniciará un servidor local en http://localhost:1234/ donde podrás ver tu aplicación web. Parcel también se encargará de recargar la página cada vez que cambies algún archivo y soportará el reemplazo de módulos en caliente para un desarrollo rápido.

#### 1.1.2-  Instalar Three y dat.gui
Three es la librería que te permite crear y mostrar gráficos 3D en el navegador web usando WebGL. 
Dat.gui es una librería que te permite crear interfaces gráficas para modificar las propiedades de los objetos 3D. 
Puedes instalar ambas librerías localmente en tu proyecto usando yarn o npm:
```
npm install three dat.gui
```

## 2-  Preparar HTML y JS
#### 2.1.1-  Configurar html
En un documento generico de HTML, agregar como script el archivo js al que vamos a trabajar el código. Este script va dentro de < body>
```HTML file:"👾Plantilla html para three.js" hl:7 error:
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Three.js</title>
</head>
<body>
    <script src="./js/scripts.js" type="module"></script>
</body>
</html>
```

#### 2.1.2-  Importar dependencias a JS
Solo agregar dependencias anteriormente instaladas
```js file:"👾title" hl:error:
import * as THREE from "three";
import * as dat from "dat.gui";
```


<hr class="finale">

![[bat-logo-black.png|150]]


