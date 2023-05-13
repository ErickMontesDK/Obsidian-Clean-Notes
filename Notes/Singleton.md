---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Singleton 

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Un singleton <mark class="hltr-blue">es una clase que solo se puede instanciar una vez. Esto significa que solo hay un objeto de esa clase en toda la aplicación, y se puede acceder a él desde cualquier parte</mark>. Un singleton se usa para manejar el estado global de una aplicación, es decir, <mark class="hltr-blue">la información que se comparte entre todos los componentes</mark>.
![[Pasted image 20230513030130.png|500]]

```ad-example
collapse:
Supongamos que tenemos una aplicación de chat que tiene varios usuarios conectados. Podríamos tener una clase Chat que guarda la lista de usuarios, los mensajes enviados y recibidos, y las opciones de configuración. Si queremos que todos los componentes de la aplicación puedan acceder a esta información, podríamos usar un singleton de Chat, de modo que solo haya una instancia de esta clase y se pueda obtener desde cualquier lugar.
```
````

## 1-  ¿Como se crea un singleton?
Hay varias formas de crear un singleton en JavaScript, pero vamos a ver dos ejemplos:
### 1.1-  Usando clases ES2015

Para crear un singleton con clases ES2015, podemos usar el constructor de la clase para verificar si ya existe una instancia de esa clase. Si existe, lanzamos un error para evitar crear una nueva instancia. Si no existe, guardamos la referencia a la instancia en una variable y la devolvemos con un método estático.


```js TI:"Singleton con clase" HL:"9-12,35,38"
// Creamos una variable para guardar la instancia y el contador
let instance;
let counter = 0;

// Definimos la clase Counter
class Counter {
  // En el constructor verificamos si ya existe una instancia, si existe lanzamos un error, Si no existe guardamos la referencia a la instancia
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  // Creamos un método estático para obtener la instancia
  static getInstance() {
    return instance;
  }

  // Creamos otros métodos para manejar el contador
  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// Creamos una instancia de Counter
const counter1 = new Counter();

// Intentamos crear otra instancia de Counter
const counter2 = new Counter(); // Error: You can only create one instance!
```
<mark class="hltr-blue">De esta forma, nos aseguramos de que solo haya una instancia de Counter en toda la aplicación.</mark>

<mark class="hltr-blue">Una vez que hemos creado el singleton, debemos evitar que se modifique accidentalmente por otros componentes. Para ello, podemos usar el método Object.freeze, que impide que se agreguen, eliminen o cambien las propiedades y métodos del objeto.</mark>
```javascript HL:"21"
const counter = {
  count: 0,

  getCount() {
    return this.count;
  },

  increment() {
    return ++this.count;
  },

  decrement() {
    return --this.count;
  },
};

// Congelamos el objeto counter para evitar modificaciones
Object.freeze(counter);

// Exportamos el objeto counter desde el módulo
export default counter;
```
### 1.2-  Usando objetos regulares

Otra forma de crear un singleton en JavaScript es usando objetos regulares. Un objeto regular es simplemente una colección de propiedades y métodos que se pueden crear directamente sin usar una clase.

```js title HL:"2,21"
// Creamos un objeto con las propiedades y métodos del contador
const counter = {
  // Inicializamos el contador en cero
  count: 0,

  // Definimos los métodos para manejar el contador
  getCount() {
    return this.count;
  },

  increment() {
    return ++this.count;
  },

  decrement() {
    return --this.count;
  },
};

// Exportamos el objeto counter desde el módulo
export default counter;

```
De esta forma, podemos importar el objeto counter desde otros archivos y usar sus métodos. Como los objetos se pasan por referencia, <mark class="hltr-blue">todos los archivos estarán importando la misma instancia del objeto counter.</mark>

## 2-  ¿Qué ventajas y desventajas tiene usar singletons?

Los singletons tienen algunas ventajas y desventajas que debemos tener en cuenta antes de usarlos.
### 2.1-  Ventajas

-   Ahorran memoria al evitar crear múltiples instancias innecesarias.
-   Permiten acceder fácilmente al estado global desde cualquier parte de la aplicación.
-   Evitan inconsistencias al tener una sola fuente de verdad.
### 2.2-  Desventajas
-   Dificultan el testing al depender de una instancia global que puede ser modificada por otros componentes.
-   Aumentan el acoplamiento entre los componentes, ya que todos dependen del mismo objeto y pueden afectarse entre sí.
-   Complican el entendimiento del flujo de datos, ya que no queda claro qué componente modifica el estado y cuándo.
-   Violan el principio de responsabilidad única, ya que el singleton se encarga de muchas tareas y puede crecer demasiado.
-   Impiden el uso de polimorfismo, ya que no se puede crear subclases o implementar interfaces con el singleton

## 3-  ¿Qué alternativas existen para manejar el estado global?

Los singletons son una forma de manejar el estado global de una aplicación, pero no son la única ni la mejor. De hecho, <mark class="hltr-blue">los singletons son considerados un anti-patrón por muchos desarrolladores, ya que pueden causar problemas de acoplamiento, complejidad y mantenibilidad.</mark>

Existen otras alternativas para manejar el estado global de una aplicación de forma más segura y eficiente. Algunas de ellas son:

-   Usar herramientas como Redux o React Context, que permiten crear un almacén centralizado de datos y acceder a él desde cualquier componente mediante acciones y selectores.
-   Usar patrones como Observer o Pub/Sub, que permiten crear eventos y suscriptores para comunicar los cambios de estado entre los componentes.
-   Usar hooks personalizados o servicios inyectables, que permiten encapsular la lógica y los datos del estado global y exponerlos mediante funciones o métodos.

Estas alternativas tienen sus propias ventajas y desventajas, y dependen del tipo de aplicación que estemos desarrollando. Lo importante es elegir la que mejor se adapte a nuestras necesidades y evitar abusar del uso de singletons.


<hr>

## 4-  DIE FLASHCARDS

#### ¿Qué es un singleton y cómo se crea?

Un singleton es una clase que solo se puede instanciar una vez. Se puede crear con un constructor que verifique si ya existe una instancia o con un objeto regular que se exporte desde un módulo.

#### ¿Qué ventajas tiene usar singletons?

Las ventajas son que ahorran memoria, permiten acceder al estado global y evitan inconsistencias.

#### ¿Qué desventajas tiene usar singletons?

Las desventajas son que dificultan el testing, aumentan el acoplamiento, complican el flujo de datos, violan el principio de responsabilidad única e impiden el polimorfismo.

#### ¿Qué alternativas existen para manejar el estado global?

Algunas alternativas son usar herramientas como Redux o React Context, que crean un almacén centralizado de datos y lo exponen mediante acciones y selectores; usar patrones como Observer o Pub/Sub, que crean eventos y suscriptores para comunicar los cambios de estado; o usar hooks personalizados o servicios inyectables, que encapsulan la lógica y los datos del estado global y los exponen mediante funciones o métodos.

#### ¿Cómo se evita que se modifique el singleton?

Se puede evitar que se modifique el singleton usando el método Object.freeze, que impide que se agreguen, eliminen o cambien las propiedades y métodos del objeto.


