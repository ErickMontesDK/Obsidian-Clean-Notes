---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Command Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es el patrón de comando?

Es un patrón de diseño que encapsula una acción como un objeto que tiene un método execute y un atributo value.

#### ¿Qué componentes intervienen en el patrón de comando?

Los componentes son el Command, el Receiver, el Invoker y el Client.

#### ¿Qué ventajas tiene el patrón de comando?

Permite desacoplar los objetos que solicitan una acción de los que la ejecutan, crear una secuencia de comandos mediante un sistema de cola, extender el sistema para añadir nuevos comandos y implementar un sistema de deshacer o rehacer las acciones.

#### ¿Qué desventajas tiene el patrón de comando?

Implica un alto número de clases y objetos que trabajan juntos, puede añadir una capa innecesaria de abstracción si las acciones son simples y puede generar problemas de consistencia o sincronización si los comandos modifican el estado del sistema.
```

```ad-why
title: ## What's the point
collapse:
El patrón de comando se puede aplicar cuando se quiere lograr lo siguiente:

-   [Separar los objetos que solicitan una acción de los que la ejecutan, lo que facilita la modificación o reutilización de los métodos](https://www.baeldung.com/java-command-pattern)[1](https://www.baeldung.com/java-command-pattern).
-   [Crear una secuencia de comandos mediante un sistema de cola, lo que puede ser útil para gestionar acciones que tienen una cierta duración o que deben ejecutarse en momentos específicos](https://www.baeldung.com/java-command-pattern)[1](https://www.baeldung.com/java-command-pattern)[2](https://refactoring.guru/design-patterns/command).
-   [Implementar un sistema de deshacer o rehacer las acciones mediante una pila o lista de comandos ejecutados](https://www.baeldung.com/java-command-pattern)[1](https://www.baeldung.com/java-command-pattern)[2](https://refactoring.guru/design-patterns/command).
-   [Ejecutar acciones de forma remota o independiente del objeto que las solicita](https://refactoring.guru/design-patterns/command)[2](https://refactoring.guru/design-patterns/command).

Algunos ejemplos o casos de aplicación del patrón de comando son:

-   [Una aplicación de texto que permite abrir, guardar, copiar, pegar y deshacer operaciones sobre un archivo](https://www.baeldung.com/java-command-pattern)[1](https://www.baeldung.com/java-command-pattern).
-   [Un control remoto que permite encender, apagar y cambiar el canal de un televisor](https://medium.com/swlh/command-pattern-what-it-is-and-how-to-use-it-7ccbc810266d)[3](https://medium.com/swlh/command-pattern-what-it-is-and-how-to-use-it-7ccbc810266d).
-   [Una aplicación de calculadora que permite realizar operaciones aritméticas y deshacerlas](https://refactoring.guru/design-patterns/command)[2](https://refactoring.guru/design-patterns/command).
-   [Un sistema de menús que permite invocar diferentes acciones según la opción seleccionada](https://refactoring.guru/design-patterns/command)[2](https://refactoring.guru/design-patterns/command).
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón de diseño Command convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud.

Esto permite parametrizar los métodos con diferentes solicitudes, retrasar o poner en cola la ejecución de una solicitud y soportar operaciones que no se pueden realizar.

El patrón de diseño Command se basa en el principio de separación de responsabilidades, lo que suele tener como resultado la división de la aplicación en capas: una capa para la interfaz gráfica de usuario (GUI) y otra capa para la lógica de negocio.

El patrón de comando es útil para encapsular acciones como objetos. <mark class="hltr-truecyan">El objetivo es ejecutar una acción especifica a un objeto, sin necesidad de que la lógica este dentro de ese mismo objeto.</mark>  Esto permite separar los objetos que solicitan una acción de los que la ejecutan.

Este patrón <mark class="hltr-truecyan">facilita la modificación o reutilización de los métodos</mark> y permite <mark class="hltr-truecyan">crear una secuencia de comando</mark>s mediante un sistema de cola, lo que puede ser útil para gestionar acciones que tienen una cierta duración o que deben ejecutarse en momentos específicos. Tambien <mark class="hltr-truecyan">permite extender el sistema para añadir nuevos comandos</mark> sin cambiar el código existente e implementar un sistema de <mark class="hltr-truecyan">deshacer o rehacer las acciones mediante una pila</mark> o lista de comandos ejecutados

Sin embargo, implica un <mark class="hltr-red">alto número de clases y objetos que trabajan juntos</mark> para lograr un objetivo, lo que puede aumentar la complejidad y el mantenimiento del código, puede añadir una <mark class="hltr-red">capa innecesaria de abstracció</mark>n si las acciones son simples o no requieren desacoplamiento y puede generar <mark class="hltr-red">problemas de consistencia o sincronización</mark> si los comandos modifican el estado del sistema y se ejecutan en paralelo o en diferentes momentos
````

## 1-  Funcionamiento
Para aplicar el patrón de comando, se deben seguir estos pasos generales:

#### 1.1.1-  Crear una clase Command 
-   Crear una clase Command que tenga un método execute. Este método se puede definir en el constructor o como un método de clase.
- La función de la clase Command es encapsular una acción como un objeto.
- Este método recibe los argumentos necesarios para realizar la acción y la ejecuta. 
- La clase Command es una clase abstracta que se usa como base para crear subclases o instancias de comandos específicos.
```javascript file:"Class Commando con método execute"
//execute representa un método junto con sus argumentos
class Command {
  constructor (execute) {
    this.execute = execute;
  }
}
```
#### 1.1.2-  Crear funciones que devuelvan instancias de Command
Crear <mark class="hltr-truecyan">funciones que devuelvan instancias de Command para cada acción específica</mark> que se quiera encapsular. Estas funciones deben recibir los argumentos necesarios para la acción y definir el método execute de acuerdo a la lógica de la acción.
Estas funciones devuelven un objeto de tipo Command que se puede pasar al método execute del receptor.

```javascript file:"Funcion que crea Commands" hl:2,9,16
function PlaceOrderCommand (order, id) {
  return new Command (orders => {
    orders.push (id);
    console.log (`You have successfully ordered ${order} (${id})`);
  });
}

function CancelOrderCommand (id) {
  return new Command (orders => {
    orders = orders.filter (order => order.id !== id);
    console.log (`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand (id) {
  return new Command (() =>
    console.log (`Your order ${id} will arrive in 20 minutes.`)
  );
}
```
#### 1.1.3-  Crear receptor de comandos
Crear una <mark class="hltr-truecyan">clase que actúe como receptor de los comandos</mark>. Esta clase debe tener un método execute que reciba un comando y los argumentos adicionales que se quieran pasar al comando. 
Este método<mark class="hltr-truecyan"> debe invocar el método execute del comando con los argumentos correspondientes.</mark>
```javascript file:"class Receptora" hl:5-6
class OrderManager {
  constructor () {
    this.orders = [];
  }
  execute (command, ...args) {
    return command.execute (this.orders, ...args);
  }
}
```
#### 1.1.4-  Crear instancias de los comandos
Crear instancias de los comandos específicos usando las funciones creadas y pasarlos al método execute del receptor.

El objetivo es ejecutar una acción especifica a un objeto, sin necesidad de que la lógica este dentro de ese mismo objeto. 
```javascript file:"Crear instancias de los comandos"
const manager = new OrderManager ();

manager.execute (new PlaceOrderCommand ("Pad Thai", "1234"));
manager.execute (new TrackOrderCommand ("1234"));
manager.execute (new CancelOrderCommand ("1234"));
```

<hr class="finale">

![[bat-logo-black.png|150]]



