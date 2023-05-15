---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Observer Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:

#### ¿Qué es el patrón observador?

Es un patrón de diseño de comportamiento que permite definir una dependencia uno a muchos entre objetos, de manera que cuando un objeto cambia de estado, notifica a todos los objetos que dependen de él.

#### ¿Qué tipos de objetos intervienen en el patrón observador?

El patrón observador se basa en dos tipos de objetos: el observable y los observadores. El observable es el objeto que tiene un estado interesante y que puede ser modificado por algún evento. Los observadores son los objetos que quieren estar al tanto de los cambios del observable y que implementan una interfaz común para recibir las notificaciones.

#### ¿Qué métodos tiene el observable y qué hacen?

El observable tiene tres métodos principales: subscribe, unsubscribe y notify. El método subscribe sirve para añadir un observador a la lista de observadores del observable. El método unsubscribe sirve para eliminar un observador de la lista. El método notify sirve para notificar a todos los observadores cuando ocurre un cambio de estado, pasándoles algún dato relevante.

#### ¿Qué método tienen los observadores y qué hace?

Los observadores tienen un método llamado normalmente update o notify. Este método sirve para recibir la notificación del observable y realizar alguna acción con el dato recibido.

#### ¿Qué ventajas y desventajas tiene el patrón observador?

El patrón observador tiene algunas ventajas como el desacoplamiento, la modularidad y la reactividad. También tiene algunas desventajas como el rendimiento, la memoria y la complejidad.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón observador es un patrón de diseño de comportamiento que te permite definir una dependencia uno a muchos entre objetos, de manera que <mark class="hltr-truecyan">cuando un objeto cambia de estado, notifica a todos los objetos que dependen de él</mark>. Esto permite que los objetos se comuniquen entre sí sin estar acoplados directamente.
![[Pasted image 20230514195639.png|300]]
Al desacoplar los objetos observables y observadores, <mark class="hltr-truecyan">facilita su reutilización y mantenimiento. Además, permite crear flujos de datos asíncronos</mark>, donde los observadores reaccionan a los cambios del observable sin bloquear la ejecución.

Sin embargo, el patrón observador también tiene algunas desventajas que hay que tener en cuenta. <mark class="hltr-red">Puede causar problemas de rendimiento si hay muchos observadores o si las notificaciones son muy frecuentes</mark>. También puede <mark class="hltr-red">provocar fugas de memoria si no se eliminan los observadores que ya no se necesitan</mark>. Por último, puede generar comportamientos inesperados si los observadores dependen unos de otros o si el orden de notificación es importante.
````

## 1-  Funcionamiento
El patrón observador se basa en dos tipos de objetos: el observable y los observadores. 

- El <mark class="hltr-truecyan">observable es el objeto que tiene un estado interesante y que puede ser modificado por algún evento.</mark> 
- <mark class="hltr-truecyan">Los observadores son los objetos que quieren estar al tanto de los cambios del observable</mark> y que implementan una interfaz común para recibir las notificaciones.

El observable tiene una lista de observadores a los que puede añadir o eliminar mediante métodos públicos. También tiene un método para notificar a todos los observadores cuando ocurre un cambio de estado, pasándoles algún dato relevante.

Los observadores tienen un método para recibir la notificación del observable y realizar alguna acción con el dato recibido. Este método se llama normalmente update o notify.

### 1.1-  Ejemplo de patrón observador en JavaScript

En este ejemplo, vamos a crear un observable que representa un botón y dos observadores que representan una función para mostrar una notificación y otra para registrar el evento. Cada vez que se haga clic en el botón, el observable notificará a los observadores con el mensaje “User clicked button!”.

Para crear el observable, vamos a usar una clase ES6 que tenga las siguientes propiedades y métodos:

- <mark class="hltr-truecyan">  **observers**: un array de observadores que se suscriben al observable
-   <mark class="hltr-truecyan">**subscribe**: un método para añadir un observador a la lista</mark>
-   <mark class="hltr-truecyan">**unsubscribe**: un método para eliminar un observador de la lista</mark>
-   <mark class="hltr-truecyan">**notify**: un método para notificar a todos los observadores con un dato</mark></mark>

#### 1.1.1-  Crear el observable
```js file:"👾class Observable" hl:3,6,10,14 error:
class Observable {
  constructor() {
    this.observers = []; //Lista de observadores
  }

  subscribe(observer) {
    this.observers.push(observer); // Añadir un observador a la lista
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer); // Eliminar un observador de la lista
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data)); // Notificar a cada observador con el dato
  }
}

```

#### 1.1.2-  Crear los observadores

Para crear los observadores, se usan dos funciones simples que implementan el método update y reciben el dato del observable. Una función muestra una notificación en la pantalla y otra registra el evento en la consola.
```js file:"👾 funciones observadoras" hl:error:
// Función para mostrar una notificación
function toastify() {
  this.update = function (data) {
    // Crear un elemento div con el mensaje
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = data;

    // Añadir el elemento al body
    document.body.appendChild(toast);

    // Eliminar el elemento después de 3 segundos
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };
}

// Función para registrar el evento
function logger() {
  this.update = function (data) {
    // Mostrar el mensaje en la consola
    console.log(data);
  };
}
```

#### 1.1.3-  Crear componentes
Se usan dos elementos div con un texto y un evento click. Cada vez que se hace clic en el botón o en el interruptor, se invoca el método notify del observable con un mensaje diferente.

```javascript file:"👾 Componentes que ejecutan evento" hl:17-18,24-26,30-31,36-37 error:
// Crear el elemento div con el texto "Click me!"
let button = document.createElement("div");
button.className = "button";
button.textContent = "Click me!";

// Añadir el elemento al body
document.body.appendChild(button);

// Crear el elemento div con el texto "Toggle me!"
let switch = document.createElement("div");
switch.className = "switch";
switch.textContent = "Toggle me!";

// Añadir el elemento al body
document.body.appendChild(switch);

// Crear el observable
let observable = new Observable();

// Crear los observadores
let toast = new toastify();
let log = new logger();

// Suscribir los observadores al observable
observable.subscribe(toast);
observable.subscribe(log);

// Añadir el evento click al botón
button.addEventListener("click", () => {
  // Notificar a los observadores con el mensaje "User clicked button!"
  observable.notify("User clicked button!");
});

// Añadir el evento click al interruptor
switch.addEventListener("click", () => {
  // Notificar a los observadores con el mensaje "User toggled switch!"
  observable.notify("User toggled switch!");
});
```

#### 1.1.4-  Eliminar observable
Para eliminar un observable, puedes usar el método unsubscribe del observable y pasarle el observador que quieres eliminar. Por ejemplo, si quieres eliminar el observador toast del observable que hemos creado en el ejemplo, puedes hacer lo siguiente:

```javascript file:"Eliminar observable"
// Eliminar el observador toast del observable
observable.unsubscribe(toast);
```

De esta forma, el observador toast dejará de recibir las notificaciones del observable. Es importante eliminar los observadores que ya no se necesitan para evitar fugas de memoria y mejorar el rendimiento.
## 2-  Aplicaciones del patrón observador

El patrón observador se puede aplicar en muchos casos donde se requiere comunicar cambios de estado entre objetos. Algunos ejemplos son:

-   Interfaces gráficas de usuario (GUI): el patrón observador permite actualizar los elementos de la interfaz cuando cambia algún dato del modelo o cuando ocurre algún evento de usuario.
-   Sistemas de eventos: el patrón observador permite crear sistemas basados en eventos, donde los objetos se suscriben a eventos específicos y reaccionan cuando estos ocurren.
-   Sistemas distribuidos: el patrón observador permite sincronizar el estado de varios objetos que se encuentran en diferentes nodos de una red.

<hr class="finale">

![[bat-logo-black.png|150]]


