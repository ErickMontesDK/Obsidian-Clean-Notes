---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Factory Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es el patrón de fábrica?

Es un patrón de diseño que permite crear objetos sin especificar su clase exacta, usando una función o método fábrica.

#### ¿Qué ventajas tiene el patrón de fábrica sobre la palabra reservada new?

Permite separar la lógica de creación de objetos de la lógica de uso, facilita el intercambio y la extensión de los tipos de objetos, y permite aplicar los principios SOLID.

#### ¿Qué desventajas tiene el patrón de fábrica?

Puede introducir una complejidad innecesaria si los objetos son simples o limitados, puede requerir una jerarquía de clases o interfaces más amplia y compleja, puede dificultar la depuración del código si se ocultan los detalles de creación de los objetos, y puede afectar al rendimiento del código si se crean muchos objetos innecesarios o duplicados.

#### ¿Qué variantes del patrón de fábrica existen?

Hay tres variantes principales: el patrón de fábrica simple, el patrón de método de fábrica y el patrón de fábrica abstracta. También se pueden usar otros enfoques como la fábrica con clase abstracta, la fábrica con interfaz y la fábrica funcional.
```

```ad-why
title: ## What's the point
collapse:
Cuándo se puede aplicar el patrón de fábrica:

-   [Cuando no se conoce de antemano el tipo exacto de los objetos que se van a crear](https://refactoring.guru/es/design-patterns/factory-method)[1](https://refactoring.guru/es/design-patterns/factory-method).
-   [Cuando se quiere delegar la responsabilidad de crear objetos a una clase o función específica](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/patron-factory/)[2](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/patron-factory/).
-   [Cuando se quiere facilitar la extensión y el intercambio de los tipos de objetos](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/patron-factory/)[2](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/patron-factory/).
-   [Cuando se quiere separar la lógica de creación de objetos de la lógica de uso](https://spiegato.com/es/que-es-el-patron-de-fabrica)[3](https://spiegato.com/es/que-es-el-patron-de-fabrica).

Algunos ejemplos o casos de aplicación del patrón de fábrica son:

-   [Una aplicación de gestión logística que puede manejar diferentes tipos de transporte (camión, barco, avión, etc.)](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/patron-factory/)[2](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/patron-factory/).
-   [Un framework de desarrollo web que puede crear diferentes tipos de componentes (botones, casillas, menús, etc.) según el estilo o la plataforma](https://refactoring.guru/es/design-patterns/factory-method)[1](https://refactoring.guru/es/design-patterns/factory-method).
-   [Una aplicación de edición gráfica que puede crear diferentes tipos de formas (círculos, rectángulos, triángulos, etc.) según el modo o la herramienta seleccionada](https://refactoring.guru/es/design-patterns/factory-method)[1](https://refactoring.guru/es/design-patterns/factory-method).
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón de fábrica nos permite usar funciones fábrica para crear nuevos objetos. Una función es una función fábrica cuando devuelve un nuevo objeto sin usar la palabra clave new.

Puede ser útil <mark class="hltr-truecyan">si estamos creando objetos relativamente complejos y configurables</mark>. Podría ocurrir que los valores de las <mark class="hltr-truecyan">claves y los valores dependan de un cierto entorno o configuración</mark>. Con el patrón de fábrica, podemos crear fácilmente nuevos objetos que contengan las claves y valores personalizados.

Es útil cuando tenemos que crear varios objetos más pequeños que comparten las mismas propiedades. Una función fábrica puede devolver fácilmente un <mark class="hltr-truecyan">objeto personalizado dependiendo del entorno actual o de la configuración específica del usuario.</mark>
![[Pasted image 20230515214008.png]]
Este patrón permite separar la lógica de creación de objetos de la lógica de uso, haciendo el <mark class="hltr-truecyan">código más modular y mantenible</mark>. Crear objetos sin especificar su clase exacta, lo que facilita el intercambio y la extensión de los tipos de objetos, <mark class="hltr-truecyan">aplicar el principio de responsabilidad única</mark>, delegando la responsabilidad de crear objetos a una clase o función específica y <mark class="hltr-truecyan">aplicar el principio de abierto/cerrado</mark>, ya que se pueden añadir nuevos tipos de objetos sin modificar el código existente.


Sin embargo, puede <mark class="hltr-red">introducir una complejidad innecesaria</mark> si el tipo y el número de objetos a crear son limitados o simples, puede <mark class="hltr-red">requerir una jerarquía de clases o interfaces más amplia y compleja</mark> para implementar las variantes del patrón. <mark class="hltr-red">Dificulta la depuración</mark> del código si se ocultan los detalles de creación de los objetos al cliente y puede <mark class="hltr-red">afectar al rendimiento del código si se crean muchos objetos innecesarios o duplicados</mark>.

````

## 1-  Funcionamiento
#### 1.1.1-  Definir interfaz de objeto
Define una interfaz para los objetos que quieres crear. 
En este caso, sería una interfaz para los usuarios con las propiedades firstName, lastName y email. También puedes añadir un método para obtener el nombre completo del usuario. Por ejemplo:
```javascript file:"Interfaz de objeto"
// Interfaz para los objetos User
interface User {
  firstName: string;
  lastName: string;
  email: string;
  getFullName(): string;
}
```
#### 1.1.2-  Definir función o class fabrica
Define una función fábrica **(o class)** que reciba los parámetros necesarios para crear un objeto User y que devuelva un nuevo objeto que implemente la interfaz User. 
En este caso, la función fábrica recibiría el firstName, el lastName y el email del usuario y devolvería un objeto con esas propiedades y el método getFullName. Por ejemplo:
```javascript file:"Función fabrica"
// Función fábrica para crear objetos User
function createUser(firstName: string, lastName: string, email: string): User {
  return {
    firstName,
    lastName,
    email,
    getFullName() {
      return this.firstName + " " + this.lastName;
    },
  };
}

//Misma fabrica pero como class
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
 
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

#### 1.1.3-  Crear objetos
Usa la función fábrica para crear tantos objetos User como necesites, pasando los parámetros correspondientes. En este caso, podrías crear dos objetos User con diferentes datos. Por ejemplo:
```javascript file:"Creando objetos" hl:2,3
// Crear dos objetos User usando la función fábrica
let user1 = createUser("Alice", "Smith", "alice@example.com");
let user2 = createUser("Bob", "Jones", "bob@example.com");


console.log(user1.getFullName() + ", " + user1.email); // Alice Smith, alice@example.com
console.log(user2.getFullName() + ", " + user2.email); // Bob Jones, bob@example.com
```


## 2-  Variantes del patrón fábrica
En JavaScript, existen diferentes formas de implementar el patrón de fábrica, según el tipo de objeto que queramos crear y el nivel de abstracción que necesitemos. Algunas variantes son:
### 2.1-  Fabrica clasica
Consiste en una clase o función que tiene un método fábrica que devuelve diferentes tipos de objetos según un parámetro. Por ejemplo:
```javascript file:"Fábrica clásica" hl:12,24,36,38-50
// Clase abstracta que define la interfaz para los productos
class Product {
  constructor(name) {
    this.name = name;
  }

  // Método abstracto que debe ser implementado por las subclases
  doSomething() {
    throw new Error("Not implemented");
  }
}

// Clase concreta que extiende la clase abstracta Product
class ProductA extends Product {
  constructor() {
    super("Product A");
  }

  // Método concreto que implementa el método abstracto
  doSomething() {
    console.log(this.name + " is doing something");
  }
}

// Clase concreta que extiende la clase abstracta Product
class ProductB extends Product {
  constructor() {
    super("Product B");
  }

  // Método concreto que implementa el método abstracto
  doSomething() {
    console.log(this.name + " is doing something else");
  }
}

// Clase que implementa el patrón de fábrica clásica
class Factory {
  // Método fábrica que devuelve un objeto de tipo Product según el parámetro type
  static createProduct(type) {
    switch (type) {
      case "A":
        return new ProductA();
      case "B":
        return new ProductB();
      default:
        return null;
    }
  }
}

// Crear dos objetos usando el método fábrica
let productA = Factory.createProduct("A");
let productB = Factory.createProduct("B");

// Llamar al método doSomething de cada objeto
productA.doSomething(); // Product A is doing something
productB.doSomething(); // Product B is doing something else
```

#### 2.1.1-  Fábrica con clase abstracta
TypeScript nos permite usar un enfoque maravilloso con una clase abstracta. Consiste en definir una clase abstracta que tiene un método fábrica abstracto que debe ser implementado por las subclases concretas. 

Una fábrica abstracta es una interfaz para crear objetos relacionados sin especificar ni exponer sus clases. También podemos decir que proporciona un objeto de otra fábrica que es responsable de crear los objetos necesarios.

Por ejemplo:
```typescript file:"Fabrica abstracta" hl:11,28,45
// Clase abstracta que define la interfaz para los productos y el método fábrica
abstract class Product {
  constructor(public name: string) {}

  // Método abstracto que debe ser implementado por las subclases
  abstract doSomething(): void;

  // Método fábrica abstracto que debe ser implementado por las subclases
  static createProduct(): Product;
}

// Clase concreta que extiende la clase abstracta Product
class ProductA extends Product {
  constructor() {
    super("Product A");
  }

  // Método concreto que implementa el método abstracto
  doSomething(): void {
    console.log(this.name + " is doing something");
  }

  // Método fábrica concreto que implementa el método fábrica abstracto
  static createProduct(): Product {
    return new ProductA();
  }
}

// Clase concreta que extiende la clase abstracta Product
class ProductB extends Product {
  constructor() {
    super("Product B");
  }

  // Método concreto que implementa el método abstracto
  doSomething(): void {
    console.log(this.name + " is doing something else");
  }

  // Método fábrica concreto que implementa el método fábrica abstracto
  static createProduct(): Product {
    return new ProductB();
  }
}

// Crear dos objetos usando el método fábrica de cada subclase
let productA = ProductA.createProduct();
let productB = ProductB.createProduct();

// Llamar al método doSomething de cada objeto
productA.doSomething(); // Product A is doing something
productB.doSomething(); // Product B is doing something else
```
#### 2.1.2-  Fábrica con interfaz
Otra vez vamos a usar una característica que está presente sólo en TypeScript. Consiste en definir una interfaz que tiene un método fábrica que debe ser implementado por las clases que la implementan. 

Esto permite interfaces para crear objetos, pero permite que las subclases determinen qué clase instanciar. Por ejemplo, una clase abstracta que tiene un método fábrica abstracto que debe ser implementado por las subclases concretas.

Por ejemplo:
```typescript file:"Fábrica con interfaz" hl:6,14,22,32,39,46,48-49
// Interfaz que define el método fábrica
interface ProductFactory {
  // Método fábrica que devuelve un objeto de tipo Product
  createProduct(): Product;
}

// Clase que implementa la interfaz ProductFactory
class ProductAFactory implements ProductFactory {
  // Método fábrica que devuelve un objeto de tipo ProductA
  createProduct(): Product {
    return new ProductA();
  }
}

// Clase que implementa la interfaz ProductFactory
class ProductBFactory implements ProductFactory {
  // Método fábrica que devuelve un objeto de tipo ProductB
  createProduct(): Product {
    return new ProductB();
  }
}

// Clase que define la interfaz para los productos
class Product {
  constructor(public name: string) {}

  // Método que hace algo con el producto
  doSomething(): void {
    console.log(this.name + " is doing something");
  }
}

// Clase que extiende la clase Product
class ProductA extends Product {
  constructor() {
    super("Product A");
  }
}

// Clase que extiende la clase Product
class ProductB extends Product {
  constructor() {
    super("Product B");
  }
}

// Crear dos objetos usando las clases fábrica
let productA = new ProductAFactory().createProduct();
let productB = new ProductBFactory().createProduct();

// Llamar al método doSomething de cada objeto
productA.doSomething(); // Product A is doing something
productB.doSomething(); // Product B is doing something
```

#### 2.1.3-  Fábrica funcional
Darle un enfoque hacia OOP. Consiste en usar funciones puras que devuelven objetos sin usar la palabra clave new. Por ejemplo:

```javascript file:"Fábrica funcional"
// Función pura que devuelve un objeto de tipo Car
const createCar = (type, color, engine) => ({
  type,
  color,
  engine,
});

// Función pura que devuelve un objeto de tipo Car con el método doSomething
const createCarWithMethod = (type, color, engine) => ({
  type,
  color,
  engine,
  doSomething() {
    console.log(this.type + " is doing something");
  },
});

// Crear dos objetos usando las funciones puras
let car1 = createCar("sedan", "red", "V6");
let car2 = createCarWithMethod("suv", "black", "V8");

// Mostrar el tipo y el color de cada objeto Car
console.log(car1.type); // sedan
console.log(car1.color); // red

// Llamar al método doSomething del segundo objeto Car
car2.doSomething(); // suv is doing something
```


<hr class="finale">

![[bat-logo-black.png|150]]



