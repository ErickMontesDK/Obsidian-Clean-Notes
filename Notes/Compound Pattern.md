---
banner: "![[js-banner.jpg]]"
banner_x: 0.7
banner_y: 0.7
---

# Compound Pattern 

```ad-flashcards
title: ## Die Flashcards
collapse:
#### ¿Qué es el patrón de componentes compuestos en React?

Es una técnica que nos permite crear componentes que trabajan juntos para realizar una tarea, sin tener que manejar el estado o la lógica en cada uno de ellos.

#### ¿Cómo se implementa el patrón de componentes compuestos en React usando la API de contexto?

Se implementa creando un componente padre que maneje el estado y la lógica del componente compuesto y que provea el contexto a sus hijos, y creando componentes hijos que se rendericen según el estado y la lógica del componente padre y que accedan al contexto usando el hook useContext.

#### ¿Cómo se implementa el patrón de componentes compuestos en React usando el método React.Children.map?

Se implementa creando un componente padre que maneje el estado y la lógica del componente compuesto y que clone los hijos con las propiedades adicionales que quiera pasarles usando el método React.Children.map, y creando componentes hijos que se rendericen según el estado y la lógica del componente padre y que accedan a las propiedades usando los props.

#### ¿Cómo se facilita el uso e importación de los componentes compuestos en React?

Se facilita asignando los componentes hijos como propiedades del componente padre para poder acceder a ellos usando la notación de punto sobre el componente padre.

#### ¿Cuáles son algunas ventajas y desventajas del patrón de componentes compuestos en React?

Algunas ventajas son: permite crear componentes reutilizables, cohesivos y con bajo acoplamiento; permite compartir lógica entre componentes de una forma sencilla y eficiente; permite al desarrollador tener control sobre el marcado y el orden de los componentes; permite crear componentes complejos a partir de otros más simples y expresivos.

Algunas desventajas son: requiere conocer la estructura y la lógica interna del componente compuesto para usarlo correctamente; puede generar colisiones de nombres si se clonan elementos con propiedades que ya existen en los componentes hijos; puede limitar la anidación de componentes si se usa el método React.Children.map, ya que solo clona los hijos directos del componente padre.
```

```ad-why
title: ## What's the point
collapse:
El patrón de componentes compuestos en React es útil cuando se quiere:

-   Resolver problemas relacionados con la creación de componentes reutilizables
-   Desarrollar componentes altamente cohesivos con un bajo acoplamiento
-   Compartir lógica entre componentes de una forma sencilla y eficiente
-   Dar al desarrollador control sobre el marcado y el orden de los componentes
-   Crear componentes complejos a partir de otros más simples y expresivos

Algunos ejemplos o casos de aplicación del patrón de componentes compuestos en React son:

-   Componentes de interfaz de usuario como selectores, acordeones, menús desplegables, listas de etiquetas, etc.
-   Componentes de formulario como campos de entrada, botones, etiquetas, etc.
-   Componentes de navegación como pestañas, barras laterales, barras de herramientas, etc.
-   Componentes de modalidad como ventanas emergentes, diálogos, alertas, etc.
```

````ad-info
title: Index
collapse: 
```toc
```

````

````ad-abstract
El patrón de componentes compuestos o _Compound Component Pattern_ es una técnica que nos permite crear componentes que trabajan juntos para realizar una tarea, sin tener que manejar el estado o la lógica en cada uno de ellos.

Esta patrón <mark class="hltr-truecyan">permite crear componentes complejos a partir de otros más simples y reutilizables</mark>, así como separar las responsabilidades entre el componente padre y los componentes hijos
Permite al desarrollador <mark class="hltr-truecyan">tener control sobre el marcado y el orden de los componentes e importar solo el componente padre y usar sus propiedades para acceder a los componentes hijos</mark>

Sin embargo, requiere conocer la estructura y la lógica interna del componente compuesto para usarlo correctamente, puede <mark class="hltr-red">generar colisiones de nombres</mark> si se clonan elementos con propiedades que ya existen en los componentes hijos y puede <mark class="hltr-red">limitar la anidación de componentes si se usa el método React.Children.map</mark>, ya que solo clona los hijos directos del componente padre
````

## 1-  Funcionamiento
#### 1.1.1-  Crear componente padre
Crear un componente padre que maneje el estado y la lógica del componente compuesto. Este componente puede usar la API de contexto de React para proveer los datos necesarios a sus hijos. Por ejemplo:
```jsx file:"Componente padre" hl:3 
import React, { createContext, useState } from "react";

export const FlyOutContext = createContext();

const { Provider } = FlyOutContext;

const FlyOut = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return <Provider value={{ open, toggle }}>{children}</Provider>;
};

export default FlyOut;
```

#### 1.1.2-  Componentes hijos
Crear los componentes hijos que se renderizan según el estado y la lógica del componente padre. Estos componentes pueden acceder al contexto del componente padre usando el hook useContext y el contexto que se creó antes. Por ejemplo:
```jsx file:"Componente hijo" hl:5
import React, { useContext } from "react";
import { FlyOutContext } from "./FlyOut";

const Toggle = () => {
  const { open, toggle } = useContext(FlyOutContext);

  return <button onClick={toggle}>{open ? "Cerrar" : "Abrir"}</button>;
};

export default Toggle;
```

#### 1.1.3-  Asignar los componentes hijos como del padre
Asignar los componentes hijos como propiedades del componente padre para facilitar su uso e importación. De esta forma, se puede acceder a los componentes hijos usando la notación de punto sobre el componente padre. Por ejemplo:
```jsx
import React from "react";
import FlyOut from "./FlyOut";
import Toggle from "./Toggle";
import List from "./List";
import Item from "./Item";

// Asignamos los componentes como propiedades del componente FlyOut
FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

// Usamos los componentes como propiedades del componente FlyOut
<FlyOut>
  <FlyOut.Toggle />
  <FlyOut.List>
    <FlyOut.Item onClick={() => console.log("A")}>Opción A</FlyOut.Item>
    <FlyOut.Item onClick={() => console.log("B")}>Opción B</FlyOut.Item>
    <FlyOut.Item onClick={() => console.log("C")}>Opción C</FlyOut.Item>
  </FlyOut.List>
</FlyOut>
```

## 2-  React.children.map
Otra forma de implementar el patrón de componentes compuestos es usando el método [[React.Children.map]], que nos permite iterar sobre los hijos de un componente y clonarlos con las propiedades adicionales que queremos pasarles. De esta forma, no necesitamos usar el contexto de React, sino que podemos acceder a las propiedades mediante los props.

#### 2.1.1-  Crear el componente padre que maneje el estado y la lógica del componente compuesto
El componente padre es similar al que usamos con el contexto de React, solo que en lugar de usar el proveedor del contexto, usamos el método React.Children.map para clonar los hijos con las propiedades _open_ y _toggle_.
```jsx file:"Using React.Children.map" hl:8-10
import React, { useState } from "react";

const FlyOut = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { open, toggle })
  );
};

export default FlyOut;
```

#### 2.1.2-  crear los componentes hijos que se renderizan según el estado y la lógica del componente padre

Los componentes hijos son similares a los que usamos con el contexto de React, solo que en lugar de usar el hook useContext para acceder al contexto, usamos los props para acceder a las propiedades _open_ y _toggle_.
```jsx file:"Componente hijo Toggle"
import React from "react";

const Toggle = ({ open, toggle }) => {
  return <button onClick={toggle}>{open ? "Cerrar" : "Abrir"}</button>;
};

export default Toggle;
```

```jsx file:"Componente hijo List"
import React from "react";

const List = ({ open, children }) => {
  return open ? <ul>{children}</ul> : null;
};

export default List;
```

```jsx file:"Componente hijo Item"
import React from "react";

const Item = ({ children, onClick }) => {
  return <li onClick={onClick}>{children}</li>;
};

export default Item;
```

#### 2.1.3-  asignar los componentes hijos como propiedades del componente padre para facilitar su uso e importación

Este paso es igual al que usamos con el contexto de React. Asignamos los componentes hijos como propiedades del componente padre para poder acceder a ellos usando la notación de punto.
```jsx file:"Asignando hijos al padre"
import React from "react";
import FlyOut from "./FlyOut";
import Toggle from "./Toggle";
import List from "./List";
import Item from "./Item";

// Asignamos los componentes como propiedades del componente FlyOut
FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

// Usamos los componentes como propiedades del componente FlyOut
<FlyOut>
  <FlyOut.Toggle />
  <FlyOut.List>
    <FlyOut.Item onClick={() => console.log("A")}>Opción A</FlyOut.Item>
    <FlyOut.Item onClick={() => console.log("B")}>Opción B</FlyOut.Item>
    <FlyOut.Item onClick={() => console.log("C")}>Opción C</FlyOut.Item>
  </FlyOut.List>
</FlyOut>
```


<hr class="finale">

![[bat-logo-black.png|150]]



