---
banner: "![[react-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Higher Order Component 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es un componente de orden superior (HOC) en React?

Un HOC es una función que recibe un componente y devuelve un nuevo componente con una lógica adicional.

#### ¿Para qué sirven los HOCs en React?

Los HOCs sirven para reutilizar la lógica entre componentes, sin tener que repetir código ni modificar los componentes originales.

#### ¿Cómo se crea un HOC en React?

Se crea una función que recibe un componente y una url como parámetros. La función devuelve un nuevo componente que hace una petición a la url y renderiza el componente original con los datos como prop.

#### ¿Qué limitaciones y desventajas tienen los HOCs en React?

Los HOCs pueden causar colisión de nombres de props, dificultad de depurar o entender el flujo de datos, o complejidad de la jerarquía de componentes.

#### ¿Qué son los Hooks en React?

Los Hooks son funciones que permiten usar el estado y otros recursos de React dentro de los componentes funcionales.

#### ¿Para qué sirven los Hooks en React?

Los Hooks sirven para reutilizar la lógica entre componentes, sin tener que envolverlos ni modificar su estructura.

#### ¿Cómo se crea un Hook personalizado en React?

Se crea una función que recibe una url como parámetro. La función usa un estado y un efecto para obtener los datos de la url y los devuelve.

#### ¿Qué ventajas y desventajas tienen los Hooks en React?

Los Hooks tienen la ventaja de simplificar la sintaxis y el seguimiento del flujo de datos, pero también tienen la desventaja de requerir importar y usar el Hook en cada componente que lo necesite.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Un HOC es una función que recibe un componente y devuelve un nuevo componente con una lógica adicional
[Concretamente, un componente de orden superior es una función que recibe un componente y devuelve un nuevo componente](https://es.reactjs.org/docs/higher-order-components.html)[1](https://es.reactjs.org/docs/higher-order-components.html). [Un HOC es una función pura sin efectos secundarios](https://stackoverflow.com/questions/45935409/understanding-react-higher-order-components)

<mark class="hltr-truecyan">Los HOC se usan para extender o modificar el comportamiento de un componente sin alterarlo directamente.</mark> Por ejemplo, se puede usar un HOC para añadir funcionalidades como manejo de estado, manejo de eventos, suscripción a fuentes de datos, inyección de props, etc. [De esta manera, se puede separar la lógica transversal de la lógica específica de cada componente](https://es.reactjs.org/docs/higher-order-components.html)[1](https://es.reactjs.org/docs/higher-order-components.html). como el acceso a datos externos, la autorización, el estilo o el estado global.

Los componentes de orden superior <mark class="hltr-truecyan">nos permiten reutilizar la lógica entre componentes</mark> en React, lo cual <mark class="hltr-truecyan">mejora la modularidad, la mantenibilidad y la escalabilidad</mark> de nuestras aplicaciones. Aprovechan la naturaleza composicional de React y nos ofrecen flexibilidad y potencia para crear componentes con comportamientos personalizados.
Sin embargo, pueden <mark class="hltr-red">generar problemas de colisión de nombres de props, dificultad de depuración o comprensión del flujo de datos, o complejidad de la jerarquía de componentes.</mark>
````
## 1-  Crear un HOC
Para crear un HOC, debemos seguir estos pasos:
#### 1.1.1-  Definir una funcion HOC 
Definir una función que reciba un componente y los parámetros necesarios. La función debe devolver un nuevo componente que renderice el componente original con una lógica adicional.
```jsx file:"Definiendo HOC"
// Este es un HOC que recibe un componente y una url
function withLoader(component, url) {
  // El HOC devuelve un nuevo componente
  return (props) => {
    // Aquí va la lógica adicional
    // ...
    // El nuevo componente renderiza el componente original con los datos como prop
    return <component data={data} {...props} />;
  };
}
```

#### 1.1.2-  Definir un State
Dentro del nuevo componente, definir un estado para guardar los datos que se obtendrán de la fuente de datos externa.

Igual se agrega la lógica para modificar el state de acuerdo a lo que se requiere
```jsx file:"Definiendo el State" hl:3 
function withLoader(component, url) {
  // El nuevo componente tiene un estado para guardar los datos
  const [data, setData] = useState(null);

// El nuevo componente usa un efecto para obtener los datos de la url
useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
}, [url]);


  return (props) => {
    return <component data={data} {...props} />;
  };
}
```

#### 1.1.3-  Renderizar el componente original con los cambios
El nuevo componente debe renderizar el componente original pasándole las props originales y la prop con el state, que contiene los datos obtenidos de la fuente de datos externa. 
<mark class="hltr-truecyan">Para pasar las props originales, usa el operador de propagación (`...`). De esta manera, el HOC no altera las props originales del componente, sino que le añade una nueva prop.</mark>
```jsx file:"Renderizando el componente modificado" hl:15
function withLoader(component, url) {
  const [data, setData] = useState(null);

useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
}, [url]);


  return (props) => {
	// El nuevo componente renderiza el componente original con los datos como prop
	// Si los datos son nulos, muestra un texto de carga
	return data ? <component data={data} {...props} /> : <p>Loading...</p>;
  };
}
```

#### 1.1.4-  Usar el HOC 
Se necesita envolver cualquier componente que necesite la modificación, para lo cual, pasamos los componentes originales y los parametros necesarios como argumentos al HOC.

```jsx file:"Creando los nuevos componentes" hl:2-3
// Usamos el HOC para crear nuevos componentes con la lógica de carga
const CommentListWithLoader = withLoader(CommentList, "https://jsonplaceholder.typicode.com/comments");
const BlogPostWithLoader = withLoader(BlogPost, "https://jsonplaceholder.typicode.com/posts/1");


// Renderizamos los nuevos componentes en nuestra aplicación
function App() {
  return (
    <div>
      <CommentListWithLoader />
      <BlogPostWithLoader />
    </div>
  );
}
```

## 2-  Buenas prácticas
Algunas buenas prácticas que se deben usar al trabajar con HOC son las siguientes:

-   No mutar el componente original. [En su lugar, usar `React.cloneElement` o `Object.assign` para crear una copia del componente con las props modificadas](https://es.reactjs.org/docs/higher-order-components.html)[1](https://es.reactjs.org/docs/higher-order-components.html).
-   No usar el mismo nombre para el componente devuelto que para el componente original. [En su lugar, usar un prefijo o un sufijo para indicar que se trata de un componente mejorado](https://es.reactjs.org/docs/higher-order-components.html)[1](https://es.reactjs.org/docs/higher-order-components.html).
-   No usar HOC dentro del método `render` de un componente. Esto puede causar problemas de rendimiento y pérdida de estado. [En su lugar, aplicar los HOC fuera del cuerpo del componente, preferiblemente al inicio del archivo](https://es.reactjs.org/docs/higher-order-components.html)[1](https://es.reactjs.org/docs/higher-order-components.html).
-   No usar HOC para condicionar el renderizado de un componente. Esto puede causar inconsistencias en el árbol de componentes y dificultar la depuración. [En su lugar, usar el operador ternario o un componente auxiliar para renderizar condicionalmente un componente u otro](https://blog.logrocket.com/understanding-react-higher-order-components/)[3](https://blog.logrocket.com/understanding-react-higher-order-components/).
    
-   No usar HOC para compartir código entre componentes que no están relacionados. Esto puede acoplar innecesariamente los componentes y dificultar su mantenimiento. [En su lugar, usar hooks personalizados o módulos independientes para compartir código entre componentes](https://blog.logrocket.com/understanding-react-higher-order-components/)[3](https://blog.logrocket.com/understanding-react-higher-order-components/).

## 3-  Usar alternativamente un [[Hook]]
Una alternativa al uso de los HOC es mediante un [[Hook]]. Con los Hooks <mark class="hltr-truecyan">podemos evitar la complejidad de los HOCs y acceder a la lógica compartida desde dentro de los componentes</mark>, sin tener que envolverlos ni modificar su estructura.
Los Hooks también <mark class="hltr-truecyan">facilitan el seguimiento y la depuración del flujo de datos</mark>, ya que no hay que rastrear las props que pasan por varios HOCs.

### 3.1-  Ejemplo de un hook personalizado
Retomando el mismo [[#1 1 1- Definir una funcion HOC | ejemplo]] pero usando un Hook en su lugar

1. Definimos una función que reciba los mismo parámetros necesarios. Esta función regresará la información necesaria para el componente

```jsx file:"Hook personalizado"
// Este es un Hook personalizado que recibe una url
function useLoader(url) {
  // El Hook usa un estado para guardar los datos
  const [data, setData] = useState(null);
  // El Hook usa un efecto para obtener los datos de la url
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [url]);
  // El Hook devuelve los datos
  return data;
}
```
2. Usar el Hook en cualquier componente que necesite mostrar los datos generados por el hook. En este ejemplo, siguen siendo los mismo componentes que [[#1 1 4- Usar el HOC | aquí]]
```jsx file:"👾Usando Hook y modificando componentes" hl:4,19,21,8 error:
// Podemos usar este Hook en cualquier componente que necesite mostrar datos de una url
function CommentList() {
  // Usamos el Hook con la url de los comentarios
  const data = useLoader("https://jsonplaceholder.typicode.com/comments");
  // Renderizamos la lista de comentarios o un texto de carga
  return data ? (
    <ul>
      {data.map(comment => (
        <li key={comment.id}>{comment.body}</li>
      ))}
    </ul>
  ) : (
    <p>Loading...</p>
  );
}

function BlogPost() {
  // Usamos el Hook con la url del post
  const data = useLoader("https://jsonplaceholder.typicode.com/posts/1");
  // Renderizamos el título del post o un texto de carga
  return data ? <h1>{data.title}</h1> : <p>Loading...</p>;
}

```

3.  Renderizar los componentes en la aplicación. Los componentes tendrán la lógica de carga y mostrarán los nuevos datos.
```jsx file:"👾Renderizando los componentes" hl:5-6error:
// Renderizamos los componentes en nuestra aplicación
function App() {
  return (
    <div>
      <CommentList />
      <BlogPost />
    </div>
  );
}

```
Con los Hooks <mark class="hltr-truecyan">podemos acceder a la lógica compartida desde dentro de los componentes, sin tener que envolverlos ni modificar su estructura</mark>. Los Hooks también <mark class="hltr-truecyan">facilitan el seguimiento y la depuración del flujo de datos</mark>, ya que no hay que rastrear las props que pasan por varios HOCs.
<hr class="finale">


![[bat-logo-black.png|150]]



