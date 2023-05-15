---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Module Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es un módulo en JavaScript?

- Un módulo es un archivo que contiene código JavaScript, con algunas diferencias de comportamiento respecto a un script normal.

#### ¿Qué ventajas tiene usar módulos?

- Los módulos permiten organizar el código en unidades lógicas y separadas, facilitar su mantenimiento y reutilización, evitar la contaminación del ámbito global y los conflictos de nombres, y controlar la carga y ejecución del código.

#### ¿Qué palabras clave se usan para exportar e importar valores desde y hacia los módulos?

- Se usan las palabras clave `export` e `import`.

#### ¿Qué tipos de exportación e importación existen?

- Existen la exportación e importación nombradas, la exportación e importación por defecto, la importación de todos los valores de un módulo y la importación dinámica de un módulo.

#### ¿Cómo se hace una exportación e importación nombrada?

- Se hace añadiendo la palabra clave `export` delante de cada valor que se quiere exportar desde un módulo, y usando el nombre del valor entre llaves y el nombre del módulo para importarlo.

#### ¿Cómo se hace una exportación e importación por defecto?

- Se hace añadiendo la palabra clave `export default` delante de un solo valor que se quiere exportar desde un módulo, y usando el nombre del valor sin llaves y el nombre del módulo para importarlo. Se puede dar otro nombre al valor al importarlo.

#### ¿Cómo se hace una importación de todos los valores de un módulo?

- Se hace usando un asterisco `*` y dando un nombre al módulo del que se quiere importar todos los valores. Los valores importados son propiedades del objeto que representa al módulo.

#### ¿Cómo se hace una importación dinámica de un módulo?

- Se hace usando la función `import()` que recibe el nombre del módulo que se quiere importar y devuelve una promesa con el valor del módulo. Se puede usar una expresión para indicar el nombre del módulo según ciertas condiciones.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
-   Un módulo es un archivo que contiene código JavaScript, con algunas diferencias de comportamiento respecto a un script normal.
-   Un módulo tiene su propio ámbito (scope), lo que significa que las declaraciones dentro de un módulo no son accesibles desde fuera, a menos que se exporten explícitamente.
-   Un módulo solo se ejecuta una vez, la primera vez que se importa. Las importaciones posteriores devuelven el mismo valor que se exportó la primera vez.

Este patrón nos permite organizar nuestro código en unidades lógicas y separadas, lo que <mark class="hltr-truecyan">facilita su mantenimiento y reutilización</mark>. Por otro lado, nos ayuda a<mark class="hltr-truecyan"> evitar la contaminación del ámbito global y los posibles conflictos de nombres con otras variables o funciones declaradas</mark> en nuestro código o en las dependencias que usemos. Además, nos da <mark class="hltr-truecyan">más control sobre la carga y ejecución del código</mark>, ya que podemos importar los valores que necesitemos cuando los necesitemos, e <mark class="hltr-truecyan">incluso hacerlo de forma dinámica</mark> según ciertas condiciones.

Las desventajas de usar el patrón de módulos en JavaScript son pocas. Por un lado, <mark class="hltr-red">puede requerir un transpilador</mark> como Babel para que sea compatible con todos los entornos de ejecución de JavaScript. Por otro lado, puede aumentar la complejidad del código si no se usa con criterio y se abusa de las exportaciones e importaciones. Además, <mark class="hltr-red">puede generar errores si no se respetan las reglas de sintaxis y se intenta acceder a valores que no se han exportado o importado correctamente.</mark>
````
## 1-  ¿Por qué usar módulos?

-   Los módulos te permiten organizar tu código en unidades lógicas y separadas, lo que facilita su mantenimiento y reutilización.
-   Los módulos te ayudan a evitar la contaminación del ámbito global y los posibles conflictos de nombres con otras variables o funciones declaradas en tu código o en las dependencias que uses.
-   Los módulos te dan más control sobre la carga y ejecución del código, ya que puedes importar los valores que necesites cuando los necesites, e incluso hacerlo de forma dinámica según ciertas condiciones.

## 2-  ¿Cómo usar módulos?

### 2.1-  Exportación e importación nombradas
-   La exportación nombrada consiste en usar la palabra clave `export` delante de cada valor que queremos exportar desde un módulo. Podemos exportar tantos valores como queramos con este método. Para importar un valor nombrado, tenemos que usar su nombre entre llaves y el nombre del módulo de donde proviene.
```
export function nameFunction (){ ... }

import {nameFunction } from ./file.js"
```
Tambien podemos reenombrar los elementos al importarlos a nuestro archivo
```
import { add as sumar, multiply as multiplicar } from "./math.js";
```

### 2.2-  Exportación e importación por defecto
-   La exportación por defecto consiste en usar la palabra clave `export default` delante de un solo valor que queremos exportar desde un módulo. Solo podemos tener una exportación por defecto por módulo. Para importar un valor por defecto, tenemos que usar su nombre sin llaves y el nombre del módulo de donde proviene. Podemos darle otro nombre al importarlo si queremos.

```
export default function add(a, b) { return a + b; }

import add from "./math.js";
```
Podemos definirle otro nombre al elemento por default
```
import sumar from "./math.js";
```

### 2.3-  Importación de todos los valores de un módulo
-   La importación de todos los valores de un módulo consiste en usar un asterisco `*` y darle un nombre al módulo del que queremos importar todos los valores. De esta forma, los valores importados son propiedades del objeto que representa al módulo. Este método puede ser útil si queremos acceder a todos los valores de un módulo sin tener que escribirlos uno por uno.
```
import * as name from ".file.js"
```
```js hl:8 
// Funciones en math.js
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export function subtract(a, b) { return a - b; }
export function square(a) { return a * a; }

//Importando todo en index.js
import * as math from "./math.js";

console.log(math.add(2, 3)); // 5
console.log(math.multiply(2, 3)); // 6
console.log(math.subtract(2, 3)); // -1
console.log(math.square(2)); // 4
```

### 2.4-  Importación dinámica de un módulo
-   La importación dinámica de un módulo consiste en usar la función `import()` que recibe el nombre del módulo que queremos importar y devuelve una promesa con el valor del módulo. Este método nos permite importar módulos bajo demanda, según ciertas condiciones o expresiones. De esta forma, podemos optimizar la carga y ejecución del código, solo cargando lo que el usuario necesita cuando lo necesita.

```js file:"Importación dinámica" hl:5 
// index.js
const button = document.getElementById("button");

button.addEventListener("click", () => {
  import("./math.js").then((math) => {
    console.log(math.add(2, 3)); // 5
    console.log(math.multiply(2, 3)); // 6
    console.log(math.subtract(2, 3)); // -1
    console.log(math.square(2)); // 4
  });
});
```

<hr class="finale">

![[bat-logo-black.png|150]]



