---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Presentational Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es el patrón de Componentes Presentacionales y Contenedores en React?

Es un patrón que consiste en separar los componentes en dos tipos: los presentacionales, que se encargan de cómo se muestra la información al usuario, y los contenedores, que se encargan de qué información se muestra al usuario.

#### ¿Para qué sirve el patrón de Componentes Presentacionales y Contenedores en React?

Sirve para aplicar la separación de responsabilidades, reutilizar la lógica de los componentes, mejorar la legibilidad y la estructura del código, y facilitar el mantenimiento, la prueba y el diseño de los componentes.

#### ¿Cómo se implementa el patrón de Componentes Presentacionales y Contenedores en React?

Se implementa creando componentes funcionales sin estado que reciben sus datos a través de las props (componentes presentacionales), y componentes de clase con estado que obtienen los datos desde una fuente externa o interna y los pasan a los componentes presentacionales (componentes contenedores).

#### ¿Qué ventajas tiene el patrón de Componentes Presentacionales y Contenedores en React?

Tiene como ventajas que permite separar la lógica de la aplicación de la vista, hacer que los componentes presentacionales sean independientes de los datos, flexibles y adaptables a diferentes contextos, y mejorar la legibilidad y la estructura del código.

#### ¿Qué desventajas tiene el patrón de Componentes Presentacionales y Contenedores en React?

Tiene como desventajas que puede añadir complejidad innecesaria en aplicaciones pequeñas o simples, provocar una sobrecarga de props, y quedar obsoleto con el uso de Hooks.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
En React, una forma de aplicar la separación de responsabilidades es usando el patrón de Componentes Presentacionales y Contenedores. <mark class="hltr-truecyan">Con este patrón, podemos separar la vista de la lógica de la aplicación.</mark>
![[Pasted image 20230514023028.png|400]]
Este patron <mark class="hltr-truecyan">permite separar la lógica de la aplicación de la vista, lo que facilita el mantenimiento, la reutilización y la prueba de los componentes</mark>. Al hacer que los componentes presentacionales sean independientes de los datos, <mark class="hltr-truecyan">se logra que sean más flexibles y adaptables a diferentes contextos</mark>. Además, el patrón <mark class="hltr-truecyan">mejora la legibilidad y la estructura del código</mark>, al agrupar los componentes según su función y responsabilidad.

Sin embargo, <mark class="hltr-red">puede añadir complejidad innecesaria</mark> en aplicaciones pequeñas o simples, al crear más componentes y archivos de lo necesario. También <mark class="hltr-red">puede provocar una sobrecarga de props</mark>, al tener que pasar los datos desde los componentes contenedores a los presentacionales, <mark class="hltr-red">lo que puede afectar al rendimiento y a la depuración</mark>. Por último, el patrón <mark class="hltr-red">puede quedar obsoleto con el uso de Hooks</mark>, que permiten manejar el estado y los efectos sin necesidad de componentes contenedores.
````

## 1-  Funcionamiento
Supongamos que queremos crear una aplicación que obtiene 6 imágenes de perros, y las muestra en la pantalla.

Idealmente, queremos separar este proceso en dos partes:

### 1.1-  Componentes presentacionales
Son los componentes que se encargan de cómo se muestra la información al usuario. En este ejemplo, sería el renderizado de la lista de imágenes de perros.

<mark class="hltr-truecyan">Un componente presentacional recibe sus datos a través de las props. Su función principal es simplemente mostrar los datos que recibe de la forma que queramos</mark>, incluyendo los estilos, sin modificar esos datos.

*Al renderizar las imágenes de perros, simplemente queremos iterar sobre cada imagen de perro que se obtuvo de la API, y mostrar esas imágenes. Para hacerlo, podemos crear un componente funcional que recibe los datos a través de las props, y muestra los datos que recibió.*
```jsx file:"👾 Componente presentacional recibiendo props" hl:1 error:
const DogImages = ({ dogs }) => {
  return (
    <div className="dog-images">
      {dogs.map((dog) => (
        <img src={dog} alt="dog" key={dog} />
      ))}
    </div>
  );
};
```


### 1.2-  Componentes contenedores
Son los componentes que se encargan de qué información se muestra al usuario. En este ejemplo, sería la obtención de las imágenes de perros. 

La función principal de los componentes contenedores <mark class="hltr-truecyan">es pasar los datos a los componentes presentacionales, que ellos contienen</mark>. Normalmente <mark class="hltr-truecyan">no renderizan ningún otro componente aparte de los componentes presentacionales que se interesan por sus datos.</mark> Como ellos mismos no renderizan nada, tampoco suelen tener ningún estilo.

*En nuestro ejemplo, queremos pasar las imágenes de perros al componente presentacional DogImages. Antes de poder hacerlo, necesitamos obtener las imágenes desde una API externa. Necesitamos crear un componente contenedor que obtenga estos datos, y los pase al componente presentacional DogImages para mostrarlos en la pantalla*

```jsx file:"👾 Componente contenedor enviando props" hl:16 error:
import React, { Component } from "react";
import DogImages from "./DogImages";

class DogImagesContainer extends Component {
  state = {
    dogs: [],
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random/6")
      .then((res) => res.json())
      .then((data) => this.setState({ dogs: data.message }));
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

## 2-  Hooks
La introducción de Hooks hizo fácil para los desarrolladores añadir estado sin necesitar un componente contenedor para proveer ese estado.

*En lugar de tener la lógica de obtención de datos en el componente DogImagesContainer, podemos crear un hook personalizado que obtenga las imágenes, y devuelva el array de perros.*
```jsx file:"👾Hooks useState & useEffect" hl:error:
import { useState, useEffect } from "react";

const useDogImages = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/6")
      .then((res) => res.json())
      .then((data) => setDogs(data.message));
  }, []);

  return dogs;
};
```
*Usando este hook, ya no necesitamos el componente contenedor DogImagesContainer para obtener los datos, y enviarlos al componente presentacional DogImages. En su lugar, podemos usar este hook directamente en nuestro componente presentacional DogImages.*
```jsx file:"👾Recieving data from hooks" hl:2,5 error:
import React from "react";
import useDogImages from "./useDogImages";

const DogImages = () => {
  const dogs = useDogImages();

  return (
    <div className="dog-images">
      {dogs.map((dog) => (
        <img src={dog} alt="dog" key={dog} />
      ))}
    </div>
  );
};
```
Los hooks hacen fácil separar la lógica y la vista en un componente, al igual que el patrón de Componentes Presentacionales y Contenedores.<mark class="hltr-truecyan"> Nos ahorra la capa extra que era necesaria para envolver el componente presentacional dentro del componente contenedor.</mark>
<hr>


![[bat-logo-black.png|150]]
