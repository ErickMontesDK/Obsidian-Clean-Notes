---
banner: "![[default-banner.png]]"
banner_x: 0.7
banner_y: 0.7
---

# Proxy Pattern 

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Un objeto Proxy <mark class="hltr-truecyan">es un intermediario para otro objeto, que puede interceptar y redefinir operaciones fundamentales para ese objeto, como acceder o modificar propiedades, invocar funciones, enumerar claves, etc.</mark>

Los objetos Proxy son una forma poderosa de añadir control sobre el comportamiento de un objeto. Un proxy <mark class="hltr-truecyan">puede tener varios casos de uso: puede ayudar con la validación, el formato, las notificaciones o la depuración</mark>.
![[Pasted image 20230513225426.png]]
![[Pasted image 20230513225444.png]]
No se recomienda usar proxies para código crítico para el rendimiento, ya que<mark class="hltr-red"> pueden afectar negativamente a la velocidad de la aplicación</mark>. Es mejor usar proxies solo cuando sea necesario y con moderación.
````
## 1-  Crear un Proxy

Para crear un Proxy, necesitamos dos parámetros:

-   `target`: el objeto original que queremos envolver.
-   `handler`: un objeto que define qué operaciones serán interceptadas y cómo redefinir esas operaciones.

Por ejemplo, este código crea un proxy para el objeto `person`, que representa a John Doe.
```js file:"👾Proxy Pattern" hl:6 error:
const person = {
  name: "John Doe",
  age: 42,
};

const personProxy = new Proxy(person, {});
```
El segundo parámetro es un objeto vacío, lo que significa que no hay ninguna operación interceptada. Por lo tanto, el proxy se comporta igual que el objeto original.
### 1.1-  Definir comportamiento

Para personalizar el comportamiento del proxy, <mark class="hltr-truecyan">podemos definir funciones en el objeto `handler`. Estas funciones se llaman trampas (traps), porque atrapan las llamadas al objeto original.</mark>

<mark class="hltr-truecyan">Las trampas más comunes son `get` y `set`, que se ejecutan cuando se accede o se modifica una propiedad del objeto original.</mark>

Por ejemplo, podemos definir una trampa `get` que devuelva una frase más legible cuando se acceda a una propiedad del proxy.

```js file:"👾Using a get for get a value" hl:12-13,7-9 error:
const person = {
  name: "John Doe",
  age: 42,
};

const personProxy = new Proxy(person, {
  get(target, prop) {
    return `El valor de ${prop} es ${target[prop]}`;
  },
});

console.log(personProxy.name); // El valor de name es John Doe
console.log(personProxy.age); // El valor de age es 42
```

También podemos definir una trampa `set` que registre el valor anterior y el nuevo valor de una propiedad cuando se modifique el proxy.

```js file:"👾Using a set to set a value" hl:7-10,13 error:
const person = {
  name: "John Doe",
  age: 42,
};

const personProxy = new Proxy(person, {
  set(target, prop, value) {
    console.log(`Se cambió ${prop} de ${target[prop]} a ${value}`);
    target[prop] = value;
  },
});

personProxy.age = 43; // Se cambió age de 42 a 43
```

### 1.2-  Añadir validación

<mark class="hltr-truecyan">Una ventaja de usar un proxy es que podemos añadir validación al objeto original. </mark>Por ejemplo, podemos evitar que se cambie la edad de la persona a un valor no numérico o que se le dé un nombre vacío. O si se intenta acceder a una propiedad que no existe en el objeto original, podemos informar al usuario.

```js file:"👾adding  validation" hl:15,8,18 error:25-27
const person = {
  name: "John Doe",
  age: 42,
};

const personProxy = new Proxy(person, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`La propiedad ${prop} no existe`);
    }
  },
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new Error("La edad debe ser un número");
    }
    if (prop === "name" && value === "") {
      throw new Error("El nombre no puede estar vacío");
    }
    target[prop] = value;
  },
});

personProxy.age = "cuarenta y tres"; // Error: La edad debe ser un número
personProxy.name = ""; // Error: El nombre no puede estar vacío
console.log(personProxy.gender); // Error: La propiedad gender no existe
```

### 1.3-  Usar el objeto Reflect

JavaScript proporciona un objeto incorporado llamado <mark class="hltr-truecyan">Reflect, que facilita la manipulación del objeto original cuando trabajamos con proxies.
</mark>
El objeto Reflect tiene algunos métodos con los mismos nombres que las trampas del proxy. Estos métodos proporcionan la semántica reflexiva para invocar los métodos internos del objeto correspondiente.
Por ejemplo, <mark class="hltr-truecyan">podemos usar `Reflect.get `y`Reflect.set` para acceder o modificar las propiedades del objeto original dentro de las trampas del proxy.</mark> Estos métodos reciben los mismos argumentos que los métodos del objeto`handler`.

```javascript file:"reflect setter and getter" hl:8,11-12
const person = {
  name: "John Doe",
  age: 42,
};

const personProxy = new Proxy(person, {
  get(target, prop) {
    return `El valor de ${prop} es ${Reflect.get(...arguments)}`;
  },
  set(target, prop, value) {
    console.log(`Se cambió ${prop} de ${Reflect.get(...arguments)} a ${value}`);
    Reflect.set(...arguments);
  },
});

console.log(personProxy.name); // El valor de name es John Doe
personProxy.age = 43; // Se cambió age de 42 a 43
```

```ad-warning
title: Die Flashcards
#### ¿Qué es un objeto Proxy en JavaScript?

Un objeto Proxy es un intermediario para otro objeto, que puede interceptar y redefinir operaciones fundamentales para ese objeto.

#### ¿Cómo se crea un objeto Proxy en JavaScript?

Se crea un objeto Proxy con dos parámetros: `target`, el objeto original que se quiere envolver, y `handler`, un objeto que define qué operaciones serán interceptadas y cómo redefinir esas operaciones.

#### ¿Qué son las trampas (traps) en un objeto Proxy?

Las trampas son funciones que se definen en el objeto `handler` y que se ejecutan cuando se realiza una determinada operación sobre el objeto original, como acceder o modificar una propiedad, invocar una función, enumerar las claves, etc.

#### ¿Qué es el objeto Reflect en JavaScript?

El objeto Reflect es un objeto incorporado que facilita la manipulación del objeto original cuando se trabaja con proxies. Tiene algunos métodos con los mismos nombres que las trampas del proxy y que proporcionan la semántica reflexiva para invocar los métodos internos del objeto correspondiente.

```

<hr>



