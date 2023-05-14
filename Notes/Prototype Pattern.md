---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Prototype Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es un prototipo en JavaScript?

Es un objeto que actúa como una plantilla para otros objetos que lo heredan. Cada objeto tiene una propiedad `[[Prototype]]` que mantiene un enlace a otro objeto llamado su prototipo.

#### ¿Cómo se usa el prototipo en JavaScript?

Se puede usar el prototipo para definir propiedades y métodos que sean comunes a todos los objetos de un mismo tipo. Por ejemplo, se puede usar una función constructora para crear objetos con ciertas propiedades iniciales, y luego añadir propiedades o métodos al prototipo de esa función para que todos los objetos creados con esa función los hereden.

#### ¿Qué es la cadena de prototipos en JavaScript?

Es el mecanismo que permite a los objetos acceder a las propiedades y métodos que no están definidos directamente en el objeto, sino en su prototipo o en el prototipo de su prototipo. Cuando intentamos acceder a una propiedad o método de un objeto, JavaScript busca primero en el propio objeto. Si no lo encuentra, busca en el prototipo del objeto. Si tampoco lo encuentra, busca en el prototipo del prototipo, y así sucesivamente hasta que lo encuentra o hasta que llega al final de la cadena (un objeto cuyo prototipo es `null`).

#### ¿Cómo se crea un objeto con Object.create()?

El método `Object.create()` recibe un objeto como parámetro y devuelve un nuevo objeto que tiene ese objeto como prototipo. También puede recibir un segundo parámetro opcional que es un objeto con descriptores de propiedades para agregar al nuevo objeto.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón de prototipos es una forma útil de compartir propiedades entre muchos objetos del mismo tipo. El prototipo es un objeto que es nativo de JavaScript, y al que pueden acceder los objetos a través de la cadena de prototipos.

Esto tiene la ventaja de <mark class="hltr-truecyan">evitar la duplicación de código y la necesidad de usar clases, así como de permitir la modificación o adición de propiedades y métodos en tiempo de ejecución. También facilita la creación de objetos con diferentes combinaciones de estado sin tener que definir muchas subclases o constructores. </mark>

Sin embargo, este patrón también tiene algunas desventajas, como <mark class="hltr-red">la confusión y dificultad que puede generar la cadena de prototipos, los problemas de seguridad o privacidad que pueden surgir al compartir propiedades entre objetos que pueden ser alteradas por cualquiera de ellos, y las dificultades para implementar el método de clonación, que debe asegurar una copia exacta y profunda del objeto original.</mark>

````
## 1-  ¿Qué es un prototipo?

Un prototipo es un objeto que actúa como una plantilla para otros objetos que lo heredan. Cada objeto tiene una propiedad privada llamada `[[Prototype]]` que mantiene un enlace a otro objeto llamado su prototipo. Ese objeto prototipo puede tener a su vez otro objeto prototipo, y así sucesivamente hasta que se alcanza un objeto cuyo prototipo es `null`. Por definición, `null` no tiene prototipo, y actúa como el final de la [[#3- Cadena de prototipos]].

```js file:"👾cadena de prototipos" hl:error:
//Console.log a una class
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

//Console.log a una instancia de la class Dog, tiene el mismo prototype
console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```
## 2-  ¿Cómo se usa el prototipo?
En JavaScript, <mark class="hltr-truecyan">se puede usar el prototipo para definir propiedades y métodos que sean comunes a todos los objetos de un mismo tipo</mark>. Por ejemplo, se puede usar una función constructora para crear objetos con ciertas propiedades iniciales, y luego añadir propiedades o métodos al prototipo de esa función para que todos los objetos creados con esa función los hereden.

```js file:"👾Asignando nuevo métodos con prototype" hl:18,21-23 error:
// Definimos una clase Dog que tiene un constructor y un método bark
class Dog {
  constructor(name) {
    this.name = name; 
  }

  bark() {
    return `Woof!`; 
  }
}

// Creamos tres instancias de la clase Dog con diferentes nombres
const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

// Añadimos un método play al prototipo de la clase Dog para que todos los objetos Dog lo hereden
Dog.prototype.play = () => console.log("Playing now!");

// Llamamos al método play desde la instancia dog1, lo que imprime en la consola "Playing now!"
dog1.play();
dog2.play();
dog3.play();
```

En el ejemplo se creó una class Dog y se hicieron 3 instancias del él. Después se agregó un método play al prototipo de la class Dog, de forma que todos los objetos creados antes o después de hacer esta asignación igualmente lo heredarán

## 3-  Cadena de prototipos
La cadena de prototipos es el mecanismo que permite a los objetos acceder a las propiedades y métodos que no están definidos directamente en el objeto, sino en su prototipo o en el prototipo de su prototipo. Cuando intentamos acceder a una propiedad o método de un objeto, JavaScript busca primero en el propio objeto. Si no lo encuentra, busca en el prototipo del objeto. Si tampoco lo encuentra, busca en el prototipo del prototipo, y así sucesivamente hasta que lo encuentra o hasta que llega al final de la cadena (un objeto cuyo prototipo es `null`). Si no encuentra la propiedad o método en toda la cadena, devuelve `undefined`.
![[Pasted image 20230514004834.png| Cadena de prototipos| 450]]

```javascript file:"Cadena de prototipos" hl:13,26
// Definimos una clase Dog que tiene un constructor y un método bark
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log("Woof!"); 
  }
}

// Definimos una clase SuperDog que hereda de Dog y añade un método fly
class SuperDog extends Dog {
  constructor(name) {
    super(name); // Llamamos al constructor de Dog con el parámetro name
  }

  fly() {
    console.log(`Flying!`); // Imprimimos en la consola el hecho de que el perro vuela
  }
}

// Creamos un objeto de tipo SuperDog con el nombre Daisy
const dog1 = new SuperDog("Daisy");
// Llamamos al método bark heredado de Dog
dog1.bark(); // Woof!
// Llamamos al método fly propio de SuperDog
dog1.fly(); // Flying!
```
Tenemos acceso al método *bark* al extender la class Dog, ya que el valor de _proto_ en el prototype de **SuperDog** apunta a **Dog.prototype**. <mark class="hltr-truecyan">Cuando tratamos de acceder a una propiedad que no esta disponible en el objeto, javascript retrocede todos los objetos hasta encontrarlo,</mark> en este caso, retrocede a Dog donde encuentra el método bark

## 4-  Object.create
<mark class="hltr-truecyan">El método `Object.create()` se usa para crear un nuevo objeto y vincularlo al prototipo de un objeto existente. Esto permite heredar propiedades y métodos de otro objeto sin usar una función constructora o una clase.</mark>

## 5-  Creando objetos con Object.create()
El método `Object.create()` recibe un objeto como parámetro y devuelve un nuevo objeto que tiene ese objeto como prototipo. Por ejemplo:
```js file:"👾 Object.create()" hl:10,13-14 error:
// Creamos un objeto llamado dog con dos propiedades
var dog = {
  name: "Fido",
  bark: function() {
    console.log("Woof!");
  }
};

// Creamos un nuevo objeto llamado pet1 usando Object.create() y pasando el objeto dog como prototipo
var pet1 = Object.create(dog);

// El nuevo objeto pet1 tiene acceso a las propiedades y métodos del objeto dog a través de la cadena de prototipos
console.log(pet1.name); // Fido
pet1.bark(); // Woof!
```
El método `Object.create()` también puede recibir un segundo parámetro opcional que es un objeto con descriptores de propiedades para agregar al nuevo objeto. Estos descriptores pueden especificar el valor, la escritura, la enumeración y la configuración de las propiedades. 
```
Object.create(objectToDuplicate, {newPropertiesKey: value})
```
Por ejemplo:
```js file:"👾title" hl:error:
// Creamos un nuevo objeto llamado pet2 usando Object.create() y pasando el objeto dog como prototipo
// También pasamos un segundo parámetro con dos descriptores de propiedades: age y color
var pet2 = Object.create(dog, {
  age: { 
	  value: 2, 
	  writable: true, 
	  enumerable: true, 
	  configurable: true 
	  },
  color: { 
	  value: "black", 
	  writable: true, 
	  enumerable: true, 
	  configurable: true 
	  }
});

// El nuevo objeto pet2 tiene las propiedades y métodos del objeto dog más las propiedades age y color
console.log(pet2.name); // Fido
pet2.bark(); // Woof!
console.log(pet2.age); // 2
console.log(pet2.color); // black
```


<hr>



