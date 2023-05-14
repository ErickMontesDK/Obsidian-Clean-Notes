---
banner: "![[react-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Context API 

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
Context API es una característica de React que<mark style="background: #D2B3FFA6;"> permite compartir datos entre componentes sin necesidad de pasarlos como props</mark>

Context API es útil cuando hay datos que se consideran “globales” para una parte de la aplicación, como el tema, el idioma, el usuario autenticado, etc

Context API evita el problema del “<b>prop drilling</b>”, que es cuando se pasa un dato a través de varios componentes intermedios que no lo usan, solo para llegar al componente que lo necesita
````
## 1-  ¿Como funciona Context API?
-[Para usar Context API se deben seguir tres pasos: crear un contexto, proveer un valor y consumir un valor](https://www.geeksforgeeks.org/explain-new-context-api-in-react-16/)[4](https://www.geeksforgeeks.org/explain-new-context-api-in-react-16/).

### 1.1-  Crear un contexto

Un contexto se crea usando la función `React.createContext()`, que recibe un valor inicial como argumento y devuelve un objeto con dos componentes: `Context.Provider` y `Context.Consumer`.

El valor inicial del contexto se usa cuando no hay ningún proveedor del contexto en el árbol de componentes.

Por ejemplo, para crear un contexto llamado `ThemeContext` con un valor inicial de `"light"`, se puede hacer lo siguiente:
```jsx file:"👾React.createContext()" hl:4 error:
import React from "react";

// Creamos el contexto ThemeContext usando la función createContext
const ThemeContext = React.createContext("light");

// Exportamos el contexto ThemeContext por defecto
export default ThemeContext;
```
### 1.2-  Proveer un valor
Para proveer un valor al contexto se <mark class="hltr-truecyan">usa el componente `Context.Provider`, que recibe una prop `value` con el valor actual del contexto y envuelve a los componentes hijos que quieren acceder al contexto.</mark>

El valor del contexto puede ser cualquier tipo de dato válido en JavaScript, como una cadena, un número, una variable, una función, etc.
Este valor se actualiza cada vez que el componente proveedor se renderiza con un nuevo valor.

Por ejemplo: Para proveer el valor del contexto `ThemeContext` desde el componente `App`, se puede hacer lo siguiente:
```jsx file:"👾context.Provider" hl:14,16 error:
// En App.js
import React from "react";
import ThemeContext from "./ThemeContext";

function App() {
  // Usamos el hook useState para manejar el estado del tema
  const [theme, setTheme] = React.useState("light");

  // Creamos una función para cambiar el tema entre "light" y "dark"
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Retornamos el componente ThemeContext.Provider y le pasamos el estado del tema como value
  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <h1>React Context API</h1>
        <button onClick={toggleTheme}>Toggle theme</button>
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```
### 1.3-  Consumir un valor

<mark class="hltr-truecyan">Para consumir un valor del contexto se pueden usar dos opciones: el componente `Context.Consumer` o el hook `useContext`.</mark>

#### 1.3.1-  Context.consumer
El componente `Context.Consumer` recibe una función como hijo ([[Render Props | render prop]]) que recibe el valor actual del contexto y retorna un elemento JSX.

Ambas opciones permiten suscribirse a los cambios del valor del contexto y actualizar los componentes que lo consumen.

```jsx file:"👾NameContext.Consumer" hl:1,2,7 error:
<ThemeContext.Consumer>
      {(theme) => (
        <div className={`child ${theme}`}>
          <p>The current theme is {theme}</p>
        </div>
      )}
    </ThemeContext.Consumer>
```
#### 1.3.2-  useContext
El hook `useContext` recibe el objeto del contexto como argumento y devuelve el valor actual del contexto.
```jsx file:"👾React.useContext()" hl:2 error:
//Usando el hook useContext
const theme = React.useContext(ThemeContext);

  return (
	<div className={`child ${theme}`}>
		  <p>The current theme is {theme}</p>
	</div>
);
```

#### 1.3.3-  Ejemplo de consumir un valor
Por ejemplo, para consumir el valor del contexto `ThemeContext` desde el componente `Child`, se puede hacer lo siguiente usando el componente `Context.Consumer`:
```jsx file:"👾title" hl:7,8,17 error:
import React from "react";
import ThemeContext from "./ThemeContext";

function Child() {
  // Usando el Context.Consumer
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className={`child ${theme}`}>
          <p>The current theme is {theme}</p>
        </div>
      )}
    </ThemeContext.Consumer>
  );

  // Usando el hook useContext
const theme = React.useContext(ThemeContext);
	return (
		<div className={`child ${theme}`}>
			<p>The current theme is {theme}</p>
		</div>
	);
}

export default Child;
```
<hr>



