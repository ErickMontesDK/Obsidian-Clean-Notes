---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Middleware Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es el patrón mediador?

Es un patrón que crea un objeto que coordina la comunicación entre un conjunto de objetos.

#### ¿Qué ventaja tiene el patrón mediador?

Evita que los objetos se acoplen demasiado y simplifica la interacción entre ellos.

#### ¿Qué ejemplo se da de patrón mediador?

Una sala de chat que actúa como mediador entre los usuarios.

#### ¿Qué es el patrón middleware?

Es un patrón que crea una serie de funciones que se encadenan entre la petición y la respuesta de una aplicación web.

#### ¿Qué ventaja tiene el patrón middleware?

Modulariza el código y permite realizar varias operaciones sobre la petición o la respuesta.

#### ¿Qué ejemplo se da de patrón middleware?

Una aplicación web con Express.js que usa funciones middleware para añadir una cabecera a la petición y comprobarla.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón mediador permite que los componentes interactúen entre sí a través de un punto central: el mediador. En lugar de comunicarse directamente entre ellos, el mediador recibe las peticiones y las envía hacia adelante. En JavaScript, el mediador suele ser un objeto literal o una función.
![[Pasted image 20230515001347.png|400]]
A menudo tenemos que lidiar con datos multidireccionales entre objetos. La comunicación entre los componentes puede resultar bastante confusa si hay un gran número de componentes.
En lugar de dejar que cada objeto hable directamente con los demás objetos, lo que resulta en una relación de muchos a muchos, las peticiones de los objetos son manejadas por el mediador. El mediador procesa esta petición y la envía a donde tiene que ir.

El patrón mediador y el patrón middleware <mark class="hltr-truecyan">nos permiten simplificar la comunicación entre los objetos y modularizar el código</mark>. Con el patrón mediador, <mark class="hltr-truecyan">evitamos que los objetos se acoplen demasiado y dependan directamente unos de otro</mark>s. Con el patrón middleware, <mark class="hltr-truecyan">podemos realizar varias operaciones sobre la petición y la respuesta de una aplicación web</mark>, sin tener que escribir todo el código en un solo lugar.

Las desventajas de usar el patrón mediador y el patrón middleware son que pueden introducir una <mark class="hltr-red">mayor complejidad y un menor rendimiento</mark>. Con el patrón mediador, podemos <mark class="hltr-red">crear un cuello de botella</mark> si el mediador tiene que manejar muchas peticiones y reenviarlas a muchos objetos. Con el patrón middleware, podemos <mark class="hltr-red">ralentizar la respuesta si tenemos que ejecutar muchas funciones middleware</mark> en secuencia. Además, ambos patrones pueden <mark class="hltr-red">dificultar la depuración y el seguimiento del flujo de datos</mark>.
````

## 1-  Ejemplo
Un buen caso de uso para el patrón mediador es una sala de chat. Los usuarios dentro de la sala de chat no se hablan directamente entre ellos. En su lugar, la sala de chat sirve como mediador entre los usuarios.
```js file:"👾ChatRoom" hl:error:
//class mediadora
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

//class para usuarios, llama a class 
class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }
  getName() {
    return this.name;
  }
  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();
const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");
```

## 2-  Patrón middleware

El patrón middleware hace posible que los componentes interactúen entre sí a través de una serie de funciones intermedias: los middleware. En lugar de comunicarse directamente entre ellos, los middleware reciben la petición y la respuesta, y pueden modificarlas o pasarlas a la siguiente función.

Puedes comparar este <mark class="hltr-truecyan">patrón con una cadena de montaje en una fábrica. En lugar de que cada trabajador haga todo el trabajo por sí mismo</mark>, lo que probablemente sería muy lento e ineficiente, <mark class="hltr-truecyan">cada trabajador hace una parte del trabajo</mark> y pasa el producto al siguiente trabajador. El último trabajador entrega el producto terminado al cliente.

Un buen caso de uso para el patrón middleware es una aplicación web con Express.js. Podemos añadir callbacks a ciertas rutas que el usuario puede acceder.
Supongamos que queremos añadir una cabecera a la petición si el usuario accede a la raíz ‘/’.
```javascript 
app.use('/', function (req, res, next) {
  req.headers['test-header'] = 'Hello world';
  next();
});
```
El método **next** llama al siguiente callback en el ciclo de petición-respuesta. Estaríamos creando una cadena de funciones middleware que se sitúan entre la petición y la respuesta, o viceversa.
Añadamos otra función middleware que compruebe si se ha añadido correctamente la cabecera test-header. El cambio añadido por la función middleware anterior será visible a lo largo de la cadena.
```javascript hl:5,9
app.use(
  "/",
  (req, res, next) => {
    req.headers["test-header"] = 1234;
    next();
  },
  (req, res, next) => {
    console.log(`Request has test header: ${!!req.headers["test-header"]}`);
    next();
  }
);
```
Cada vez que el usuario accede a un punto final de raíz ‘/’, se invocan las dos funciones middleware.
![[Pasted image 20230515003749.png]]
El patrón middleware nos facilita simplificar las relaciones de muchos a muchos entre objetos, al dejar que toda la comunicación fluya a través de un punto central.
<hr class="finale">

![[bat-logo-black.png|150]]



