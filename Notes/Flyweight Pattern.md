---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Flyweight Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es el patrón Flyweight?

Es un patrón de diseño estructural que permite ahorrar memoria al compartir el estado intrínseco de los objetos.

#### ¿Qué es el estado intrínseco y el estado extrínseco de un objeto?

El estado intrínseco es la parte de la información del objeto que es igual o parecida para todos los objetos del mismo tipo. El estado extrínseco es la parte de la información del objeto que es diferente para cada objeto y depende del contexto.

#### ¿Cómo se aplica el patrón Flyweight?

Se aplica creando una clase que represente el estado intrínseco de los objetos (flyweight) y otra clase que represente el estado extrínseco de los objetos (concreto). Los objetos concretos tienen una referencia al objeto flyweight y le pasan el estado extrínseco a los métodos que lo necesitan.
```

```ad-why
title: ## What's the point
collapse:
Se puede aplicar este tema cuando se cumplen las siguientes condiciones:

- Hay una gran cantidad de objetos que consumen mucha memoria.
- Los objetos tienen una parte de su estado que es igual o parecida para todos ellos.
- Los objetos pueden ser divididos en estado intrínseco (compartido) y estado extrínseco (diferente).
- El estado extrínseco se puede pasar como parámetro a los métodos que lo necesitan.
- La reducción de objetos compensa el costo de transferir el estado extrínseco.

Algunos ejemplos o casos de su aplicación son:

- Un sistema de partículas para un videojuego, donde hay muchos objetos que representan balas, misiles, metralla, etc. que tienen el mismo color y sprite pero diferente posición, dirección y velocidad.
- Un editor de texto, donde hay muchos objetos que representan caracteres que tienen el mismo estilo y fuente pero diferente posición y contenido.
- Un mapa de bits, donde hay muchos objetos que representan píxeles que tienen el mismo color pero diferente coordenada.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón Flyweight sirve para ahorrar memoria cuando tenemos muchos objetos que tienen información igual o parecida.

El patrón Flyweight nos dice que <mark class="hltr-truecyan">separemos la información de los objetos</mark> en dos partes: <mark class="hltr-truecyan">la que es igual o parecida</mark> para todos los objetos, y <mark class="hltr-truecyan">la que es diferente</mark> para cada objeto.

La información que es igual o parecida la llamamos <mark class="hltr-truecyan">estado **intrínseco**, y la guardamos en un solo objeto que se llama flyweight</mark>. La información que es diferente la llamamos estado <mark class="hltr-truecyan">**extrínseco**, y la guardamos en otros objetos que se llaman concretos</mark>. 

<mark class="hltr-truecyan">Los objetos concretos tienen una referencia al objeto flyweigh</mark>t para usar su información.

Las ventajas son que <mark class="hltr-truecyan">reduce la cantidad de objetos y el uso de memoria, evita la duplicación de información y permite crear estructuras jerárquicas o compuestas de objetos</mark> flyweight. Las desventajas son que <mark class="hltr-red">complica el diseño y la implementación del código, aumenta la complejidad lógica y el acoplamiento entre los objetos y puede afectar al rendimiento</mark> si se pasa mucho estado extrínseco.
````

## 1-  Crear flyweight pattern
Para explicarlo, usaremos el caso de una libreria, no queremos tener registrados un mismo libro en el sistema dos veces, pero si queremos tener varias copias de un mismo libro
#### 1.1.1-  Diferenciar estado intrinseco y extrinseco
Al tener varias copias de un mismo libro, estas copias comparten el titulo, autor y el isbn, por lo que este es el estado intrínseco. 

Sin embargo, cada copia tiene un información diferente, como su disponibilidad, o cuantas veces se a rentado esa copia en particular, este es el estado extrinseco

#### 1.1.2-  Crear una clase para ambos estados

-   Crear una clase que represente el estado intrínseco de los objetos. En este caso, se llama Book y tiene los atributos title, author e isbn.
```javascript file:"Class de estado intrínseco o Flyweight"
// Clase que representa el estado intrínseco de un libro
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
```
-   Crear una clase que represente el estado extrínseco de los objetos. En este caso, se llama BookCopy y tiene los atributos quantity y book. El atributo book es una referencia al objeto Book que representa el estado intrínseco.
```javascript file:"Class de estado extrinseco con referencia al intrinseco" hl:5 
// Clase que representa el estado extrínseco de una copia de libro
class BookCopy {
  constructor(quantity, book) {
    this.quantity = quantity;
    this.book = book; // referencia al objeto Book que representa el estado intrínseco
  }
}
```

#### 1.1.3-  Crear una funcion que cree objetos intrinsecos

En este ejemplo, seria crear una función que nos ayude a crear objetos Book según el isbn.*

*En este caso, se llama createBook y recibe el isbn como parámetro. La función busca si ya existe un objeto Book con ese isbn en un conjunto llamado isbnNumbers. Si existe, devuelve ese objeto. Si no existe, crea un nuevo objeto Book con el título, el autor y el isbn correspondientes, lo añade al conjunto isbnNumbers y lo devuelve.*

<mark class="hltr-truecyan">El proposito es evitar la duplicación de objetos intrinsecos</mark>, esto lo comprobando que no exista previamente un objeto con los mismo valores, si no lo hay, crea el nuevo objeto, si ya existe, no lo crea, solo devuelve el objeto creado previamente
```javascript file:"Creando objetos intrinsecos"
// Función que crea objetos Book según el isbn
function createBook(isbn) {
  // Conjunto que almacena los isbns de los libros creados
  let isbnNumbers = new Set();

  // Si el conjunto contiene el isbn, devuelve el objeto Book existente
  if (isbnNumbers.has(isbn)) {
    return isbnNumbers.get(isbn);
  }

  let book = new Book(title, author, isbn);

  // Añade el objeto Book al conjunto y lo devuelve
  isbnNumbers.add(isbn, book);
  return book;
}
```

#### 1.1.4-  Crear función que cree objetos extrinsecos
<mark class="hltr-truecyan">La función extrinseca debe ser dependiente de la función intrinseca. </mark>

*Crear una función que nos ayude a crear objetos Book según el isbn. En este caso, se llama createBook y recibe el isbn como parámetro. <mark class="hltr-truecyan">La función busca si ya existe un objeto</mark> Book con ese isbn en un conjunto llamado isbnNumbers. Si existe, devuelve ese objeto. <mark class="hltr-truecyan">Si no existe, crea un nuevo objeto</mark> Book con el título, el autor y el isbn correspondientes, <mark class="hltr-truecyan">lo añade al conjunto</mark> isbnNumbers<mark class="hltr-truecyan"> y lo devuelve</mark>.*

```javascript file:"Creando objetos extrinsecos" hl:10 
// Función que crea objetos BookCopy según el isbn y la cantidad
function addBook(isbn, quantity) {
  // Lista que almacena todas las copias de libros
  let bookList = [];

  // Invoca a la función createBook para obtener el objeto Book correspondiente al isbn
  let book = createBook(isbn);

  // Crea un nuevo objeto BookCopy con la cantidad y el objeto Book
  let bookCopy = new BookCopy(quantity, book);

  // Añade el objeto BookCopy a la lista y lo devuelve
  bookList.push(bookCopy);
  return bookCopy;
}
```
#### 1.1.5-  Uso
Usar las funcion extrinseca para crear cuantos objetos querramos. Siempre que un objeto tenga los mismo valores, el objeto no se creará, en su lugar, nos trae la información del objeto creado anteriormente

```javascript file:"Creando nuevos objetos"
// Crea 5 copias de cada libro: Harry Potter, To Kill a Mockingbird y The Great Gatsby
addBook("9780439708180", 5); // Harry Potter
addBook("9780061120084", 5); // To Kill a Mockingbird
addBook("9780743273565", 5); // The Great Gatsby
```
<hr class="finale">

![[bat-logo-black.png|150]]



